import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DECREMENT_CART, INCREMENT_CART, User } from "./UserContext";

const { createContext, useEffect, useContext, useState } = require("react");

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [checkout, setCheckout] = useState(false);
  const [singleItem, setSingleItem] = useState(null);

  const [localCart, addToLocalCart] = useState([]); // Locally keep store of items in cart, used for checking if duplicate items are not in cart

  const { user, dispatchUser } = useContext(User);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await axios.get(`/user/${user.id}/cart`);
        if (res.status === 200) {
          setCart(res.data.cart);
          addToLocalCart(() => {
            return res.data.cart.items.map(function (item) {
              return item.product._id;
            });
          });
          setCheckout(localStorage.getItem("checkout"));
        }
      } catch (err) {
        console.log(err);
        console.log("Cart error");
      }
    }
    fetchCart();
  }, [user.id]);

  // Handles Add to Cart
  const handleCart = async (product, qty) => {
    if (!user.isLoggedIn) {
      toast.info("Please, Login first");
      navigate("/login");
      return;
    }

    if (product.stock === 0) {
      toast.error("Out of Stock");
      return;
    }
    // Add item to cart

    // Check if the item is already in the cart
    if (localCart.includes(product._id)) {
      toast.info("Item already in cart");
      return;
    }

    try {
      // Add to Cart
      const res = await axios.post(`/user/${user.id}/cart`, {
        productId: product._id,
        qty: qty,
      });

      if (res.status === 200) {
        toast.success("Added to Cart");
        dispatchUser({ type: INCREMENT_CART });
        addToLocalCart((prevState) => {
          return [...prevState, product._id];
        });
      }

      // console.log(res);
      // console.log(user.id);
    } catch (err) {
      console.log(err);
    }
  };

  //   Handles delete from cart or from checkout page
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

        addToLocalCart((prevState) => {
          return prevState.filter((id) => id !== itemId);
        });

        if (cart.items.length === 0) {
          localStorage.removeItem("checkout");
          document.location.reload();
        }
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  //   Hanldes single item buy now, without adding item to cart
  const handleSingleBuyNow = async (product, qty) => {
    if (!user.isLoggedIn) {
      toast.info("Please, Login first");
      navigate("/login");
      return;
    }
    if (product.stock === 0) {
      toast.error("Out of Stock");
      return;
    }

    setCheckout(() => true);
    // create a temp cart, containing only single item,
    // we do this so that checkout page used for cart can also be used for single item buy
    setSingleItem(() => {
      return {
        items: [{ qty: qty, product: product }],
        user: {
          email: user.email,
          role: user.role,
          username: user.username,
          addresses: user.addresses,
          _id: user.id,
        },
      };
    });
    navigate(`/user/${user.id}/cart`);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleCart,
        handleDeletebtnClick,
        handleSingleBuyNow,
        addToLocalCart,
        checkout,
        setCheckout,
        singleItem,
        setSingleItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
