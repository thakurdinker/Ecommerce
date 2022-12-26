import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const AdminProtectedPages = ({ children }) => {
  const { admin } = useContext(AdminContext);

  if (!admin.isLoggedIn && admin.role !== 1) {
    return <h1 className="text-center">Not Authorized</h1>;
  }

  return <>{children}</>;
};

export default AdminProtectedPages;
