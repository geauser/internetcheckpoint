import { api } from "./Api";


const isDeployed = () => ["prod", "dev"].includes($app.stage);

const getDomain = () => {
  if ($app.stage === "prod") return "internetcheckpoint.page";
  if ($app.stage === "dev") return "dev.internetcheckpoint.page";
  return undefined;
};

const firebaseConfig = JSON.stringify({
  apiKey: "AIzaSyAOblwd_m7Y3Vr3-uaYDH4S_0DYM93e9hw",
  authDomain: "internetcheckpoint-de64f.firebaseapp.com",
  projectId: "internetcheckpoint-de64f",
  storageBucket: "internetcheckpoint-de64f.appspot.com",
  messagingSenderId: "242769860962",
  appId: "1:242769860962:web:4083c5b9bb58ea291ef43b",
  measurementId: "G-43W5RSPT9Y"
});


export const web = new sst.aws.StaticSite("Web", {
  path: "packages/website",
  build: {
    command: "bun generate",
    output: ".output/public",
  },
  errorPage: "404.html",

  ...(isDeployed() ? {
    domain: {
      name: getDomain()!,
      redirects: [`www.${getDomain()!}`],
    }
  } : {}),

  environment: {
    NUXT_STAGE: $app.stage,
    NUXT_APP_DOMAIN: getDomain() ?? "localhost",
    NUXT_API_URL: api.url,
    NUXT_GA_ID: "G-43W5RSPT9Y",
    NUXT_FIREBASE_CONFIG: firebaseConfig,
  },
});
