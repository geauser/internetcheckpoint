import fs from 'node:fs';
import path from 'node:path';
import dayjs from 'dayjs';
import { CommentTable, db } from 'planetscale/db';



(async () => {


const backupsFolderPath = path.join(process.cwd(), '../../backups');
const files = fs.readdirSync(backupsFolderPath);
const repliesCounts:Record<string, number> = {};
const comments: (Omit<CommentTable, 'id' | 'authorPhoto' | 'authorName'> & { id: string })[] = [];


for (const file of files) {

  // read content of the file
  const content = fs.readFileSync(`${backupsFolderPath}/${file}`, 'utf-8');
  const lines = content.split('\n');

  // Count the number of replies
  for (const line of lines) {

    try {

      const comment = JSON.parse(line.trim());
      const isReply = comment.cid.includes('.');

      if (isReply) {
        const targetCommentId = comment.cid.split('.')[0];
        repliesCounts[targetCommentId] = (repliesCounts[targetCommentId] ?? 0) + 1;
      }

    } catch (err) {}

  }

  for (const line of lines) {

    try {

      const comment = JSON.parse(line.trim());

      if (isNaN(parseInt(comment.votes, 10))) {
        throw new Error('Votes is not a number');
      }

      const time = comment.time.replace('eest', '').replace('(muudetud)', '');
      const value = parseInt(time.split(' ')[0]);

      const unit  = (() => {
        switch (time.split(' ')[1]) {
          case 'sekundi': return 'second';
          case 'minuti': return 'minute';
          case 'tunni': return 'hour';
          case 'päeva': return 'day';
          case 'kuu': return 'month';
          case 'aasta': return 'year';
          case 'nädala': return 'week';
          default: throw new Error('Unknown unit');
        }
      })();

      const isReply = comment.cid.includes('.');

      const createdAt = dayjs('2021-04-07').subtract(value, unit).toDate();
      const votes = parseInt(comment.votes, 10);
      const repliesCount = repliesCounts[comment.cid] ?? 0;

      const standardDeviation = 1000, peak = 1500, height = 1;

      const score =
        Math.max(repliesCount, 1) *
        (Math.max(votes, 1) / 3) *
        height * Math.exp(
          -Math.pow(comment.text.length - peak, 2) /
          (2 * Math.pow(standardDeviation, 2))
        );

      comments.push({
        id: comment.cid,
        authorUid: null,
        authorChannelId: comment.channel,
        text: comment.text,
        importedAuthorName: comment.author,
        importedAuthorPhoto: comment.photo,
        votes,
        repliesCount,
        score: isReply ? null : score,
        createdAt,
      });

    } catch (err) {}

  }

};


if (process.argv[2] === 'update') {

  let promises = [];

  for (let i = 0; i < comments.length; i++) {

    promises.push(db
      .updateTable('comment')
      .where('id', '=', comments[i].id)
      .set({
        createdAt: comments[i].createdAt,
        score: comments[i].score,
      })
      .execute());

    if (promises.length % 100 === 0 || promises.length === comments.length) {
      await Promise.all(promises);
      console.log('Updated', `${promises.length}/${comments.length}`, '...');
    }

  }

  process.exit(0);
} 

let inserted = 0;
// Use chunk to avoid issues with planetscale
const CHUNK_SIZE = 1000;

for (let i = 0; i < comments.length; i += CHUNK_SIZE) {
  const chunk = comments.slice(i, i + CHUNK_SIZE);

  await db
    .insertInto('comment')
    .values(chunk)
    .execute()
    .catch(err => {
      console.log(err);
      process.exit(1);
    });

  inserted += chunk.length;

  console.log(`Inserted ${inserted}/${comments.length} ...`);
}

process.exit(0);


})();