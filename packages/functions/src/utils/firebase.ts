import { APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyWebsocketEventV2 } from "aws-lambda";
import { apps } from "firebase-admin";
import { cert, initializeApp } from "firebase-admin/app";
import { DecodedIdToken } from "firebase-admin/auth";
import { Config } from "sst/node/config";
export { getAuth } from "firebase-admin/auth";

if (!apps.length) {
  initializeApp({
    credential: cert(JSON.parse(Buffer.from(Config.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('utf-8'))),
  });
}

export type User = DecodedIdToken;

export const getUser = (event: APIGatewayProxyEventV2 | APIGatewayProxyWebsocketEventV2): User => {

  // @ts-expect-error
  return event.requestContext?.authorizer?.lambda?.user ??
    /**
     * @note We are using JSON.parse here because the authorizer
     * context for the websocket only accepts strings. So we have
     * to stringify the user object in the authorizer and parse it
     * here.
     */
    // @ts-expect-error
    JSON.parse(event.requestContext?.authorizer?.user ?? '{}');
};
