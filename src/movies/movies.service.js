const knex = require("../db/connection");
//This file is going to have all of the SQL queries for Movies

const tableName = "movies";

//List all movies
function listAllMovies() {
  return knex("movies").select("*");
}

//List all movies where is_showing = true
function listMoviesIsShowing() {
  return knex("movies").select("*").where({ is_showing: true });
}

//Read movies given movie ID

function readOneMovie(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readMovieTheaters(movieId) {
  return knex("movies_theaters as mt")
    .join("movies as m, mt.movie_id, m.movie_id")
    .where({ "mt.movie_id": movieId });
}

function readMovieReviews(movieId) {
  return knex("reviews as r")
    .join("movies as m, r.movie_id, m.movie_id")
    .where({ "r.movie_id": movieId });
}

module.exports = {
  listAllMovies,
  listMoviesIsShowing,
  readOneMovie,
  readMovieTheaters,
  readMovieReviews,
};
