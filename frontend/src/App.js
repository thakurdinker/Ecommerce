// import "./App.css";
import AllProducts from "./pages/products/allProducts";
import { Routes, Route, useLocation } from "react-router-dom";
import ShowProduct from "./pages/products/show";
import NavBar from "./components/NavBar";
import { NavBarSearchProvider } from "./contexts/NavSearchContext";
import LoginUser from "./pages/user/login";
import RegisterUser from "./pages/user/register";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/cart/cartShow";

function NoMatch() {
  const location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function App() {
  return (
    <>
      <NavBarSearchProvider>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
        ></ToastContainer>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<AllProducts />} />
          <Route exact path="/products/:id" element={<ShowProduct />} />
          <Route exact path="/user/:userID/cart" element={<Cart />} />
          <Route exact path="/login" element={<LoginUser />} />
          <Route exact path="/register" element={<RegisterUser />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </NavBarSearchProvider>
    </>
  );
}

export default App;
