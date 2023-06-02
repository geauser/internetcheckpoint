import fs from 'node:fs';
import path from 'node:path';
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

      comments.push({
        id: comment.cid,
        authorUid: null,
        authorChannelId: comment.channel,
        text: comment.text,
        importedAuthorName: comment.author,
        importedAuthorPhoto: comment.photo,
        votes: parseInt(comment.votes, 10),
        repliesCount: repliesCounts[comment.cid] ?? 0,
      });

    } catch (err) {}

  }

};


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