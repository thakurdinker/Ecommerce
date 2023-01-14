import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DECREMENT_CART, User } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CheckOut from "../../components/Checkout";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [checkout, setCheckout] = useState(false);

  const navigate = useNavigate();

  const { user, dispatchUser } = useContext(User);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get(`/user/${user.id}/cart`);
        if (res.status === 200) {
          setCart(res.data.cart);
          setCheckout(localStorage.getItem("checkout"));
        }
      } catch (err) {
        console.log(err);
        console.log("Cart error");
        // toast.info("Cannot Access Cart. Please Login");
        // navigate("/login");
      }
    }
    fetchCart();
  }, [user.id, user.isLoggedIn, navigate]);

  const handleDeletebtnClick = async (itemId) => {
    console.log(itemId);
    try {
      const res = await axios.delete(`/user/${user.id}/cart`, {
        data: { itemId },
      });
      if (res.status === 200) {
        // Update Context
        dispatchUser({ type: DECREMENT_CART });
        // Update State
        setCart((prevCart) => {
          const updatedItems = prevCart.items.filter(
            (item) => item.product._id !== itemId
          );
          prevCart.items = updatedItems;
          return prevCart;
        });
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleBuyNow = async () => {
    if (!user.isLoggedIn) {
      toast.info("Please, Login first");
      navigate("/login");
      return;
    }
    try {
      for (let item of cart.items) {
        const res = await axios.post(`/products/${item.product._id}/buy`, {
          qty: item.qty,
        });
        console.log(res.data.message);
        if (res.status === 200) {
          // Remove product from the cart
          await handleDeletebtnClick(item.product._id);
        }
      }
      toast.success("Order(s) placed");
    } catch (err) {
      console.log(err);
      toast.err(err.response);
    }
  };

  if (checkout) {
    return <CheckOut cart={cart} handleDelete={handleDeletebtnClick} />;
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
                          onClick={() => handleDeletebtnClick(item.product._id)}
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
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  localStorage.setItem("checkout", true);
                  setCheckout(true);
                }}
              >
                Checkout
              </button>
              <button className="btn btn-warning" onClick={() => navigate(-1)}>
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
