import convict from "convict";

const conf = convict({
  env: {
    format: ["development", "production", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  server: {
    port: {
      format: "port",
      default: 3000,
      env: "NODE_PORT",
    },
  },
});

conf.validate({ allowed: "strict" });

export default conf.getProperties();
