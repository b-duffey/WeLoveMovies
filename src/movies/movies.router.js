const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

/*
//movieId validation with REGEX
router
  .route("/:movieId([0-9]+)")
  .get(controller.readOneMovie)
  .all(methodNotAllowed);

  */

router
  .route("/:movieId/theaters")
  .get(controller.readMovieTheaters)
  .all(methodNotAllowed);
router
  .route("/:movieId/reviews")
  .get(controller.readMovieReviews)
  .all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.listMoviesIsShowing).all(methodNotAllowed);
module.exports = router;
