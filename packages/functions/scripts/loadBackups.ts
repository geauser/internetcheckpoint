import fs from 'node:fs';
import { CommentTable, db } from '@internetcheckpoint/functions/src/db';



(async () => {


const files = fs.readdirSync('./backups');

let totalLines = 0;
let totalComments = 0;


const repliesCounts:Record<string, number> = {};
const comments: (Omit<CommentTable, 'id' | 'authorPhoto' | 'authorName'> & { id: string })[] = [];


for (const file of files) {

  // read content of the file
  const content = fs.readFileSync(`./backups/${file}`, 'utf-8');
  const lines = content.split('\n');
  totalLines += lines.length;

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
      totalComments++;

      if (isNaN(parseInt(comment.votes, 10))) {
        throw new Error('Votes is not a number');
      }

      comments.push({
        id: comment.cid,
        authorUid: null,
        authorChannelId: comment.channel,
        text: comment.text,
        isImported: true,
        importedAuthorName: comment.author,
        importedAuthorPhoto: comment.photo,
        votes: parseInt(comment.votes, 10),
        repliesCount: repliesCounts[comment.cid] ?? 0,
      });

    } catch (err) {}

  }

};


let inserted = 0;
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

// {
//   "heart": false,
//   "votes": "0",
//   "photo": "https://yt3.ggpht.com/ytc/AAUvwnhgFuNBzsMEtvMhf67BuRqZvziPLr6v1KWiQKcWxg=s176-c-k-c0x00ffffff-no-rj",
//   "author": "Quickchuckle",
//   "cid": "UgxEuKpWYgNTjKZUMxZ4AaABAg",
//   "text": "Checkpoint\nA swamp? Interesting, but on to the side-quest.. destroy 10 machines.. alright seems easy enough",
//   "time": "2 kuu eest",
//   "channel": "UC-IMd7yMD5fuKEBmdLjCPUQ"
// }
