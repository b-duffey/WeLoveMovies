exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.boolean("is_showing"); // Corrected data type
    table
      .integer("movie_id") // Corrected column name and data type
      .unsigned()
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
    table
      .integer("theater_id") // Corrected column name and data type
      .unsigned()
      .references("theater_id") // Assuming it's theater_id, correct if needed
      .inTable("theaters")
      .onDelete("cascade");
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
