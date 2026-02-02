/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "internetcheckpoint",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-1",
        }
      },
    };
  },
  async run() {
    await import("./infrastructure/Secrets");
    await import("./infrastructure/Api");
    await import("./infrastructure/Web");
  },
});
