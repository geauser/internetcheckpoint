import { StackContext, StaticSite, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';


export function WebStack({ stack, app }: StackContext) {

  const api = use(ApiStack);


  const landing = new StaticSite(stack, 'landing', {
    path:         'packages/website',
    buildOutput:  '.output/public',
    buildCommand: 'yarn generate',
    errorPage:    'redirect_to_index_page',

    ...(app.stage === 'prod' && {
      customDomain: {
        domainName: 'internetcheckpoint.page',
        hostedZone: 'internetcheckpoint.page',
      },
    }),

    environment: {
      NUXT_API_URL: api.url,
      NUXT_GOOGLE_ANALYTICS_ID: stack.stage === 'prod' ? 'G-43W5RSPT9Y' : '',
    },
  });

  stack.addOutputs({
    LandingUrl: landing.customDomainUrl ?? landing.url,
  });

}
