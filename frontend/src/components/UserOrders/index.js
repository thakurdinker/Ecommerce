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

  const [searchData, setSearchData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

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

  const generateOrders = (data) => {
    return data.orderDetails.map(function (order, index) {
      return (
        // border-bottom border-2 border-danger
        <div
          id={order.product._id}
          key={order.product._id}
          className={`col-12 p-3 col-md-4 ps-md-0 pe-md-2 pt-md-2`}
          onClick={() =>
            showOrderDetails((prevState) => {
              return Object.assign({}, { ...prevState }, { order, show: true });
            })
          }
        >
          <div className="d-flex flex-row justify-content-start align-items-start h-100">
            <div className="d-flex flex-row justify-content-center align-items-start h-100">
              <img className="img-fluid" src={order.product.images[0]} alt="" />
            </div>
            <h6 className="text-start ms-2">{order.product.title}</h6>
            {index !== data.orderDetails.length - 1 && (
              // Show borders on the right side when display is larger than medium border-1 border
              <div className="d-none d-md-inline-block   h-100 ms-2"></div>
            )}
          </div>
        </div>
      );
    });
  };

  const handleOrdersSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      return;
    }

    if (data === null) {
      return;
    }

    const foundOrders = data.orderDetails.filter((order) =>
      order.product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchData({ orderDetails: foundOrders });
  };

  if (orderDetails.show) {
    return (
      <div className="container-fluid pe-md-5 ps-md-5  vh-100 d-md-flex flex-md-column justify-content-md-center align-items-evenly">
        <div className=" d-flex flex-row justify-content-between align-items-center">
          <h6 className="text-muted text-start mt-3">
            Order Id: {orderDetails.order.orderId}
          </h6>
          {/* Button for large screens */}
          <div className="d-none d-md-block">
            <button
              className="btn btn-success rounded-pill fw-bold"
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
        <div className=" mt-3 d-flex flex-column flex-md-row justify-content-md-between align-items-md-start">
          <div
            id="orderDetails"
            className="d-flex align-items-center flex-md-column justify-content-md-start align-items-md-start"
          >
            <div className="">
              <img
                src={orderDetails.order.product.images[0]}
                alt=""
                className="img-thumbnail"
              />
            </div>
            <div className="p-md-3 ms-2 ms-md-0">
              <h6 className="fw-bold">{orderDetails.order.product.title}</h6>
              <h6 className="text-muted">Qty: {orderDetails.order.qty}</h6>
            </div>
          </div>

          <hr className="mt-4" />

          <div id="shipping_details" className="pe-md-5">
            <h3 className="mb-3 fw-bold">Shipping Details</h3>
            <h6 className="lh-base">
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

          <div id="payment_details" className="">
            <h3 className="fw-bold">Payment Details</h3>
            <div className="d-flex justify-content-between">
              <h6>Subtotal</h6>
              <h6>
                ${orderDetails.order.product.price * orderDetails.order.qty}
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
                $
                {orderDetails.order.product.price * orderDetails.order.qty +
                  0 +
                  0}{" "}
              </h6>
            </div>
          </div>

          <button
            className="btn btn-success rounded-pill w-100 mt-5 mb-5 d-md-none"
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
    );
  }

  return (
    <div className="container mt-3">
      <form
        role="search"
        onSubmit={handleOrdersSearch}
        className="d-flex flex-row justify-content-center"
      >
        <div className="d-flex justify-content-between mb-4 w-100">
          <input
            className="form-control me-3"
            type="search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => {
              if (e.target.value.trim() === "") {
                setSearchData(null);
              }
              setSearchQuery(e.target.value);
            }}
          />
          <button
            className="btn btn-success rounded-pill fw-bold"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

      {searchData === null ? (
        <div className="row">
          {/* Orders List  */}
          {data !== null && generateOrders(data)}
        </div>
      ) : (
        <div className="row">{generateOrders(searchData)}</div>
      )}
    </div>
  );
};

export default UserOrders;
