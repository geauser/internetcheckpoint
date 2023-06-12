import { StackContext, Api, Config } from "sst/constructs";


export function ApiStack({ stack, app }: StackContext) {

  const api = new Api(stack, "api", {

    defaults: {
      function: {
        runtime: 'nodejs18.x',
        timeout: 30,
      },
    },
    ...(['prod', 'dev'].includes(app.stage) && {
      customDomain: {
        domainName: app.stage === 'prod' ? 'api.internetcheckpoint.page':  'api.dev.internetcheckpoint.page',
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
    ApiEndpoint: api.customDomainUrl ?? api.url,
  });

  return {
    url: api.customDomainUrl ?? api.url,
  };
}
