import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../admin/context/AdminContext";
import { useDataFecth } from "../../utils/useDataFetch";

const AllOrders = ({
  orderData,
  searchQuery,
  setSearchQuery,
  handleSearch,
  setSearchedItems,
}) => {
  return (
    <div>
      <div className="">
        <h3>Order Details</h3>
      </div>
      <div className="mt-5 d-flex flex-row">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="searchOrders"
            value={searchQuery}
            onChange={(e) => {
              if (e.target.value.trim() === "") {
                setSearchedItems(null);
              }
              setSearchQuery(() => e.target.value);
            }}
          />
        </div>

        <button
          className="btn btn-success rounded-pill fw-bold ms-3"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="form-text">
        Search for order ID, Customer, Order Status
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
            {orderData !== null &&
              orderData.map(function (item) {
                return (
                  <tr key={item._id}>
                    <td className="w-25">{item._id}</td>
                    <td className="fw-semibold w-25">{item.product.title}</td>
                    <td>
                      {item.shipping.firstName} {item.shipping.lastName}
                    </td>
                    <td>${item.product.price * parseInt(item.qty)}</td>
                    <td>{item.status}</td>
                    <td>{item.paymentMode}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Orders = () => {
  const [data, setData] = useState({ orderData: [] });

  const [searchQuery, setSearchQuery] = useState("");

  const [searchedItems, setSearchedItems] = useState(null);

  const [orderData, setOrderData] = useState(null);

  const { admin } = useContext(AdminContext);

  useDataFecth(`/user/${admin.id}/orders`, setData);

  useEffect(() => {
    // This function converts order data into array of objects where each object is a product with shipping info
    const orderData = [];
    data.orderData.map(function (item) {
      const products = item.products.filter((product) => true);
      orderData.push(...products);
      return null;
    });
    setOrderData(orderData);
  }, [data.orderData]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    const searchedItems = [];
    data.orderData.map(function (item) {
      const products = item.products.filter(
        (product) =>
          product._id === searchQuery ||
          product.shipping.firstName.toLowerCase() +
            " " +
            product.shipping.lastName.toLowerCase() ===
            searchQuery.toLowerCase() ||
          product.status.toLowerCase() === searchQuery.toLowerCase()
      );
      searchedItems.push(...products);
      return null;
    });
    setSearchedItems(() => searchedItems);
  };

  return (
    <div className="container mt-3">
      <AllOrders
        orderData={searchedItems === null ? orderData : searchedItems}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        setSearchQuery={setSearchQuery}
        setSearchedItems={setSearchedItems}
      />
    </div>
  );
};

export default Orders;
