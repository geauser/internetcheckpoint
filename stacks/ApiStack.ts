import { Api, Function, StackContext, use } from "sst/constructs";
import { ConfigStack } from "./ConfigStack";


export function ApiStack({ stack, app }: StackContext) {

  const config = use(ConfigStack);

  const api = new Api(stack, "api", {

    authorizers: {
      firebase: {
        type: "lambda",
        responseTypes: ["simple"],
        function: new Function(stack, "FirebaseAuthorizer", {
          handler: "packages/functions/src/authorizer.handler",
          bind: [config.secrets.GOOGLE_APPLICATION_CREDENTIALS],
        }),
        resultsCacheTtl: "30 seconds",

        // TODO: Could be faster in production, will need to test
        // against the lambda authorizer.
        // jwt: {
        //   // issuer: 'https://securetoken.google.com/simpuppet-b1a2d',
        //   audience: ['simpuppet-b1a2d'],
        // },
      },
    },

    defaults: {
      function: {
        runtime: 'nodejs18.x',
        timeout: 30,
      },
      authorizer: 'firebase',
    },
    ...(['prod', 'dev'].includes(app.stage) && {
      customDomain: {
        domainName: app.stage === 'prod' ? 'api.internetcheckpoint.page':  'api.dev.internetcheckpoint.page',
        hostedZone: 'internetcheckpoint.page',
      },
    }),

    routes: {
      "POST /restore":    "packages/functions/src/restore.handler",
      "GET /checkpoints": "packages/functions/src/checkpoints.handler",
      "GET /comments":    {
        function: "packages/functions/src/comments.handler",
        authorizer: 'none'
      },
    },
  });

  api.bind([
    ...config.secretList,
  ]);

  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl ?? api.url,
  });

  return {
    url: api.customDomainUrl ?? api.url,
  };
}
