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
        <Outlet />
      </UserProvider>
    </>
  );
}

function WithAdminNav() {
  return (
    <>
      <AdminContextProvider>
        <Outlet />
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
          <Route element={<WithUserNav />}>
            <Route exact path="/" element={<AllProducts />} />
            <Route exact path="/products/:id" element={<ShowProduct />} />
            <Route exact path="/user/:userID/cart" element={<Cart />} />
            <Route exact path="/login" element={<LoginUser />} />
            <Route exact path="/register" element={<RegisterUser />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<WithAdminNav />}>
            <Route exact path="/admin" element={<LoginAdmin />} />
            <Route exact path="/admin/register" element={<RegisterAdmin />} />
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </NavBarSearchProvider>
    </>
  );
}

export default App;
