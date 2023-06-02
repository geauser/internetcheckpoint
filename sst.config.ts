import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { WebStack } from "./stacks/WebStack";

export default {
  config(_input) {
    return {
      name: "internetcheckpoint",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
      .stack(ApiStack)
      .stack(WebStack);
  }
} satisfies SSTConfig;
