import { useContext, useState } from "react";
import { AdminContext } from "../../admin/context/AdminContext";
import { useDataFecth } from "../../utils/useDataFetch";

import { Link } from "react-router-dom";

const Orders = () => {
  const [data, setData] = useState({ orderData: [] });

  const { admin } = useContext(AdminContext);

  useDataFecth(`/user/${admin.id}/orders`, setData);

  return (
    <div className="mt-3 container  table-responsive">
      <table className="table table-primary table-bordered align-middle">
        <thead className="table-dark text-center">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Products</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Overall Status</th>
          </tr>
        </thead>
        <tbody>
          {data.orderData.map(function (orderInfo, index) {
            return (
              <tr key={orderInfo.orderId}>
                <th scope="row">{index + 1}</th>
                <td>
                  <table className="table table-sm table-danger align-middle">
                    <thead className="thead-dark ">
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Qty ordered</th>
                        <th scope="col">Shipping Address</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderInfo.products.map(function (item) {
                        return (
                          <tr key={item.product._id}>
                            <td>
                              <Link to={`/admin/product/${item.product._id}`}>
                                {item.product.title}
                              </Link>
                            </td>
                            <td>{item.qty}</td>
                            <td>
                              {item.shipping.firstName} {item.shipping.lastName}{" "}
                              <br />
                              {item.shipping.phoneNo}
                              <br />
                              {item.shipping.email}
                              <br />
                              {item.shipping.streetAddress}
                              <br />
                              {item.shipping.landmark}
                              <br />
                              {item.shipping.city} - {item.shipping.postalCode}
                              <br />
                            </td>
                            <td>{item.status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
                <td>{orderInfo.customerName}</td>
                <td>Nil</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
