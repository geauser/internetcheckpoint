

const entries = [
  "GOOGLE_APPLICATION_CREDENTIALS",
  "DATABASE_URL",
  "YOUTUBE_API_KEY",
] as const;


const asList = entries.map((entry) => new sst.Secret(entry));
const asMap  = Object.fromEntries(
  entries.map((key, i) => [key, asList[i]])
) as { [K in (typeof entries)[number]]: sst.Secret };


export default { asList, asMap };
