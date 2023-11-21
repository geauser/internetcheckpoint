import { Config, StackContext } from "sst/constructs";


export function ConfigStack({ stack, app }: StackContext) {

  const secretKeys = [
    "GOOGLE_APPLICATION_CREDENTIALS",
    "DATABASE_HOST",
    "DATABASE_PORT",
    "DATABASE_NAME",
    "DATABASE_USER",
    "DATABASE_PASSWORD",
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
