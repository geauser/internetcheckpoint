import { Config, StackContext } from "sst/constructs";


export function ConfigStack({ stack, app }: StackContext) {

  const secretKeys = [
    "GOOGLE_APPLICATION_CREDENTIALS",
    "DATABASE_URL",
    "YOUTUBE_API_KEY",
  ] as const;

  const secretList = secretKeys.map((key) => new Config.Secret(stack, key));
  const secrets = Object.fromEntries(
    secretKeys.map((key, i) => [key, secretList[i]])
  ) as { [K in (typeof secretKeys)[number]]: Config.Secret };


  return {
    secretList,
    secrets,
  };
}
