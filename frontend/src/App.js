// import "./App.css";
import AllProducts from "./pages/products/allProducts";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import ShowProduct from "./pages/products/show";
import { NavBarSearchProvider } from "./contexts/NavSearchContext";
import LoginUser from "./pages/user/login";
import RegisterUser from "./pages/user/register";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/cart/cartShow";
import RegisterAdmin from "./pages/admin/register";
import LoginAdmin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import NavBar from "./components/NavBar";
import { UserProvider } from "./contexts/UserContext";
import { AdminContextProvider } from "./admin/context/AdminContext";
import ShowAdminProduct from "./pages/admin/showProduct";
import AdminProtectedPages from "./admin/components/AdminProtectedPages";
import NavBarAdmin from "./admin/components/Navbar";
import UserProtectedPages from "./components/UserProtectedPages";
import AddProduct from "./pages/admin/addProduct";
import Orders from "./pages/admin/orders";

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

function WithUserNav() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <UserProtectedPages>
          <Outlet />
        </UserProtectedPages>
      </UserProvider>
    </>
  );
}

function WithAdminNav() {
  return (
    <>
      <AdminContextProvider>
        <NavBarAdmin />
        <AdminProtectedPages>
          <Outlet />
        </AdminProtectedPages>
      </AdminContextProvider>
    </>
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
        <Routes>
          {/* User routes */}
          <Route exact path="/login" element={<LoginUser />} />
          <Route exact path="/register" element={<RegisterUser />} />
          <Route element={<WithUserNav />}>
            <Route exact path="/" element={<AllProducts />} />
            <Route exact path="/products/:id" element={<ShowProduct />} />
            <Route exact path="/user/:userID/cart" element={<Cart />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          {/* Admin Routes */}
          <Route exact path="/admin" element={<LoginAdmin />} />
          <Route exact path="/admin/register" element={<RegisterAdmin />} />
          <Route element={<WithAdminNav />}>
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              exact
              path="/admin/product/:productId"
              element={<ShowAdminProduct />}
            />
            <Route exact path="/admin/product/add" element={<AddProduct />} />
            <Route exact path="/admin/orders" element={<Orders />} />
          </Route>
        </Routes>
      </NavBarSearchProvider>
    </>
  );
}

export default App;
