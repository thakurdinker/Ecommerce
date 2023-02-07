import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/login/loginForm";
import { useContext } from "react";
import { ADD_ADMIN, AdminContext } from "../../admin/context/AdminContext";

const LoginAdmin = () => {
  const navigate = useNavigate();
  // const { dispatchAdmin } = useContext(AdminContext);

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

        // Update admin context
        // dispatchAdmin({
        //   type: ADD_ADMIN,
        //   admin: {
        //     username: res.data.username,
        //     email: res.data.email,
        //     isLoggedIn: true,
        //     id: res.data.id,
        //     role: res.data.role,
        //   },
        // });
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    navigate("/admin/register");
  };

  return (
    <LoginForm
      handleFormSubmit={handleFormSubmit}
      handleSignUp={handleSignUp}
    />
  );
};

export default LoginAdmin;
