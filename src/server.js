// external dependencies
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const SwaggerUiExpress = require("swagger-ui-express");
const Sequlieze = require("sequelize");
const lodash = require("lodash");
const dotenv = require("dotenv").config();
const dayjs = require("dayjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");

// internal dependencies
const routerFcomposer = require("./router");
const handlerFcomposerHash = require("./handler");
const { version } = require("../package.json");
const connectionDB = require("./config/sequelize");
const modelComposerHash = require("./model");
const imageUpload = require("./utils/imageUploads");
const middlewareComposerHash = require("./middleware");

const app = express();

const diHash = {
  bcrypt,
  connectionDB,
  dayjs,
  DataTypes: Sequlieze.DataTypes,
  dotenv,
  express,
  handlerFcomposerHash,
  middlewareComposerHash,
  jwt,
  lodash,
  fs,
  imageUpload,
  moment,
  Sequlieze,
  model: modelComposerHash,
};

app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
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
      title: "aucteeon-backend-documentation",
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

app.get("/assets/img/:filename", async (req, res) => {
  res.sendFile(`${__dirname}/public/image/${req.params.filename}`);
});

const router = routerFcomposer(diHash);
app.use("/v1", router);

module.exports = {
  app,
  diHash,
};
