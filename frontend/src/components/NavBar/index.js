import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  NavBarSearchContext,
  ADD_REQUESTED_PRODUCT,
} from "../../contexts/NavSearchContext";
import { User, RESET } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { state, dispatch } = useContext(NavBarSearchContext);

  const { user, dispatchUser } = useContext(User);

  const navigate = useNavigate();

  const handleInput = (event) => {
    if (event.target.value.trim() === "") {
      dispatch({ type: RESET });
    }
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      const { data } = await axios.get(
        `/products?search=${searchQuery.trim()}`
      );

      dispatch({ type: ADD_REQUESTED_PRODUCT, data: data.requestedProducts });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("/logout");
      if (res.status === 200) {
        toast.success("Logged Out");
        dispatchUser({ type: RESET });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const goToCart = () => {
    if (!user.isLoggedIn) {
      toast.info("Please Login First");
      return;
    }
    navigate(`/user/${user.id}/cart`);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          Shopcart
        </a>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <button
                className="btn nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Deals
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Whats new
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/">
                Delivery
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInput}
            />
            <button
              className="btn btn-outline-success fw-bold"
              type="submit"
              style={{ borderRadius: "2em" }}
            >
              Search
            </button>
          </form>

          <ul className="navbar-nav ms-3">
            {!user.isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </>
            )}

            {user.isLoggedIn && (
              <>
                <li className="nav-item">
                  <button className="btn nav-link" onClick={goToCart}>
                    <FontAwesomeIcon icon={faCartShopping} />{" "}
                    <sup>{user.itemsInCart}</sup>
                  </button>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="btn nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item">Account</button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(`/user/orders`)}
                      >
                        Orders
                      </button>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <button className="btn nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

// <nav className="navbar navbar-dark bg-black navbar-expand-sm">
// <div className="container ">
//   <button
//     className="navbar-toggler me-3"
//     id="navCollapsebtn"
//     type="button"
//     data-bs-toggle="collapse"
//     data-bs-target="#navbarNav"
//     aria-controls="navbarNav"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     {/* <span className="navbar-toggler-icon"></span> */}
//     <FontAwesomeIcon icon={faBars} color="white" />
//   </button>

//   <Link className="navbar-brand" to={`/`}>
//     Ecommerce
//   </Link>

//   {/* For small screens */}
//   <div className="d-inline d-md-none ms-auto pe-3">
//     {state.searchField && (
//       <button className="btn nav-link">
//         <FontAwesomeIcon icon={faSearch} color="white" />
//       </button>
//     )}
//   </div>

//   <div className="d-inline d-md-none">
//     <button className="btn nav-link" onClick={goToCart}>
//       <FontAwesomeIcon icon={faCartShopping} color="white" />{" "}
//       <sup style={{ color: "white" }}>{user.itemsInCart}</sup>
//     </button>
//   </div>

//   {/* Small screen end */}

//   <div className="collapse navbar-collapse" id="navbarNav">
//     <ul className="navbar-nav d-block d-md-none">
//       <li className="nav-item">
//         <a
//           className="nav-link"
//           aria-current="page"
//           href="/"
//           style={{ color: "white" }}
//         >
//           My Account
//         </a>
//       </li>
//       <li className="nav-item">
//         <Link
//           to={`/user/orders`}
//           className="nav-link"
//           style={{ color: "white" }}
//           onClick={() => {
//             document.getElementById("navCollapsebtn").click();
//           }}
//         >
//           My Orders
//         </Link>
//       </li>
//     </ul>
//     {state.searchField && (
//       <form
//         className="d-flex ms-auto"
//         role="search"
//         onSubmit={handleSubmit}
//       >
//         <div className="d-none d-md-inline-flex">
//           <input
//             className="form-control me-2"
//             type="search"
//             aria-label="Search"
//             value={searchQuery}
//             onChange={handleInput}
//           />
//           <button className="btn btn-warning" type="submit">
//             Search
//           </button>
//         </div>
//       </form>
//     )}

{
  /* <ul className="navbar-nav ms-auto">
  <li className="nav-item d-none d-md-block">
    <button className="btn nav-link" onClick={goToCart}>
      <FontAwesomeIcon icon={faCartShopping} color="white" />{" "}
      <sup style={{ color: "white" }}>{user.itemsInCart}</sup>
    </button>
  </li>
  {!user.isLoggedIn && (
    <>
      <li className="nav-item">
        <a
          className="nav-link"
          aria-current="page"
          href="/login"
          style={{ color: "white" }}
        >
          Login
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/register" style={{ color: "white" }}>
          Register
        </a>
      </li>
    </>
  )}
  {user.isLoggedIn && (
    <>
      <li className="nav-item d-none d-md-block">
        <button className="btn nav-link" style={{ color: "white" }}>
          Account
        </button>
      </li>

      <li className="nav-item d-none d-md-block">
        <button
          className="btn nav-link"
          style={{ color: "white" }}
          onClick={() => navigate(`/user/orders`)}
        >
          Orders
        </button>
      </li>

      <li className="nav-item">
        <button
          className="btn nav-link"
          onClick={handleLogout}
          style={{ color: "white" }}
        >
          Logout
        </button>
      </li>
    </>
  )}
</ul> */
}
//   </div>
// </div>
// </nav>
