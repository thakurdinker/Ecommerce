import loginImage from "../../assets/images/login.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({ handleFormSubmit }) => {
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
                icon={faSignInAlt}
                size="2x"
                color="green"
                className="p-3"
              />
              <h2 className="fw-semibold">Welcome Back</h2>
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
                  placeholder="Enter your username"
                  required
                  autoFocus
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
                  placeholder="**********"
                  required
                />
              </div>

              <a
                className="text-success fw-semibold align-self-end text-decoration-none"
                href="/login"
              >
                Forgot Password?
              </a>
              <button
                type="submit"
                className="btn btn-success fw-bold w-100 rounded-pill mt-4"
              >
                Login
              </button>
            </form>

            <p className="text fs-6 fw-semibold text-success mt-4">
              Don't have an account?{" "}
              <a className="text-success text-decoration-none" href="/register">
                Sign up
              </a>
            </p>
          </div>
        </div>
        {/* Show login image only for devices with medium and above screen size */}
        <div className="d-none d-md-inline-block col-12 col-md-7 d-md-flex flex-md-column justify-content-md-center align-items-md-center">
          <img src={loginImage} className="img-fluid" alt="loginimage" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

// <div className="p-3 d-flex justify-content-center align-items-center vh-100">
// <div className="row">
//   <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4 border border-danger">
//     <div className="card shadow">
//       <div>
//         <img src={loginImage} alt="" className="card-img-top" />
//       </div>
//       <div className="card-body">
//         <h5 className="card-title">Login</h5>
//         <form
//           className="validate-form"
//           noValidate
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
//               placeholder="username"
//               required
//               autoFocus
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
//               placeholder="password"
//               required
//             />
//             <div className="valid-feedback">Looks good!</div>
//           </div>
//           <button className="btn btn-success btn-block">Login</button>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
