import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { WebStack } from "./stacks/WebStack";
import { ConfigStack } from "./stacks/ConfigStack";

export default {
  config(_input) {
    return {
      name: "internetcheckpoint",
      region: "us-east-1",
    };
  },
  stacks(app) {

    app.setDefaultFunctionProps({
      runtime: "nodejs18.x",
      timeout: 10 * 60,
      environment: {
        ...(app.local && { FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099" }),
      },
    });

    app
      .stack(ConfigStack)
      .stack(ApiStack)
      .stack(WebStack);
  }
} satisfies SSTConfig;
