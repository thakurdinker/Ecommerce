import axios from "axios";
import { useContext } from "react";
import { User, ADD_USER } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/login/loginForm";

const LoginUser = () => {
  const navigate = useNavigate();

  const { dispatchUser } = useContext(User);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/login`, {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      if (res.status === 200) {
        //Successfully Logged in
        toast.success("Sucessfully Logged in");
        try {
          // Update the user context
          const res = await axios.get(`/currentUser`);
          if (res.status === 200) {
            dispatchUser({
              type: ADD_USER,
              user: {
                username: res.data.username,
                email: res.data.email,
                isLoggedIn: true,
                id: res.data.id,
                itemsInCart: res.data.itemsInCart,
                role: res.data.role,
              },
            });
          }
        } catch (err) {
          console.log(err);
        }
        navigate("/");
      }
    } catch (err) {
      toast.error("Invalid Username or password");
      // console.log(err);
    }
  };

  return <LoginForm handleFormSubmit={handleFormSubmit} />;
};

export default LoginUser;
