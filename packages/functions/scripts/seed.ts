import iconv from "iconv-lite";
import fs from 'node:fs';
import path from 'node:path';
import { db } from '@db';
import { Comments, Videos, type Comment } from '@db/schema';
import dayjs from 'dayjs';
import { eq } from "drizzle-orm";


function sanitizeAndEncodeString(str: string): string {
  // First, remove null bytes
  const sanitized = str.replace(/\0/g, '');
  // Then, ensure it's properly encoded as UTF-8
  return iconv.decode(iconv.encode(sanitized, 'utf8'), 'utf8');
}

function estimateCommentCreationDate(time: string) {

  const parsedTime = time.replace('eest', '').replace('(muudetud)', '');
  const value = parseInt(parsedTime.split(' ')[0]);

  const unit = (() => {
    switch (parsedTime.split(' ')[1]) {
      case 'sekundi': return 'second';
      case 'minuti':  return 'minute';
      case 'tunni':   return 'hour';
      case 'päeva':   return 'day';
      case 'kuu':     return 'month';
      case 'aasta':   return 'year';
      case 'nädala':  return 'week';
      default:        throw new Error('Unknown unit');
    }
  })();

  // 2021-04-07 is the date when Rebane did the backup
  return dayjs('2021-04-07').subtract(value, unit).toDate();

}

function computeCommentScore(repliesCount: number, votesCount: number, textLength: number) {

  const sd = 1000, optimalTarget = 1500;

  // Gaussian distribution of the score along with an optimal score
  // for text that are 1500 characters long.
  const textLengthScore   = Math.exp(-Math.pow(textLength - optimalTarget, 2) / (2 * Math.pow(sd, 2)));

  // Replies count 3 times more than votes in the scoring system.
  const repliesCountScore = Math.max(repliesCount, 1);
  const votesCountScore   = Math.max(votesCount, 1) / 3;

  return repliesCountScore * votesCountScore * textLengthScore;
}


const cwd = process.cwd();

if (cwd.split('/').pop() !== 'functions') {
  console.log(cwd);
  console.log('[ERROR] Please run this script from the root of "packages/functions"');
  process.exit(1);
}

const replies = new Map<string, number>();
const comments: Comment[] = [];
const backupFolderPath = path.join(path.join(cwd, '../../backups'));
const metadata = await import(path.join(backupFolderPath, '_metadata.json')).catch(err => {}) ?? {};
const files = fs.readdirSync(backupFolderPath).filter(f => f !== '_metadata.json');


console.log('\nCounting replies ...\n');

// Count the number of replies for each comment (that is not a reply itself)
for (const file of files) {

  const lines = fs.readFileSync(path.join(backupFolderPath, file), 'utf-8').split('\n');

  for (const line of lines) {

    if (!line.trim()) continue;

    const comment = JSON.parse(line.trim());
    const commentIdBeingRepliedTo = comment.cid.split('.')[0];
    replies.set(commentIdBeingRepliedTo, (replies.get(commentIdBeingRepliedTo) ?? 0) + 1);

  }

}

console.log('\nProcessing backups ...\n');

// Create a database ready object for each comment based on
// the data from the backup files.
for (const file of files) {

  const lines = fs.readFileSync(path.join(backupFolderPath, file), 'utf-8').split('\n');

  for (const line of lines) {

    if (!line.trim()) continue;

    const comment = JSON.parse(line.trim());

    // 'tuh' means 'thousand' in Estonian
    // it's the equivalent of 'k' in English
    if (comment.votes.includes('tuh')) {
      comment.votes = parseFloat(comment.votes.replace(' tuh', '').replace(',', '.')) * 1000;
    }

    const isReply = comment.cid.includes('.');
    const votes        = parseInt(comment.votes, 10);
    const repliesCount = replies.get(comment.cid) ?? 0;

    comments.push({
      id: comment.cid,
      // The filename in Rebane's backup are the videoId where the
      // comment was posted, so we use them here.
      videoId: file.replace('.json', ''),
      authorChannelId: comment.channel,
      text: sanitizeAndEncodeString(comment.text),
      importedAuthorName: sanitizeAndEncodeString(comment.author),
      importedAuthorPhoto: comment.photo,
      votes,
      repliesCount,
      score: isReply ? null : computeCommentScore(repliesCount, votes, comment.text.length),
      createdAt: estimateCommentCreationDate(comment.time).toISOString(),
    });

  }
}

console.log('\nInserting videos ...\n');

// Insert the videos into the database
for (const videoId in metadata.default) {
  const videoData = metadata[videoId];

  const videoAlreadyExists = await db
    .select()
    .from(Videos)
    .where(eq(Videos.id, videoId))
    .limit(1)
    .execute();

  if (videoAlreadyExists.length > 0) continue;

  const {
    title,
    viewCount,
    likeCount,
    dislikeCount,
    publishedAt,
  } = videoData;

  console.log('Inserting video', videoId, '...');

  await db
    .insert(Videos)
    .values({
      id: videoId,
      title,
      viewCount,
      likeCount,
      dislikeCount,
      publishedAt: dayjs(publishedAt).toISOString(),
    })
    .execute();
}

console.log('\nInserting comments ...\n');

// Insert the comments into the database
let inserted = 0;
const CHUNK_SIZE = 1000;

for (let i = 0; i < comments.length; i += CHUNK_SIZE) {
  const chunk = comments.slice(i, i + CHUNK_SIZE);


  await db
  .insert(Comments)
  .values(chunk)
  .execute()
  .catch(err => {
    console.log(chunk);
    console.log(err);
    process.exit(1);
  });


  inserted += chunk.length;

  console.log(`Inserted ${inserted}/${comments.length} comments ...`);
}

process.exit(0);
