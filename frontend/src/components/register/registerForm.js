import registerImage from "../../assets/images/register.jpg";

const RegisterForm = ({ handleFormSubmit, formData, handleInputChange }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
          <div className="card shadow">
            <img src={registerImage} alt="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <form
                action="/register"
                method="POST"
                className="validate-form"
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
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Enter an email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <button className="btn btn-success btn-block">SignUp</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
