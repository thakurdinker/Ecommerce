import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataFecth } from "../../../utils/useDataFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faShip,
  faShippingFast,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { AdminContext } from "../../context/AdminContext";

const OrderActivityCard = ({ icon, title, number }) => {
  return (
    <>
      <div className="d-flex flex-row justify-content-start align-items-center">
        <div className="bg-light rounded-pill p-3">
          <FontAwesomeIcon icon={icon} size="2x" color="green" />
        </div>
        <div className="ms-2 d-flex flex-column justify-content-start align-items-start">
          <span className="fw-semibold">{title}</span>
          <h3>{number}</h3>
        </div>
      </div>
    </>
  );
};

const LatestOrders = ({ latestOrders }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-5">
      <div className="d-flex flex-row justify-content-between">
        <h3>Latest Orders</h3>
        <button
          className="btn btn-success rounded-pill fw-bold"
          onClick={() => navigate("/admin/orders")}
        >
          View All Orders
        </button>
      </div>
      {/* Latest Order table */}
      <div className="table-responsive mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">OrderId</th>
              <th scope="col">Order</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Payment</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders !== undefined &&
              latestOrders.map(function (orders) {
                return orders.products.map(function (product) {
                  // Consider previous 4 days orders as latest orders
                  if (
                    Math.floor((Date.now() - product.date) / (86400 * 1000)) < 4
                  ) {
                    return (
                      <tr key={product._id}>
                        <td className="w-25">{product._id}</td>
                        <td className="fw-semibold w-25">
                          {product.product.title}
                        </td>
                        <td>
                          {product.shipping.firstName}{" "}
                          {product.shipping.lastName}
                        </td>
                        <td>
                          ${product.product.price * parseInt(product.qty)}
                        </td>
                        <td>{product.status}</td>
                        <td>{product.paymentMode}</td>
                      </tr>
                    );
                  }
                  return "";
                });
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [latestOrders, setLatestOrders] = useState({});

  const [orderActivity, setOrderActivity] = useState({
    newOrder: 0,
    orderProcessed: 0,
    readyToShip: 0,
    orderShipped: 0,
  });

  const { admin } = useContext(AdminContext);

  // useDataFecth("/admin/products", setData);

  // Fetch Latest Orders
  useDataFecth(`/user/${admin.id}/orders`, setLatestOrders);

  // Fetch Order Activity
  useDataFecth(`/user/${admin.id}/orders/orderActivity`, setOrderActivity);

  return (
    <>
      {/* <div className="container">
        <h1 className="mb-3">Products</h1>
        {!data.products || data.products.length === 0 ? (
          <h5 className="text-center">You don't have any products</h5>
        ) : (
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map(function (product, index) {
                return (
                  <tr
                    key={product._id}
                    className={product.stock === 0 ? "text-danger table-danger" : "table-primary"}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link to={`/admin/product/${product._id}`}>
                        {product.title}
                      </Link>
                    </td>
                    <td>{product.stock}</td>
                    <td>
                      {product.price} {product.currency}
                    </td>
                    <td>{product.primary_category}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div> */}
      <div className="container">
        <div className="row">
          <h2>Order Activity</h2>
          <div className="col-12 col-md-3">
            <OrderActivityCard
              icon={faShoppingCart}
              title="New Order"
              number={orderActivity.newOrder}
            />
          </div>
          <div className="col-12 col-md-3">
            <OrderActivityCard
              icon={faGears}
              title="Order Processed"
              number={orderActivity.orderProcessed}
            />
          </div>
          <div className="col-12 col-md-3">
            <OrderActivityCard
              icon={faShip}
              title="Ready to Ship"
              number={orderActivity.readyToShip}
            />
          </div>
          <div className="col-12 col-md-3">
            <OrderActivityCard
              icon={faShippingFast}
              title="Order Shipped"
              number={orderActivity.orderShipped}
            />
          </div>
        </div>
        <LatestOrders latestOrders={latestOrders.orderData} />
      </div>
    </>
  );
};

export default Dashboard;
