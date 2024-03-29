import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cartContext";
import "./product.css";

function ProductCard({ product }) {
  const { _id, title, images, price, primary_category } = product;
  const navigate = useNavigate();
  const { handleCart } = useContext(CartContext);
  return (
    <div id="product_container" className="container-fluid">
      <div onClick={() => navigate(`/products/${_id}`)}>
        <div>
          <img id="product_img" src={images[0]} className="img-fluid" alt="" />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="fw-bold">
            {title.slice(0, 20)}
            ..
          </h6>
          <h6 className="fw-bold">
            <sup>$</sup>
            {price.toString().split(".")[0]}
            <sup>
              {price.toString().split(".")[1] === undefined
                ? ""
                : `.${price.toString().split(".")[1]}`}
            </sup>
          </h6>
        </div>
      </div>
      <div id="category_btn_container">
        <p className="text-muted">{primary_category}</p>
        <button
          className="btn btn-outline-success fw-bold"
          onClick={async (e) => {
            e.stopPropagation();
            await handleCart(product, 1);
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
