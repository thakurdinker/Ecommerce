import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User } from "../../contexts/UserContext";

const Cart = () => {
  const [cart, setCart] = useState({});

  const navigate = useNavigate();

  const { user } = useContext(User);

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

  if (!cart.user) {
    return <h1 className="text-center">Cart is Empty</h1>;
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
                    <th scope="row">{item.title}</th>
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
