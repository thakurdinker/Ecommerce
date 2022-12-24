import "./login.css";
import loginImage from "../../assets/images/login.jpg";

const LoginForm = ({ handleFormSubmit }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
          <div className="card shadow">
            <img src={loginImage} alt="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <form
                className="validate-form"
                noValidate
                onSubmit={handleFormSubmit}
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Enter an Username
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    required
                    autoFocus
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Enter a password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <button className="btn btn-success btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
