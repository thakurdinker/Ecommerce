import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Payment from "../Payment";
import Shipping from "../Shipping";

const CheckOut = ({ cart, handleDelete, handleBuyNow }) => {
  const [orderSummary, setSummary] = useState({
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    total: 0,
  });

  const [newAddress, setNewAddress] = useState(true);

  const [shipping, setShipping] = useState(null);

  const [paymentOption, setPaymentOption] = useState(null);

  const [addressIndex, setAddressIndex] = useState(null);

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
        // Update shipping Address
        setShipping((prevShipping) => {
          return Object.assign({}, { ...prevShipping }, { ...formInput });
        });
      }
    } catch (e) {
      console.log(e.response.message);
      toast.error(e.response.message);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <h4 className="text-center mb-3">CHECKOUT</h4>
        <div className="col-sm-6 col-md-7 mb-5">
          <div className="accordion" id="accordionExample">
            <Shipping
              cart={cart}
              newAddress={newAddress}
              shipping={shipping}
              setShipping={setShipping}
              setNewAddress={setNewAddress}
              setAddressIndex={setAddressIndex}
              handleAddressSubmit={handleAddressSubmit}
              formInput={formInput}
              handleFormInput={handleFormInput}
            />
            <Payment setPaymentOption={setPaymentOption} />
            <div className="d-flex flex-row justify-content-end align-items-center pt-3 pe-md-3">
              <button
                id="orderPlacebtn"
                className="btn btn-outline-success rounded-pill fw-bold"
                onClick={() => {
                  if (shipping && paymentOption) {
                    //  Place order
                    handleBuyNow(shipping, paymentOption, addressIndex);
                  } else {
                    toast.info(
                      "Please check if address is selected or payemnt mode is selected"
                    );
                  }
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className=" col-sm-6 col-md-4 pe-md-1">
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
                  <div className="w-50">
                    <img
                      src={item.product.images[0]}
                      className="img-thumbnail"
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-between align-items-start ms-2">
                    <h6>
                      {item.product.title} <br />{" "}
                      <span className="text-muted d-inline-block mt-2">
                        Price: {item.product.price} <br /> Qty: {item.qty}
                      </span>
                    </h6>
                    <button
                      className="btn btn-default fw-bold text-danger"
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
