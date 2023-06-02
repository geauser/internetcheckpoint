import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from "database";


export const handler: APIGatewayProxyHandlerV2 = async (event) => {

  const repliesOf  = event.queryStringParameters?.repliesOf ?? null;
  const batchIndex = parseInt(event.queryStringParameters?.batch ?? '0', 10);
  const isLoadingReplies = !!repliesOf;
  const batchSize = isLoadingReplies ? 10 : 100;

  const comments = await db
    .selectFrom('comment')
    .$if(isLoadingReplies, q => q.where('id', 'like', `${repliesOf}.%`))
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