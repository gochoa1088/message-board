/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("conversations", (table) => {
    table.increments("id");
    table.text("author", 128).defaultTo("Anon");
    table.text("subject", 40).defaultTo("No Subject");
    table.text("content").notNullable();
    table.integer("votes").defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("conversations");
};
