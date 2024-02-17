const knex = require("../db/connection");
function read(reviewId) {
  return knex("reviews").where("review_id", reviewId).first();
}

function destroy(reviewId) {
  return knex("reviews").where("review_id", reviewId).del();
  //may be where review_id: reviewId
}
function update(updatedReview, reviewId) {
  const { review_id, ...updateData } = updatedReview;
  // console.log('update data', updateData)
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update({ ...updateData, updated_at: knex.fn.now() });
  // .update({ content: 'AAAAA', score: '11111'}) //update method returns info that the record was updated, not the object
  //  .then((updatedRecords) => console.log({updatedRecords}));
}

function getCritic(criticId) {
  return knex("critics").where("critic_id", criticId).select("*");
}

module.exports = {
  read,
  delete: destroy,
  update,
  getCritic,
};
