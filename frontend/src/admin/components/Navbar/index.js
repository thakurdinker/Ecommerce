import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminContext, RESET } from "../../context/AdminContext";

const NavBarAdmin = () => {
  const { admin, dispatchAdmin } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post("/logout");
      if (res.status === 200) {
        toast.success("Logged Out");
        dispatchAdmin({ type: RESET });
        navigate("/admin");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
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
              <a
                className="nav-link"
                aria-current="page"
                href="/admin/dashboard"
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="/admin/product/add"
              >
                Add Product
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item"></li>
            {!admin.isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/admin">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/register">
                    Register
                  </a>
                </li>
              </>
            )}
            {admin.isLoggedIn && (
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

export default NavBarAdmin;
