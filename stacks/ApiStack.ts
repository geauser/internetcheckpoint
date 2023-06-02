import { StackContext, Api, Config } from "sst/constructs";


export function ApiStack({ stack, app }: StackContext) {

  const api = new Api(stack, "api", {

    defaults: {
      function: {
        runtime: 'nodejs18.x',
      },
    },
    ...(app.stage === 'prod' && {
      customDomain: {
        domainName: 'api.internetcheckpoint.page',
        hostedZone: 'internetcheckpoint.page',
      },
    }),

    routes: {
      "GET /comments": "packages/functions/src/comments.handler",
    },
  });

  api.bind([
    new Config.Secret(stack, 'DATABASE_URL'),
  ]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    url: api.customDomainUrl ?? api.url,
  };
}
