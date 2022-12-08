const dbEngine = "production";
const config = require("./knexfile")[dbEngine];
console.log(config);
module.exports = require("knex")(config);
