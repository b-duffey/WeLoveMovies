exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary(); // Sets movie_id as the primary key
    table.text("content");
    table.integer("score");
    table
      .integer("critic_id") // Corrected column name and data type
      .unsigned()
      .references("critic_id")
      .inTable("critics")
      .onDelete("cascade");
    table
      .integer("movie_id") // Corrected column name and data type
      .unsigned()
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
