const dbEngine = "production";
const config = require("./knexfile")[dbEngine];
module.exports = require("knex")(config);
