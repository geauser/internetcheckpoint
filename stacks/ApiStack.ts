import { StackContext, Api, Config } from "sst/constructs";


export function ApiStack({ stack }: StackContext) {

  const api = new Api(stack, "api", {
    routes: {
    },
  });

  api.bind([
    new Config.Secret(stack, 'DATABASE_URL'),
  ]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
