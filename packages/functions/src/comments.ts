import { db } from "@db";
import { comment } from "@db/schema";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { and, eq, like, notLike, sql } from "drizzle-orm";


export const handler: APIGatewayProxyHandlerV2 = async (event) => {

  const videoId             = event.queryStringParameters?.videoId ?? null;
  const repliesOf           = event.queryStringParameters?.repliesOf ?? null;
  const batchIndex          = parseInt(event.queryStringParameters?.batch ?? '0', 10);
  const isLoadingReplies    = !!repliesOf;
  const isNotLoadingReplies = !isLoadingReplies;
  const batchSize           = isLoadingReplies ? 10 : 100;


  let query = db.select().from(comment);

  if (isLoadingReplies) {
    query
      .where(like(comment.id, `${repliesOf}.%`))
      .orderBy(sql`${comment.id} ASC`);
  }

  if (isNotLoadingReplies) {
    query
      .where(
        and(
          eq(comment.videoId, videoId ?? ''),
          notLike(comment.id, '%.%'),
        )
      )
      .orderBy(sql`${comment.score} DESC`);
  }


  const comments = await query.offset(batchIndex * batchSize).limit(batchSize).execute();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comments }),
  };
};
