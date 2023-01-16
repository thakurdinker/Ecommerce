import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

import "./allProducts.css";
import { NavBarSearchContext } from "../../contexts/NavSearchContext";

const AllProducts = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const dataFetch = useRef(false);

  const { state } = useContext(NavBarSearchContext);

  useEffect(() => {
    if (!dataFetch.current && !state.searchRequested) {
      async function fetchData() {
        try {
          const res = await axios.get("/products");
          setAllProducts(res.data.allProducts);
        } catch ({ response }) {
          console.log("Error", response);
          // setAllProducts(
          //   `Status Code: ${response.status} message: ${response.data.message}`
          // );
        }
      }
      fetchData();
      dataFetch.current = true;
    }
  }, [state.searchRequested]);

  const displayProducts = (products) => {
    if (products.length === 0) {
      return;
    } else {
      return products.map(function (product) {
        return (
          <div key={product._id} className="col-sm-6 col-md-3 col-lg-2">
            <ProductCard product={product} />
          </div>
        );
      });
    }
  };

  if (state.searchRequested === true) {
    return (
      <>
        <div className="container mt-2">
          <h1 className="text-center">
            {state.requestedProducts.length === 0 ? "Product Not found" : ""}
          </h1>
          <div className="row">{displayProducts(state.requestedProducts)}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mt-2">
        {/* <h1 className="text-center">All Products</h1> */}
        <div className="row">{displayProducts(allProducts)}</div>
      </div>
    </>
  );
};

export default AllProducts;
