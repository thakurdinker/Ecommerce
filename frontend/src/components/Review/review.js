const Review = ({
  handleSubmit,
  handleRatingChange,
  reviewBody,
  handleReviewBody,
}) => {
  return (
    <>
      <h2>Leave a Review</h2>
      <form className="validate-form mb-3" onSubmit={handleSubmit}>
        <fieldset
          onChange={handleRatingChange}
          className="starability-basic"
          aria-required="true"
        >
          <input
            type="radio"
            id="no-rate"
            className="input-no-rate"
            name="review[rating]"
            value="0"
            aria-label="No rating."
            defaultChecked
          />
          <input
            type="radio"
            id="first-rate1"
            name="review[rating]"
            value="1"
          />
          <label htmlFor="first-rate1" title="Terrible">
            1 star
          </label>
          <input
            type="radio"
            id="first-rate2"
            name="review[rating]"
            value="2"
          />
          <label htmlFor="first-rate2" title="Not good">
            2 stars
          </label>
          <input
            type="radio"
            id="first-rate3"
            name="review[rating]"
            value="3"
          />
          <label htmlFor="first-rate3" title="Average">
            3 stars
          </label>
          <input
            type="radio"
            id="first-rate4"
            name="review[rating]"
            value="4"
          />
          <label htmlFor="first-rate4" title="Very good">
            4 stars
          </label>
          <input
            type="radio"
            id="first-rate5"
            name="review[rating]"
            value="5"
          />
          <label htmlFor="first-rate5" title="Amazing">
            5 stars
          </label>
        </fieldset>
        <div className="mb-3">
          <label htmlFor="reviewBody" className="form-label">
            Review Text
          </label>
          <textarea
            className="form-control"
            name="review[body]"
            id="reviewBody"
            cols="30"
            rows="3"
            required
            value={reviewBody}
            onChange={handleReviewBody}
          ></textarea>
          <div className="valid-feedback">Looks good!</div>
        </div>
        <button className="btn btn-success mb-3">Submit</button>
      </form>
    </>
  );
};

export default Review;
