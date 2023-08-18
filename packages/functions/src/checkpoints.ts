import { ApiHandler } from "sst/node/api";
import { comment, owners } from "@db/schema";
import { db } from "@db";
import { and, eq, inArray, notLike, sql } from "drizzle-orm";
import { getUser } from "src/utils/firebase";


export const handler = ApiHandler(async (event) => {

  const user = getUser(event);
  let checkpoints: unknown[] = [];

  console.log(user.uid);

  const channelIds = await db
    .select({
      channelId: owners.channelId,
    })
    .from(owners)
    .where(eq(owners.uid, user.uid))
    .execute()
    .then((rows) => rows.map((row) => row.channelId).filter((id) => !!id)) as string[];


  if (channelIds.length) {

    checkpoints = await db
      .select()
      .from(comment)
      .where(
        and(
          inArray(comment.authorChannelId, channelIds),
          notLike(comment.id, '%.%'),
        )
      )
      .orderBy(sql`${comment.id} DESC`)
      .execute();

  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkpoints),
  };

});
