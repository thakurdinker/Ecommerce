import { useEffect, useState } from "react";

const CheckOut = ({ cart, handleDelete }) => {
  const [orderSummary, setSummary] = useState({
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    total: 0,
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
                  <form
                    method="POST"
                    action="/admin/products"
                    encType="multipart/form-data"
                  >
                    <div className="row">
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
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
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
