const knex = require("../db/connection");
//This file is going to have all of the SQL queries for Theaters
function list() {
  return knex("theaters").select("*");
}

function getMovies(theaterId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.is_showing")
    .where({ "t.theater_id": theaterId });
}

module.exports = {
  list,
  getMovies,
};
