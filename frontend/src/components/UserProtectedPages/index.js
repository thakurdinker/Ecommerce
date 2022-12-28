import axios from "axios";
import { useContext, useEffect } from "react";
import { User } from "../../contexts/UserContext";

const UserProtectedPages = ({ children }) => {
  const { user } = useContext(User);

  useEffect(() => {
    async function logout() {
      try {
        await axios.post("/logout");
      } catch (err) {
        console.log(err);
      }
    }

    if (user.isLoggedIn && user.role !== 0) {
      logout();
      document.location.reload();
    }
  }, [user]);

  if (user.isLoggedIn && user.role !== 0) {
    return;
  }

  return <>{children}</>;
};

export default UserProtectedPages;
