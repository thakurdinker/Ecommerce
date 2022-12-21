import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  NavBarSearchContext,
  ADD_REQUESTED_PRODUCT,
} from "../../contexts/NavSearchContext";
import { User, RESET } from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { state, dispatch } = useContext(NavBarSearchContext);

  const { user, dispatchUser } = useContext(User);

  const navigate = useNavigate();

  const handleInput = (event) => {
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
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Products
              </a>
            </li>
          </ul>
          {state.searchField && (
            <form
              className="d-flex ms-auto"
              role="search"
              onSubmit={handleSubmit}
            >
              <input
                className="form-control me-2"
                type="search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleInput}
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          )}

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn nav-link" onClick={goToCart}>
                <FontAwesomeIcon icon={faCartShopping} />{" "}
                <sup>{user.itemsInCart}</sup>
              </button>
            </li>
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
              <li className="nav-item">
                <button className="btn nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
