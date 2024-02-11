const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function readOneMovie(req, res) {
  const movieId = res.locals.movie.movie_id; //now you can access the product in res locals
  const movieInfo = await movies.readOneMovie(movieId);

  res.status(200).json({ data: movieInfo });
}
async function readMovieTheaters(req, res, next) {
  const movieId = res.locals.movie.movie_id;
  const theaters = await readMovieTheaters(movieId);
  res.status(200).json({ data: theaters });
}

async function readMovieReviews(req, res, next) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await readMovieReviews(movieId);
  res.status(200).json({ data: reviews });
}
async function listAllMovies(req, res, next) {
  res.json({ data: await service.listAllMovies() });
}

async function listMoviesIsShowing(req, res, next) {
  res.json({ data: await service.listMoviesIsShowing() });
}

module.exports = {
  read: [
    asyncErrorBoundary(movieExists),
    readOneMovie,
    readMovieTheaters,
    readMovieReviews,
  ],
  listAllMovies: asyncErrorBoundary(listAllMovies),
  listMoviesIsShowing: asyncErrorBoundary(listMoviesIsShowing),
};
