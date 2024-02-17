const service = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

function updatedBody(req, res, next) {
  const { data: { score = null, content = null } = {} } = req.body;
  let updateBody = {};
  if (!content) {
    return next({ status: 400, message: `Missing score or content in body` });
  }
  if (score) {
    updateBody.score = score;
  }
  if (content) {
    updateBody.content = content;
  }
  res.locals.update = updateBody;
  return next();
}

async function updateReview(req, res) {
  // console.log('req body', req.body)
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };

  const reviewId = res.locals.review.review_id;
  // console.log({reviewId})
  await service.update(updatedReview, reviewId);
  //console.log({updatedRecord})
  const critic = await service.getCritic(updatedReview.critic_id);
  const responseData = {
    ...updatedReview,
    critic: critic[0],
  };

  console.log("response data", responseData);
  res.status(200).json({ data: responseData });
}

async function destroy(req, res) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}
module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [
    asyncErrorBoundary(reviewExists),
    updatedBody,
    asyncErrorBoundary(updateReview),
  ],
};
