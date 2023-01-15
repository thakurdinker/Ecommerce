import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CheckOut = ({ cart, handleDelete }) => {
  const [orderSummary, setSummary] = useState({
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    total: 0,
  });

  const [newAddress, setNewAddress] = useState(false);

  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    streetAddress: "",
    landmark: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    let subtotal = 0,
      total = 0;
    for (let item of cart.items) {
      subtotal = subtotal + item.product.price;
    }

    total = subtotal + 0 + 0;

    setSummary((prevSummary) => {
      return Object.assign(
        {},
        { ...prevSummary },
        { subtotal: subtotal, total: total }
      );
    });
  }, [cart.items]);

  const handleFormInput = (e) => {
    const temp = {
      [e.target.name]: e.target.value,
    };

    setFormInput((prevFormInput) => {
      return Object.assign({}, { ...prevFormInput }, { ...temp });
    });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    console.log(formInput);
    try {
      const res = await axios.post("/user/address", {
        formInput,
      });
      if (res.status === 200) {
        // Enable the PAYMENT ACOORDION
        const secondAccordionbtn =
          document.getElementById("secondAccordionbtn");
        secondAccordionbtn.disabled = false;
        secondAccordionbtn.click();
      }
    } catch (e) {
      console.log(e.response.message);
      toast.error(e.response.message);
    }
  };

  const handleSavedAddress = () => {
    console.log("Saved Address");
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <h4 className="text-center mb-3">CHECKOUT</h4>
        <div className="col-sm-6 col-md-7">
          <div className="accordion" id="accordionExample">
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
                      <div className="form-check">
                        <div className="row">
                          {cart.user.addresses.map(function (address) {
                            return (
                              <div className="col-6" key={address._id}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="savedAddress"
                                  id={address._id}
                                  value={address}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={address._id}
                                >
                                  <strong>
                                    {address.firstName} {address.lastName}{" "}
                                    <br />
                                    {address.phoneNo}
                                    <br />
                                    {address.email}
                                    <br />
                                    {address.streetAddress}
                                    <br />
                                    {address.landmark}
                                    <br />
                                    {address.city}
                                    <br />
                                    {address.postalCode}
                                  </strong>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Submit selected Address */}
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          className="btn btn-primary"
                          onClick={handleSavedAddress}
                        >
                          Continue
                        </button>
                        <button
                          className="btn btn-primary"
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
                        <button type="submit" className="btn btn-primary">
                          Continue
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  id="secondAccordionbtn"
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  disabled
                >
                  <strong>PAYMENT</strong>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className=" col-sm-6 col-md-4">
          <h5 className="text-muted">ORDER SUMMARY</h5>
          <div className="d-flex justify-content-between">
            <h6>Subtotal</h6>
            <h6>{orderSummary.subtotal} USD</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6>Taxes</h6>
            <h6>{orderSummary.taxes}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6>Shipping ({cart.items.length} items)</h6>
            <h6>{orderSummary.shipping}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>Total</h6>
            <h6>{orderSummary.total} USD</h6>
          </div>

          {/* Bag Summary */}
          <h6 className="text-muted mt-5">BAG SUMMARY</h6>
          <div className="mt-4">
            {cart.items.map(function (item) {
              return (
                <div
                  key={item.product._id}
                  className="d-flex justify-content-evenly mb-3"
                >
                  <img
                    src={item.product.images[0]}
                    className="img-thumbnail"
                    alt=""
                  />
                  <div className="d-flex flex-column justify-content-between align-items-start">
                    <h6>
                      {item.product.title} <br />{" "}
                      <span className="text-muted d-inline-block mt-2">
                        Price: {item.product.price} <br /> Qty: {item.qty}
                      </span>
                    </h6>
                    <button
                      className="btn text-danger"
                      onClick={() => handleDelete(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
