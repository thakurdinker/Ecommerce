import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/login/loginForm";
import { useContext } from "react";
import { ADD_ADMIN, AdminContext } from "../../admin/context/AdminContext";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const { dispatchAdmin } = useContext(AdminContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/admin/login`, {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      if (res.status === 200) {
        //Successfully Logged in
        toast.success("Sucessfully Logged in");
        try {
          // Update the admin context
          const res = await axios.get(`/currentUser`);
          if (res.status === 200) {
            dispatchAdmin({
              type: ADD_ADMIN,
              admin: {
                username: res.data.username,
                email: res.data.email,
                isLoggedIn: true,
                id: res.data.id,
                role: res.data.role,
              },
            });
            navigate("/admin/dashboard");
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return <LoginForm handleFormSubmit={handleFormSubmit} />;
};

export default LoginAdmin;
