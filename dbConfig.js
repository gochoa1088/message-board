const dbEngine = process.env.DB_ENVIRONMENT || "development";
const config = require("./knexfile")[dbEngine];
console.log(config);

module.exports = require("knex")(config);
