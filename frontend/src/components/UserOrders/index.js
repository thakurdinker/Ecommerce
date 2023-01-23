import { useContext, useEffect, useState } from "react";
import { User } from "../../contexts/UserContext";
import {
  NavBarSearchContext,
  HIDE_SEARCH_FILED,
} from "../../contexts/NavSearchContext";
import { useDataFecth } from "../../utils/useDataFetch";

const UserOrders = () => {
  const { user } = useContext(User);
  const { dispatch } = useContext(NavBarSearchContext);

  const [orderDetails, showOrderDetails] = useState({
    order: {},
    show: false,
  });

  const [data, setData] = useState(null);

  //   {
  //     qty: "",
  //     shipping: undefined,
  //     paymentMode: "",
  //     status: "",
  //     product: undefined,
  //     sellerName: "",
  //   }

  useEffect(() => {
    // Hide NavBar search Field
    dispatch({ type: HIDE_SEARCH_FILED });
  }, [dispatch]);

  useDataFecth(`/user/${user.id}/orders`, setData);

  const generateOrders = () => {
    return data.orderDetails.map(function (order) {
      return (
        <li
          key={order.product._id}
          className="list-group-item list-group-item-action d-flex flex-md-column justify-content-md-evenly align-items-center gap-2"
          onClick={() =>
            showOrderDetails((prevState) => {
              return Object.assign({}, { ...prevState }, { order, show: true });
            })
          }
        >
          <img
            className=""
            src={order.product.images[0]}
            alt=""
            style={styles.image}
          />
          <h6 className="">{order.product.title}</h6>
        </li>
      );
    });
  };

  if (orderDetails.show) {
    return (
      <>
        <h6 className="text-muted text-center mt-3">
          Order Id: {orderDetails.order.orderId}
        </h6>
        <div className="container mt-3 d-flex flex-column vh-100">
          <div
            id="orderDetails"
            className="d-flex flex-md-column align-items-center gap-2"
          >
            <img
              src={orderDetails.order.product.images[0]}
              alt=""
              style={styles.image}
            />
            <div>
              <h6>{orderDetails.order.product.title}</h6>
              <h6 className="text-muted">Qty: {orderDetails.order.qty}</h6>
            </div>
          </div>

          <hr className="mt-4" />

          <div id="shipping_details">
            <h6 className="text-muted mb-3">Shipping Details</h6>
            <h6>
              {orderDetails.order.shipping.firstName}{" "}
              {orderDetails.order.shipping.lastName} <br />
              {orderDetails.order.shipping.phoneNo}
              <br />
              {orderDetails.order.shipping.email}
              <br />
              {orderDetails.order.shipping.streetAddress}
              <br />
              {orderDetails.order.shipping.landmark}
              <br />
              {orderDetails.order.shipping.city} -{" "}
              {orderDetails.order.shipping.postalCode}
              <br />
            </h6>
          </div>

          <hr className="mt-4" />

          <div id="payment_details">
            <h6 className="text-muted">Payment Details</h6>
            <div className="d-flex justify-content-between">
              <h6>Subtotal</h6>
              <h6>
                {orderDetails.order.product.price * orderDetails.order.qty} USD
              </h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Taxes</h6>
              <h6>{`0`}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Shipping</h6>
              <h6>{`0`}</h6>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h6>Total</h6>
              <h6>
                {orderDetails.order.product.price * orderDetails.order.qty +
                  0 +
                  0}{" "}
                USD
              </h6>
            </div>
          </div>

          <button
            className="btn btn-primary w-100 mt-auto d-md-none"
            onClick={() =>
              showOrderDetails((prevState) => {
                return Object.assign({}, { ...prevState }, { show: false });
              })
            }
          >
            Go Back
          </button>

          {/* Medium and large devices */}
          <div className="d-grid gap-2 d-none d-md-flex justify-content-md-center mt-3">
            <button
              className="btn btn-primary"
              onClick={() =>
                showOrderDetails((prevState) => {
                  return Object.assign({}, { ...prevState }, { show: false });
                })
              }
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container mt-3">
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="d-flex justify-content-between gap-3">
          <input
            className="form-control"
            type="search"
            aria-label="Search"
            placeholder="Search Your orders"
          />
          <button className="btn btn-warning" type="submit">
            Search
          </button>
        </div>
        <hr className="mt-3" />
      </form>

      {/* Orders List  */}
      {data !== null && (
        <ul className="mt-4 list-group list-group-horizontal-md">
          {generateOrders()}
        </ul>
      )}
    </div>
  );
};

const styles = {
  image: {
    width: "40%",
  },
};

export default UserOrders;
