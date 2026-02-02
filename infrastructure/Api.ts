import Secrets from "./Secrets";


const isDeployed = () => ["prod", "dev"].includes($app.stage);

const getDomain = () => {
  if ($app.stage === "prod") return "api.internetcheckpoint.page";
  if ($app.stage === "dev") return "api.dev.internetcheckpoint.page";
  return undefined;
};


export const api = new sst.aws.ApiGatewayV2("Api", {
  ...(isDeployed() ? {
    domain: getDomain()!
  } : {}),
});


const authorizer = api.addAuthorizer({
  name: "FirebaseAuthorizer",
  lambda: {
    function: {
      handler: "packages/functions/src/authorizer.handler",
      link: [Secrets.asMap.GOOGLE_APPLICATION_CREDENTIALS],
    },
    payload: "2.0",
    response: "simple",
    ttl: "30 seconds",
  },
});

const authenticated = { auth: { lambda: authorizer.id } };


// Routes
api.route("POST /restore", {
  handler: "packages/functions/src/restore.handler",
  timeout: "10 minutes",
  link: [...Secrets.asList],
}, authenticated);

api.route("GET /checkpoints", {
  handler: "packages/functions/src/checkpoints.handler",
  timeout: "30 seconds",
  link: [...Secrets.asList],
}, authenticated);

api.route("GET /comments", {
  handler: "packages/functions/src/comments.handler",
  timeout: "30 seconds",
  link: [...Secrets.asList],
});
