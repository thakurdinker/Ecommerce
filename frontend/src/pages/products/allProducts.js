import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

import "./allProducts.css";
import { NavBarSearchContext, RESET } from "../../contexts/NavSearchContext";
import Hero from "../../components/Hero/hero";
import DropDownBtn from "../../components/DropDownBtn";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [batchSize, setBatchSize] = useState(0);
  const dataFetch = useRef(false);

  const { state, dispatch } = useContext(NavBarSearchContext);

  // Perform initial Load of data
  useEffect(() => {
    if (!dataFetch.current && !state.searchRequested) {
      async function fetchData() {
        try {
          const res = await axios.get("/products");
          setData(res.data.allProducts);
        } catch ({ response }) {
          console.log("Error", response);
        }
      }
      fetchData();
      dataFetch.current = true;
      // Show Search field
      dispatch({ type: RESET });
    }
  }, [state.searchRequested, dispatch]);

  // Add event listener to check when user reaches end of page
  useEffect(() => {
    const onScroll = (e) => {
      const scrollTop = e.target.documentElement.scrollTop;
      const scrollHeight = e.target.documentElement.scrollHeight;
      const clientHeight = e.target.documentElement.clientHeight;

      if (scrollTop + clientHeight + 10 >= scrollHeight) {
        console.log("end");
        // We have reached the end of the page, need to load next batch of data
        setBatchSize((prevBatchSize) => {
          return prevBatchSize + 55;
        });
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show products list in batch of 55
  useEffect(() => {
    // Select first 55 products to show and load next batch when user reaches the end of the page
    if (batchSize <= data.length) {
      console.log(batchSize);
      setAllProducts((prevProducts) => {
        return [...prevProducts, ...data.slice(batchSize, batchSize + 55)];
      });
    }
  }, [batchSize, data]);

  const displayProducts = (products) => {
    if (products.length === 0) {
      return;
    } else {
      return products.map(function (product) {
        return (
          <div key={product._id} className="col-12 col-sm-4 col-lg-4">
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
      <main>
        <div className="container mt-3">
          <Hero />
          <div className="mt-5 d-flex flex-wrap justify-content-start align-items-center">
            <DropDownBtn name="Price" />
            <DropDownBtn name="Review" />
            <DropDownBtn name="Category" />
            <DropDownBtn name="Offer" />
          </div>
          <p className="mt-5 text-start fw-bold fs-2 text">Products For You!</p>
          <div className="row">{displayProducts(allProducts)}</div>
        </div>
      </main>
    </>
  );
};

export default AllProducts;
