const knex = require("../db/connection");
//This file is going to have all of the SQL queries for Theaters
function getTheaters() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*")
    .distinct();
}
module.exports = {
  getTheaters,
};
