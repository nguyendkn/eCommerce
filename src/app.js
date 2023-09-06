const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// init middlewares
app.use(morgan("dev")) /* DEVELOPMENT */;
// app.use(morgan("combined")) /* PRODUCTION */;
app.use(helmet());
app.use(compression());

// init database

// init routes
app.get("/", (req, res, next) => {
  const compress = "hello world";
  return res.status(200).json({
    message: "hello world",
    metadata: compress.repeat(10000),
  });
});

//handling error

module.exports = app;