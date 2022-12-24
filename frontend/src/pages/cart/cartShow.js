import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DECREMENT_CART, User } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [cart, setCart] = useState({});

  const navigate = useNavigate();

  const { user, dispatchUser } = useContext(User);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get(`/user/${user.id}/cart`);
        if (res.status === 200) {
          setCart(res.data.cart);
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

  const handlebtnClick = async (itemId) => {
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
            (item) => item._id !== itemId
          );
          prevCart.items = updatedItems;
          return prevCart;
        });
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

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
                      {item.title} <br />{" "}
                      <button
                        className="btn"
                        onClick={() => handlebtnClick(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </th>
                    <td>
                      {item.price} {item.currency}
                    </td>
                    <td>1</td>
                    <td>
                      {item.price * 1} {item.currency}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default Cart;
