import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataFecth } from "../../utils/useDataFetch";
import axios from "axios";
import { toast } from "react-toastify";

import "../../stylesheets/star.css";
import EditProduct from "../../admin/components/EditProduct";

const ShowAdminProduct = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [editing, isEditing] = useState(false);

  useDataFecth(`/admin/products/${productId}`, setData);

  const handleProductDelete = async () => {
    try {
      const res = await axios.delete(`/admin/products/${productId}`);
      console.log(res.data.message);
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewDelete = async (reviewID) => {
    const res = await axios.delete(
      `/admin/products/${productId}/review/${reviewID}`
    );

    console.log(res.data);
    if (res.status === 200) {
      toast.success("Successfully Deleted Review");
      // Reload the page
      document.location.reload();
    } else {
      toast.info(`Something happened. Please try again. Status: ${res.status}`);
    }
  };

  return (
    <>
      {!data.product ? (
        <h1 className="text-center">Product details not available</h1>
      ) : (
        <>
          <div className="container mt-2">
            {editing ? (
              <EditProduct
                product={data.product}
                isEditing={isEditing}
                navigate={navigate}
              />
            ) : (
              <div className="row">
                <div className="col-md-6">
                  <div className="card card_1">
                    <img
                      src={data.product.main_image}
                      className="card-img-top show_page_image"
                      alt=""
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.product.title}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>
                          Price: {data.product.price} {data.product.currency}
                        </strong>
                      </li>
                      <li className="list-group-item">
                        Category: {data.product.primary_category},{" "}
                        {data.product.sub_category_1},{" "}
                        {data.product.sub_category_2}
                      </li>
                      <li className="list-group-item">
                        <button
                          className="btn btn-info me-2"
                          onClick={() => isEditing(true)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={handleProductDelete}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card card_2">
                    <div className="card-body ">
                      <p className="card-text">
                        <strong>Product description: </strong>
                        <br />
                        {data.product.description}
                      </p>
                    </div>
                  </div>

                  {/* List all Reviews */}
                  <h5>Reviews:-</h5>
                  {data.reviews &&
                    data.reviews.length !== 0 &&
                    data.reviews.map(function (review) {
                      return (
                        <div key={review._id} className="card card_3 mb-1">
                          <div className="card-body ">
                            <p
                              className="starability-result"
                              data-rating={review.rating}
                            >
                              Rated: {review.rating} stars
                            </p>
                            <p className="card-text">{review.body}</p>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleReviewDelete(review._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ShowAdminProduct;
