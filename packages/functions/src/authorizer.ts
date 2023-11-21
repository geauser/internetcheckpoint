import { APIGatewayEvent } from "aws-lambda";
import { getAuth } from "src/utils/firebase";


export const handler = async (event: APIGatewayEvent) => {

  try {
    const token = event.headers.authorization?.replace('Bearer ', '');
    const user = await getAuth().verifyIdToken(token ?? '');
    return {
      isAuthorized: true,
      context: {
        user,
      }
    };
  } catch (err) {
    console.error(err);
    return {
      isAuthorized: false,
      context: {},
    };
  }

};
