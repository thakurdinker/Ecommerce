import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  NavBarSearchContext,
  HIDE_SEARCH_FILED,
} from "../../contexts/NavSearchContext";
import { User, INCREMENT_CART } from "../../contexts/UserContext";
import "./showPage.css";
import "../../stylesheets/star.css";
import Review from "../../components/Review/review";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShowProduct = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(null);
  const [reviewBody, setReviewBody] = useState("");
  const [recievedReviews, setRecievedReviews] = useState([]);

  const { dispatch } = useContext(NavBarSearchContext);
  const { user, dispatchUser } = useContext(User);

  const navigate = useNavigate();

  const handleReviewBody = (event) => {
    // console.log(event.target.value);
    setReviewBody(event.target.value);
  };

  const handleRatingChange = (event) => {
    // console.log(event.target.value);
    setRating(event.target.value);
  };

  const handleCart = async () => {
    if (!user.isLoggedIn) {
      toast.info("Please, Login first");
      navigate("/login");
      return;
    }
    // Add item to cart
    try {
      const res = await axios.post(`/user/${user.id}/cart`, {
        productId: product._id,
      });
      if (res.status === 200) {
        toast.success("Added to Cart");
        dispatchUser({ type: INCREMENT_CART });
      }

      // console.log(res);
      // console.log(user.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user.isLoggedIn) {
      toast.info("Please Login first");
      navigate("/login");
      return;
    }
    if (rating === null || reviewBody.trim() === "") {
      toast.info(
        "Please check rating is selected or rating filled is not empty"
      );
      return;
    }

    // Save review
    await axios.post(`/products/${id}/review`, {
      rating: rating,
      body: reviewBody,
      productId: id,
    });

    //repopulate reviews
    const res2 = await axios.get(`/products/${id}/review`);
    setRecievedReviews(res2.data.reviews);

    //clear input fields
    setRating(null);
    setReviewBody("");
  };

  const handleDelete = async (reviewID) => {
    const res = await axios.delete(`/products/${id}/review/${reviewID}`);
    if (res.status === 200) {
      toast.success("Successfully Deleted Review");
      // Update reviews on the page
      setRecievedReviews(function (prevReviews) {
        return prevReviews.filter((review) => review._id !== reviewID);
      });
    } else {
      toast.info(`Something happened. Please try again. Status: ${res.status}`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // fetch product
      const res1 = await axios.get(`/products/${id}`);
      setProduct(res1.data);
      //fetch all reviews for that product
      const res2 = await axios.get(`/products/${id}/review`);
      setRecievedReviews(res2.data.reviews);
    }
    fetchData();
    dispatch({ type: HIDE_SEARCH_FILED });
  }, [id, dispatch]);

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-6">
          <div className="card card_1">
            <img
              src={product.main_image}
              className="card-img-top show_page_image"
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>
                  Price: {product.price} {product.currency}
                </strong>
              </li>
              <li className="list-group-item">
                Category: {product.primary_category}, {product.sub_category_1},{" "}
                {product.sub_category_2}
              </li>
            </ul>
            <div className="card-body">
              <button
                className="btn btn-primary d-block mb-3 w-100"
                onClick={handleCart}
              >
                Add to Cart
              </button>
              <button className="btn btn-primary d-block w-100">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card_2">
            <div className="card-body ">
              <p className="card-text">
                <strong>Product description: </strong>
                <br />
                {product.description}
              </p>
            </div>
          </div>

          {/* List all Reviews */}
          <h5>Reviews:-</h5>
          {recievedReviews.length !== 0 &&
            recievedReviews.map(function (review) {
              return (
                <div key={review._id} className="card card_3 mb-1">
                  <div className="card-body ">
                    <p
                      className="starability-result"
                      data-rating={review.rating}
                    >
                      Rated: {review.rating} stars
                    </p>
                    <h6>{review.author.username}</h6>
                    <p className="card-text">{review.body}</p>
                    {user.isLoggedIn && review.author._id === user.id && (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          {/* Leave a Review */}
          <Review
            reviewBody={reviewBody}
            handleRatingChange={handleRatingChange}
            handleReviewBody={handleReviewBody}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
