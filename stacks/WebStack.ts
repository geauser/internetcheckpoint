import fs from "fs";
import { StackContext, StaticSite, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';


export function WebStack({ stack, app }: StackContext) {

  const api = use(ApiStack);

  const prodFirebaseConfig = JSON.stringify({
    apiKey: "AIzaSyAOblwd_m7Y3Vr3-uaYDH4S_0DYM93e9hw",
    authDomain: "internetcheckpoint-de64f.firebaseapp.com",
    projectId: "internetcheckpoint-de64f",
    storageBucket: "internetcheckpoint-de64f.appspot.com",
    messagingSenderId: "242769860962",
    appId: "1:242769860962:web:4083c5b9bb58ea291ef43b",
    measurementId: "G-43W5RSPT9Y"
  });


  const landing = new StaticSite(stack, 'landing', {
    path:         'packages/website',
    buildOutput:  '.output/public',
    buildCommand: 'yarn generate',
    errorPage:    'redirect_to_index_page',

    ...(['prod', 'dev'].includes(app.stage) && {
      customDomain: {
        domainName: app.stage === 'prod' ? 'internetcheckpoint.page':  'dev.internetcheckpoint.page',
        hostedZone: 'internetcheckpoint.page',
      },
    }),

    environment: {
      NUXT_STAGE:           stack.stage,
      NUXT_APP_DOMAIN:      app.stage === 'prod' ? 'internetcheckpoint.page':  'dev.internetcheckpoint.page',
      NUXT_API_URL:         api.url,
      NUXT_GA_ID:           'G-43W5RSPT9Y',
      NUXT_FIREBASE_CONFIG: prodFirebaseConfig,
    },
  });

  if (app.local) {

    fs.writeFileSync(
      './packages/website/.env',
      Object.entries(landing.getConstructMetadata().data.environment)
        .filter(([key, value]) => key !== 'NUXT_API_URL')
        .map(([key, value]) => `${key}=${value}`)
        .join('\n'),
      { flag: 'w' }
    );

  }

  stack.addOutputs({
    LandingUrl: landing.customDomainUrl ?? landing.url,
  });

}
