import { db } from "@db";
import { owners } from "@db/schema";
import fetch from 'node-fetch';
import { getUser } from "src/utils/firebase";
import { ApiHandler } from "sst/node/api";


export const handler = ApiHandler(async (event) => {

  const user = getUser(event);
  const accessToken = event.queryStringParameters?.token ?? null;

  if (!accessToken) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing google access token' }),
    };
  }

  const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&access_token=${accessToken}`);
  const data = await res.json() as unknown as  { items: any[], error: any };
  const channels = data.items ?? [];

  if (data?.error?.status === 'PERMISSION_DENIED') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'PERMISSION_DENIED' }),
    };
  }

  await Promise.all(channels.map(async (channel) => {

    try {

      await db.insert(owners).values({
        uid: user.uid,
        channelId: channel.id,
      });

    } catch (err) {
      // DO NOTHING
    }

  }));

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  };

});
