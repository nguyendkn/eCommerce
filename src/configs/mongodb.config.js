"use strict";

const dev = {
  app: {
    port: process.env.PORT,
  },
  database: {
    host: process.env.DEV_MONGO_HOST,
    port: process.env.DEV_MONGO_PORT,
    name: process.env.DEV_MONGO_DATABASE,
  },
};

const prod = {
  app: {
    port: process.env.PORT,
  },
  database: {
    host: process.env.PROD_MONGO_HOST,
    port: process.env.PROD_MONGO_PORT,
    name: process.env.PROD_MONGO_DATABASE,
  },
};

const configs = { dev, prod };
const env = process.env.ENVIRONMENT || "dev";

module.exports = configs[env];
