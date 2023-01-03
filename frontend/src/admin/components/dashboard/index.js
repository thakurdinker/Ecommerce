import { useState } from "react";
import { Link } from "react-router-dom";
import { useDataFecth } from "../../../utils/useDataFetch";

const Dashboard = () => {
  const [data, setData] = useState({});

  useDataFecth("/admin/products", setData);
  return (
    <>
      <div className="container">
        <h1 className="mb-3">Products</h1>
        {!data.products || data.products.length === 0 ? (
          <h5 className="text-center">You don't have any products</h5>
        ) : (
          <table className="table">
            <thead className="thead-dark">
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
      </div>
    </>
  );
};

export default Dashboard;
