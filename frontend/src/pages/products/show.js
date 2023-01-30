import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  NavBarSearchContext,
  HIDE_SEARCH_FILED,
} from "../../contexts/NavSearchContext";
import { User } from "../../contexts/UserContext";
import "./showPage.css";
import "../../stylesheets/star.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faBookBookmark,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../contexts/cartContext";

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    _id: "",
    title: "",
    brand: "",
    images: [],
    description: "",
    price: null,
    stock: null,
    primary_category: "",
    sub_category_1: "",
    sub_category_2: "",
    seller: "",
    main_image: "",
  });
  const [rating, setRating] = useState(null);
  const [reviewBody, setReviewBody] = useState("");
  const [recievedReviews, setRecievedReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const { dispatch } = useContext(NavBarSearchContext);
  const { user } = useContext(User);
  const { handleCart, handleSingleBuyNow } = useContext(CartContext);

  const navigate = useNavigate();

  const handleReviewBody = (event) => {
    // console.log(event.target.value);
    setReviewBody(event.target.value);
  };

  const handleRatingChange = (event) => {
    // console.log(event.target.value);
    setRating(event.target.value);
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

  // Handles Review delete
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
    const controller = new AbortController();
    async function fetchData() {
      // fetch product
      try {
        const res1 = await axios.get(`/products/${id}`, {
          signal: controller.signal,
        });
        setProduct(res1.data);
      } catch (err) {
        console.log(err);
      }
      //fetch all reviews for that product
      try {
        const res2 = await axios.get(`/products/${id}/review`);
        setRecievedReviews(res2.data.reviews);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    dispatch({ type: HIDE_SEARCH_FILED });

    // Cleanup
    return () => {
      controller.abort();
    };
  }, [id, dispatch]);

  const calculateAverageRating = () => {
    let sum = 0;
    for (let review of recievedReviews) {
      sum = sum + review.rating;
    }
    return Math.floor(sum / recievedReviews.length);
  };

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col col-md-6">
            <div
              id="main_image_container"
              className="mb-4 d-flex justify-content-center align-items-center bg-light"
            >
              <img src={product.main_image} alt="" className="img-fluid" />
            </div>
            <div id="secondary_images_container" className="d-flex flex-row">
              {product.images.map(function (image, index) {
                return (
                  <div key={index} className="w-25 p-3 flex-shrink-1 bg-light">
                    <img src={image} alt="" className="img-fluid" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col col-md-6">
            <h4 className="text-start mt-2 fw-bold">{product.title}</h4>
            <p className="text-truncate text-start mt-4">
              {product.description}
            </p>
            {recievedReviews.length !== 0 && (
              <div className="d-flex flex-row justify-content-start align-items-start">
                <p
                  id="average_rating"
                  className="starability-result"
                  data-rating={calculateAverageRating()}
                ></p>
                <span className="d-inline-block fw-bold ms-1">
                  ({recievedReviews.length})
                </span>
              </div>
            )}
            <div className="border-2 border-top border-bottom mt-5 d-flex flex-row justify-content-start align-items-center pt-4 pb-4">
              <h4 className="text-start fw-bold">${product.price}</h4>
            </div>
            <div
              id="buyNow"
              className="border-2 border-bottom d-flex flex-column justify-content-between align-items-start pt-4 pb-4"
            >
              <div className="d-flex flex-row justify-content-start align-items-center w-100">
                <div
                  id="qty_increment"
                  className="border border-2 d-flex w-auto flex-row justify-content-between align-items-center fw-bold bg-light pt-1 pb-1 ps-4 pe-4 rounded-pill"
                >
                  <span
                    id="decrement"
                    name="decrement"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (qty > 1) {
                        setQty((prevQty) => {
                          return (prevQty = prevQty - 1);
                        });
                      }
                    }}
                    className={`d-inline-block me-4 ${
                      parseInt(qty) === 1 && "text-muted"
                    }`}
                  >
                    -
                  </span>
                  <span id="qty" className="d-inline-block text-success">
                    {qty}
                  </span>
                  <span
                    id="increment"
                    name="increment"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (qty < product.stock) {
                        setQty((prevQty) => (prevQty = prevQty + 1));
                      }
                    }}
                    className="d-inline-block ms-4"
                  >
                    +
                  </span>
                </div>
                <p className="ms-2">
                  {parseInt(product.stock) <= 0 ? (
                    <span className="fw-bold text-danger">Out of stock</span>
                  ) : (
                    <>
                      {" "}
                      Only{" "}
                      <span style={{ color: "orangered" }}>
                        {product.stock} Items
                      </span>{" "}
                      Left!
                      <br /> Don't miss it
                    </>
                  )}
                </p>
              </div>
              <div className="mt-4 d-flex justify-content-start align-items-center w-100">
                <button
                  id="buynowbtn"
                  className="btn btn-success fw-bold rounded-pill me-3 pe-md-3 ps-md-3 pt-md-2 pb-md-2 pe-xl-4 ps-xl-4 pt-xl-2 pb-xl-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSingleBuyNow(product, qty);
                  }}
                >
                  Buy Now
                </button>
                <button
                  id="addtocartbtn"
                  className="btn btn-outline-success fw-bold rounded-pill p-1 pe-md-3 ps-md-3 pt-md-2 pb-md-2 pe-xl-5 ps-xl-5 pt-xl-2 pb-xl-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCart(product, qty);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="">
              <div className="border-2 border-bottom pt-2 pb-2 d-flex flex-column justify-content-center align-items-start">
                <p className="fw-bold mb-0">
                  <FontAwesomeIcon icon={faTruck} color={"orangered"} />
                  <span className="d-inline-block ms-2">Free Delivery</span>
                </p>
                <p className="text-decoration-underline text-muted">
                  Enter your postal code for Delivery Availibility
                </p>
              </div>

              <div className="d-flex pt-2 pb-2 flex-column justify-content-center align-items-start">
                <p className="fw-bold mb-0">
                  <FontAwesomeIcon icon={faBookBookmark} color={"orangered"} />
                  <span className="d-inline-block ms-2">Return Delivery</span>
                </p>
                <p className="text-muted">
                  Free 30 days Delivery Returns.{" "}
                  <span className="text-decoration-underline">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="row mt-3 border-top border-2">
          <div className="col-12 col-md-6">
            <div id="review_section" className="row mt-5">
              <div className="col-4 col-md-3">
                <div className="d-flex flex-column justify-content-start align-items-center align-items-md-center h-100">
                  <span className="fs-5 text fw-semibold">Review</span>
                  <div className="h-100 mt-2">
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      size="3x"
                      className=""
                      color="orangered"
                    />
                  </div>
                </div>
              </div>
              <div className="col-8 col-md-9">
                <form
                  id="rating_form"
                  className="d-flex flex-column justify-content-start align-items-start"
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex flex-column justify-content-start align-items-start flex-md-row justify-content-md-start align-items-md-start">
                    <span className="text-muted fs-6 text fw-semibold text-start me-md-3 pt-md-1">
                      Your rating
                    </span>
                    <fieldset
                      onChange={handleRatingChange}
                      className="starability-basic d-flex justify-content-start align-items-center"
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
                  </div>
                  <div className="w-100">
                    <textarea
                      className="form-control"
                      name="review[body]"
                      id="reviewBody"
                      rows="3"
                      required
                      value={reviewBody}
                      onChange={handleReviewBody}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="ps-0 btn btn-default text-success fw-bold"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* All reviews */}
          <div className="col-12 col-md-6">
            {recievedReviews.length !== 0 &&
              recievedReviews.map(function (review) {
                return (
                  <div key={review._id} className="border-bottom border-2 p-3">
                    <div className="d-flex flex-row justify-content-start align-items-start">
                      <FontAwesomeIcon
                        className="align-self-center"
                        icon={faUserCircle}
                        color="orangered"
                        size="2x"
                      />
                      <div className="ms-2">
                        <span className="fs-6 text fw-semibold">
                          {review.author.username}
                        </span>
                        <p
                          className="starability-result"
                          data-rating={review.rating}
                        ></p>
                      </div>
                    </div>
                    <p className="text-justified">{review.body}</p>
                    {user.isLoggedIn && review.author._id === user.id && (
                      <button
                        className="btn btn-default text-danger fw-bold ps-0"
                        onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowProduct;

// <div className="container mt-2">
// <div className="row">
//   <div className="col-md-6">
//     <div className="card card_1">
//       {/* <img
//         src={product.main_image}
//         className="card-img-top show_page_image"
//         alt=""
//       /> */}
//       <Carousel images={product.images} />
//       <div className="card-body">
//         <h5 className="card-title">{product.title}</h5>
//       </div>
//       <ul className="list-group list-group-flush">
//         <li className="list-group-item">
//           <strong>
//             Price: {product.price} {product.currency}
//           </strong>
//         </li>
//         <li className="list-group-item">
//           Category: {product.primary_category}, {product.sub_category_1}
//           , {product.sub_category_2}
//         </li>
//       </ul>
//       <div className="card-body">
//         <div className="mb-3">
//           {product.stock === 0 ? (
//             <h5 className="text-danger text-center">Out of Stock</h5>
//           ) : (
//             <>
//               <label htmlFor="qty" className="form-label">
//                 <strong> Quantity </strong>
//               </label>
//               <input
//                 type="number"
//                 min={1}
//                 max={product.stock}
//                 className="form-control"
//                 id="qty"
//                 name="qty"
//                 value={qty}
//                 onChange={(e) => {
//                   if (e.target.value <= product.stock)
//                     setQty(e.target.value);
//                   else {
//                     e.target.placeholder = `Only ${product.stock} stock(s) available`;
//                     e.target.style.color = "red";
//                   }
//                 }}
//               />
//             </>
//           )}
//         </div>
//         <button
//           className="btn btn-primary d-block mb-3 w-100"
//           onClick={handleCart}
//         >
//           Add to Cart
//         </button>
//         {/* <button
//           className="btn btn-primary d-block w-100"
//           onClick={handleBuyNow}
//         >
//           Buy Now
//         </button> */}
//       </div>
//     </div>
//   </div>
//   <div className="col-md-6">
//     <div className="card card_2">
//       <div className="card-body ">
//         <p className="card-text">
//           <strong>Product description: </strong>
//           <br />
//           {product.description}
//         </p>
//       </div>
//     </div>

//     {/* List all Reviews */}
//     <h5>Reviews:-</h5>
//     {recievedReviews.length !== 0 &&
//       recievedReviews.map(function (review) {
//         return (
//           <div key={review._id} className="card card_3 mb-1">
//             <div className="card-body ">
//               <p
//                 className="starability-result"
//                 data-rating={review.rating}
//               >
//                 Rated: {review.rating} stars
//               </p>
//               <h6>{review.author.username}</h6>
//               <p className="card-text">{review.body}</p>
//               {user.isLoggedIn && review.author._id === user.id && (
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(review._id)}
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     {/* Leave a Review */}
//     <Review
//       reviewBody={reviewBody}
//       handleRatingChange={handleRatingChange}
//       handleReviewBody={handleReviewBody}
//       handleSubmit={handleSubmit}
//     />
//   </div>
// </div>
// </div>
