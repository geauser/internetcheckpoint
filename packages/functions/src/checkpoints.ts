import { ApiHandler } from "sst/node/api";
import { Comments, Owners } from "@db/schema";
import { db } from "@db";
import { and, eq, inArray, notLike, sql } from "drizzle-orm";
import { getUser } from "./utils/firebase";


export const handler = ApiHandler(async (event) => {

  const user = getUser(event);
  let checkpoints: unknown[] = [];

  console.log(user.uid);

  const channelIds = await db
    .select({
      channelId: Owners.channelId,
    })
    .from(Owners)
    .where(eq(Owners.uid, user.uid))
    .execute()
    .then((rows) => rows.map((row) => row.channelId).filter((id) => !!id)) as string[];


  if (channelIds.length) {

    checkpoints = await db
      .select()
      .from(Comments)
      .where(
        and(
          inArray(Comments.authorChannelId, channelIds),
          notLike(Comments.id, '%.%'),
        )
      )
      .orderBy(sql`${Comments.id} DESC`)
      .execute();

  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkpoints),
  };

});
