// external dependencies
const cors = require("cors");
const express = require("express");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const SwaggerUiExpress = require("swagger-ui-express");
const { version } = require("../package.json");

// internal dependencies
const routerFcomposer = require("./router");
const handlerFcomposerHash = require("./handler");

// app registration
// const env = {
//   APP_ENV: process.env.APP_ENV,
//   APP_VERSION: process.env.APP_VERSION,
// };
const app = express();

const diHash = {
  express,
  handlerFcomposerHash,
};
const router = routerFcomposer(diHash);
app.use("/v1", router);
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Error handler registration
// --------------------------
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message,
  });
});

// swager regis
const swaggerJsdocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "str-backend",
      version,
      // version: env.APP_VERSION,
    },
    servers: [
      { url: "/v1" },
    ],
  },
  apis: [
    // "./app/lib/*.js",
    "./src/router/*.js",
    "./src/router/**/*.js",
  ],
};

const swaggerUiExpressOption = {
  swaggerOptions: {
    operationsSorter: "alpha",
    tagsSorter: "alpha",
  },
};

const swaggerSpec = swaggerJSDoc(swaggerJsdocOptions);

app.use("/docs", SwaggerUiExpress.serve, SwaggerUiExpress.setup(swaggerSpec, swaggerUiExpressOption));
app.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJsdocOptions);
});

module.exports = app;
