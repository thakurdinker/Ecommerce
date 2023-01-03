import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const AdminProtectedPages = ({ children }) => {
  const { admin } = useContext(AdminContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        await axios.post("/logout");
      } catch (err) {
        console.log(err);
      }
    }

    if (admin.isLoggedIn && admin.role !== 1) {
      logout();
      navigate("/");
    }
  }, [admin, navigate]);

  if (!admin.isLoggedIn || (admin.isLoggedIn && admin.role !== 1)) {
    return <h1 className="text-center">Not Authorized</h1>;
  }

  return <>{children}</>;
};

export default AdminProtectedPages;
