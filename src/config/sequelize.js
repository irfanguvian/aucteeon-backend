const { Sequelize } = require("sequelize");
const lodash = require("lodash");
const dotenv = require("dotenv");

dotenv.config();

const db = {
  database: lodash.defaultTo(process.env.DB_DATABASE, ""),
  username: lodash.defaultTo(process.env.DB_USERNAME, ""),
  password: lodash.defaultTo(process.env.DB_PASSWORD, ""),
  dialect: "postgres",
  host: lodash.defaultTo(process.env.DB_HOST, "127.0.0.1"),
  port: lodash.defaultTo(Number(process.env.DB_PORT), 5432),
  timezone: lodash.defaultTo(process.env.DB_TIMEZONE, "+07:00"),
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: lodash.defaultTo(process.env.SSL_REQUIRED, false),
  //     rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
  //   },
  // },
};

const connectionDB = new Sequelize(db.database, db.username, db.password, {
  dialect: db.dialect,
  host: db.host,
  port: db.port,
  password: db.password,
  database: db.database,
  timezone: db.timezone,
  logging: false,
  pool: {
    max: 100,
    min: 0,
    acquire: 20000, // time require to reconnect
    idle: 20000, // get idle connection
    evict: 10000, // it actualy removes the idle connection
  },
});

module.exports = connectionDB;
