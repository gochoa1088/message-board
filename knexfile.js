// Update with your config settings.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  // development: {
  //   client: "sqlite3",
  //   connection: {
  //     filename: "./data/posts.sqlite3",
  //   },
  //   useNullAsDefault: true,
  // },
  development: {
    client: "pg",
    connection: {
      database: "message-board",
      user: process.env.USER,
      password: process.env.PW,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
  production: {
    client: "pg",
    connection: {
      database: "message-board",
      user: process.env.USER,
      password: process.env.PW,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
