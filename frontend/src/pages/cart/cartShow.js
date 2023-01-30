import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CheckOut from "../../components/Checkout";
import { CartContext } from "../../contexts/cartContext";
import { User } from "../../contexts/UserContext";

const Cart = () => {
  const navigate = useNavigate();

  const { user } = useContext(User);
  const {
    cart,
    handleDeletebtnClick,
    checkout,
    setCheckout,
    singleItem,
    setSingleItem,
  } = useContext(CartContext);

  // Handles buy now from checkout page
  const handleBuyNow = async (shipping, paymentOption, cart) => {
    if (!user.isLoggedIn) {
      toast.info("Please, Login first");
      navigate("/login");
      return;
    }
    try {
      for (let item of cart.items) {
        const res = await axios.post(`/products/${item.product._id}/buy`, {
          qty: item.qty,
          shipping: shipping,
          paymentOption: paymentOption,
        });
        console.log(res.data.message);
        if (res.status === 200) {
          // Remove product from the cart
          await handleDeletebtnClick(item.product._id);
        }
      }
      toast.success("Order(s) placed");
      localStorage.clear();
      document.location.reload();
    } catch (err) {
      console.log(err);
      toast.err(err.response);
    }
  };

  if (checkout) {
    return (
      <CheckOut
        cart={singleItem !== null ? singleItem : cart}
        handleDelete={handleDeletebtnClick}
        handleBuyNow={handleBuyNow}
        setSingleItem={setSingleItem}
      />
    );
  }

  if (!cart.user) {
    return (
      <>
        <h1 className="text-center">Cart is Empty</h1>
      </>
    );
  } else {
    return (
      <>
        <h1 className="text-center">
          Your cart {`(${cart.items.length} Items)`}
        </h1>
        {cart.items.length !== 0 && (
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(function (item) {
                  return (
                    <tr key={item._id}>
                      <th scope="row">
                        {item.product.title} <br />{" "}
                        <button
                          className="btn"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await handleDeletebtnClick(item.product._id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </th>
                      <td>
                        {item.product.price} {item.product.currency}
                      </td>
                      <td>{item.qty}</td>
                      <td>
                        {item.product.price * item.qty} {item.product.currency}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-grid gap-2 d-flex justify-content-end d-md-flex justify-content-md-end">
              <button
                className="btn btn-success fw-bold rounded-pill"
                onClick={() => {
                  localStorage.setItem("checkout", true);
                  setCheckout(true);
                }}
              >
                Checkout
              </button>
              <button
                className="btn btn-outline-danger rounded-pill fw-bold"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Cart;
