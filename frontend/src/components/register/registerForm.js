import registerImage from "../../assets/images/register.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = ({
  handleFormSubmit,
  formData,
  handleInputChange,
  handleLogin,
}) => {
  return (
    <div className="container pe-3 ps-3 pt-4">
      <div className="row">
        <div className="col-12 col-md-5">
          <div
            id="login_container"
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="d-flex flex-column justify-content-center align-items-center pt-5 pb-5">
              <FontAwesomeIcon
                icon={faUserCircle}
                size="4x"
                color="green"
                className="p-3"
              />
              <h2 className="fw-semibold">Sign Up</h2>
              <p className="text fs-6">Please enter your details</p>
            </div>

            <form
              className="w-100 d-flex flex-column"
              onSubmit={handleFormSubmit}
            >
              <div className="mb-3 align-self-start w-100">
                <label
                  htmlFor="username"
                  className="form-label fs-6 text fw-bold "
                >
                  Username
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </div>

              <div className="mb-3 align-self-start w-100">
                <label
                  htmlFor="username"
                  className="form-label fs-6 text fw-bold "
                >
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3 align-self-start w-100">
                <label
                  htmlFor="password"
                  className="form-label fs-6 text fw-bold"
                >
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success fw-bold w-100 rounded-pill mt-4"
              >
                Sign Up
              </button>
            </form>

            <p className="text fs-6 fw-semibold text-success mt-4">
              Already have an account?{" "}
              <a
                className="text-success text-decoration-none"
                href=""
                onClick={handleLogin}
              >
                Login
              </a>
            </p>
          </div>
        </div>
        {/* Show login image only for devices with medium and above screen size */}
        <div className="d-none d-md-inline-block col-12 col-md-7 d-md-flex flex-md-column justify-content-md-center align-items-md-center">
          <img src={registerImage} className="img-fluid" alt="loginimage" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

// <div className="container d-flex justify-content-center align-items-center mt-3">
// <div className="row">
//   <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
//     <div className="card shadow">
//       <img src={registerImage} alt="" className="card-img-top" />
//       <div className="card-body">
//         <h5 className="card-title">Register</h5>
//         <form
//           action="/register"
//           method="POST"
//           className="validate-form"
//           onSubmit={handleFormSubmit}
//         >
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">
//               Enter an Username
//             </label>
//             <input
//               className="form-control"
//               type="text"
//               name="username"
//               id="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               required
//               autoFocus
//             />
//             <div className="valid-feedback">Looks good!</div>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Enter an email
//             </label>
//             <input
//               className="form-control"
//               type="email"
//               name="email"
//               id="email"
//               required
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             <div className="valid-feedback">Looks good!</div>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Enter a password
//             </label>
//             <input
//               className="form-control"
//               type="password"
//               name="password"
//               id="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//             <div className="valid-feedback">Looks good!</div>
//           </div>
//           <button className="btn btn-success btn-block">SignUp</button>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
