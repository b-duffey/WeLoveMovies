const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await service.readOneMovie(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function readOneMovie(req, res) {
  const { movie: data } = res.locals;

  res.status(200).json({ data });
}

async function readMovieTheaters(req, res, next) {
  const movie_id = req.params.movieId; // Access movie_id from the movie object
  const theaters = await service.readMovieTheaters(movie_id);
  res.status(200).json({ data: theaters });
}
async function readMovieReviews(req, res, next) {
  const movie_id = req.params.movieId;
  const reviews = await service.readMovieReviews(movie_id);
  const allReviews = [];

  for (const review of reviews) {
    //for..of loop to iterate each review object in the reviews array
    const critic = await service.getCritics(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }

  res.status(200).json({ data: allReviews });
}

async function listAllMovies(req, res, next) {
  res.json({ data: await service.listAllMovies() });
}

async function listMoviesIsShowing(req, res, next) {
  const { is_showing } = req.query;
  let data;
  if (is_showing === "true") {
    data = (await service.listMoviesIsShowing()).splice(0, 15);
  } else {
    data = await service.listAllMovies();
  }
  res.json({ data });
}

module.exports = {
  read: [
    asyncErrorBoundary(movieExists),
    readOneMovie,
    //readMovieTheaters,
    //readMovieReviews,
  ],
  readMovieTheaters: asyncErrorBoundary(readMovieTheaters),
  readMovieReviews: asyncErrorBoundary(readMovieReviews),

  listAllMovies: asyncErrorBoundary(listAllMovies),
  listMoviesIsShowing: asyncErrorBoundary(listMoviesIsShowing),
};
