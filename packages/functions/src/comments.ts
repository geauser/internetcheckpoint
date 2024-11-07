import { db } from "@db";
import { Comments } from "@db/schema";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { and, eq, like, notLike, sql } from "drizzle-orm";


export const handler: APIGatewayProxyHandlerV2 = async (event) => {

  const videoId             = event.queryStringParameters?.videoId ?? null;
  const repliesOf           = event.queryStringParameters?.repliesOf ?? null;
  const batchIndex          = parseInt(event.queryStringParameters?.batch ?? '0', 10);
  const isLoadingReplies    = !!repliesOf;
  const isNotLoadingReplies = !isLoadingReplies;
  const batchSize           = isLoadingReplies ? 10 : 100;


  let query = db.select().from(Comments);

  if (isLoadingReplies) {
    query
      .where(like(Comments.id, `${repliesOf}.%`))
      .orderBy(sql`${Comments.id} ASC`);
  }

  if (isNotLoadingReplies) {
    query
      .where(
        and(
          eq(Comments.videoId, videoId ?? ''),
          notLike(Comments.id, '%.%'),
        )
      )
      .orderBy(sql`${Comments.score} DESC`);
  }


  const comments = await query.offset(batchIndex * batchSize).limit(batchSize).execute();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comments }),
  };
};
