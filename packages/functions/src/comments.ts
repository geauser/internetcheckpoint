import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from "database";
import { sql } from "kysely";


export const handler: APIGatewayProxyHandlerV2 = async (event) => {

  const videoId = event.queryStringParameters?.videoId ?? null;
  const repliesOf  = event.queryStringParameters?.repliesOf ?? null;
  const batchIndex = parseInt(event.queryStringParameters?.batch ?? '0', 10);
  const isLoadingReplies = !!repliesOf;
  const isNotLoadingReplies = !isLoadingReplies;
  const batchSize = isLoadingReplies ? 10 : 100;

  const comments = await db
    .selectFrom('comment')
    .$if(isLoadingReplies, q => {
      return q
        .where('id', 'like', `${repliesOf}.%`)
        .orderBy('createdAt', 'asc');
    })
    .$if(isNotLoadingReplies, q => {
      return q
        .where('videoId', '=', videoId)
        .where('id', 'not like', `%.%`)
        .orderBy('score', 'desc');
    })
    .selectAll()
    .offset(batchIndex * batchSize)
    .limit(batchSize)
    .execute();


  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comments }),
  };
};
