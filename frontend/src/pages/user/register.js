import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterForm from "../../components/register/registerForm";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    let temp = {};
    temp[event.target.name] = event.target.value;
    setFormData((prevData) => (prevData = { ...prevData, ...temp }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.username.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === ""
    ) {
      toast.info("Please provide valid information");
      return;
    }
    try {
      const { data } = await axios.post(`/register`, {
        formData,
      });
      toast(`User successfully registered`);
      console.log(data.message);
      navigate("/login");
    } catch (err) {
      toast(
        `Something happened. Please try again. Status Code: ${err.response.status} Error: ${err.response.data.message}`
      );
      // console.log(err.response.status);
    }
  };
  return (
    <RegisterForm
      formData={formData}
      handleFormSubmit={handleFormSubmit}
      handleInputChange={handleInputChange}
    />
  );
};

export default RegisterUser;
