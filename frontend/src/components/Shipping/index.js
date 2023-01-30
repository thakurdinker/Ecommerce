const Shipping = ({
  cart,
  newAddress,
  shipping,
  setShipping,
  setNewAddress,
  handleAddressSubmit,
  formInput,
  handleFormInput,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingOne">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <strong>SHIPPING</strong>
        </button>
      </h2>
      <div
        id="collapseOne"
        className="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          {cart.user.addresses.length !== 0 && !newAddress && (
            // Saved addresses cards
            <>
              <div className="row">
                <div className="form-check">
                  {cart.user.addresses.map(function (address, index) {
                    return (
                      <div className="col border p-3" key={address._id}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="savedAddress"
                          id={address._id}
                          onClick={(e) => {
                            if (e.target.checked) {
                              setShipping((prevShipping) => {
                                return Object.assign(
                                  {},
                                  { ...prevShipping },
                                  { ...address }
                                );
                              });
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={address._id}
                        >
                          <strong>
                            {address.firstName} {address.lastName} <br />
                            {address.phoneNo}
                            <br />
                            {address.email}
                            <br />
                            {address.streetAddress}
                            <br />
                            {address.landmark}
                            <br />
                            {address.city} - {address.postalCode}
                          </strong>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit selected Address */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button
                  className="btn btn-success fw-bold rounded-pill"
                  onClick={() => {
                    if (shipping) {
                      // Enable the PAYMENT ACOORDION
                      const secondAccordionbtn =
                        document.getElementById("secondAccordionbtn");
                      secondAccordionbtn.disabled = false;
                      secondAccordionbtn.click();
                    }
                  }}
                >
                  Continue
                </button>
                <button
                  className="btn btn-outline-success rounded-pill fw-bold"
                  onClick={() => setNewAddress(true)}
                >
                  Add New
                </button>
              </div>
            </>
          )}

          {newAddress && (
            <form onSubmit={handleAddressSubmit}>
              <div className="row">
                {cart.user.addresses.length !== 0 && (
                  <button
                    className="btn mb-3 text-primary"
                    onClick={() => setNewAddress(false)}
                  >
                    View Saved Addresses
                  </button>
                )}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      <strong>First Name</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formInput.firstName}
                      onChange={handleFormInput}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      <strong> Last Name </strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formInput.lastName}
                      onChange={handleFormInput}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">
                      <strong>Phone Number</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNo"
                      name="phoneNo"
                      value={formInput.phoneNo}
                      onChange={handleFormInput}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <strong> Email </strong>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formInput.email}
                      onChange={handleFormInput}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="streetAddress" className="form-label">
                  <strong> Street Address </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="streetAddress"
                  name="streetAddress"
                  value={formInput.streetAddress}
                  onChange={handleFormInput}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="landmark" className="form-label">
                  <strong> Landmark (optional) </strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="landmark"
                  name="landmark"
                  value={formInput.landmark}
                  onChange={handleFormInput}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      <strong>City</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formInput.city}
                      onChange={handleFormInput}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="postalCode" className="form-label">
                      <strong>Postal Code</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postalCode"
                      name="postalCode"
                      value={formInput.postalCode}
                      onChange={handleFormInput}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="submit"
                  className="btn btn-success fw-bold rounded-pill"
                >
                  Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
