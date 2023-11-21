import { ApiHandler } from "sst/node/api";
import fetch from 'node-fetch';
import { comment, owners } from "@db/schema";
import { db } from "@db";
import { eq } from "drizzle-orm";
import { getUser } from "src/utils/firebase";


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
  const data = await res.json() as unknown as  { items: any[] };
  const channels = data.items ?? [];

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
