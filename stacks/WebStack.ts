import { StackContext, StaticSite, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';


export function WebStack({ stack, app }: StackContext) {

  const api = use(ApiStack);


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
      NUXT_APP_DOMAIN: app.stage === 'prod' ? 'internetcheckpoint.page':  'dev.internetcheckpoint.page',
      NUXT_API_URL: api.url,
      NUXT_GA_ID: 'G-43W5RSPT9Y',
    },
  });

  stack.addOutputs({
    LandingUrl: landing.customDomainUrl ?? landing.url,
  });

}
