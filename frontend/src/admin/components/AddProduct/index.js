import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    price: 0,
    stock: 0,
    primary_category: "",
    sub_category_1: "",
    sub_category_2: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const temp = {
      [event.target.name]: event.target.value,
    };

    setProductData((prevData) => {
      return Object.assign({}, { ...prevData }, { ...temp });
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(productData);
    // Send form data to server
    try {
      const res = await axios.post(`/admin/products`, {
        productData,
      });
      toast.success(res.data.message);
      //   document.location.reload();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-3">Add Product</h1>
      <div className="row">
        <div className="col-md-6 offset-3">
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    <strong>Title</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={productData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="brand" className="form-label">
                    <strong> Brand </strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    name="brand"
                    value={productData.brand}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    <strong> Price </strong>
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="form-control"
                    id="price"
                    name="price"
                    value={productData.price}
                    step="any"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    <strong> Stock </strong>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    name="stock"
                    step="any"
                    value={productData.stock}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="primary_category" className="form-label">
                    <strong> Primary Category </strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="primary_category"
                    name="primary_category"
                    value={productData.primary_category}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {" "}
                <div className="mb-3">
                  <label htmlFor="sub_category_1" className="form-label">
                    <strong>Sub Category 1 </strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sub_category_1"
                    name="sub_category_1"
                    value={productData.sub_category_1}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="sub_category_2" className="form-label">
                    <strong> Sub Category 2 </strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="sub_category_2"
                    name="sub_category_2"
                    value={productData.sub_category_2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <strong>Description</strong>
              </label>
              <textarea
                className="form-control"
                id="description"
                rows={6}
                name="description"
                value={productData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning w-100">
              ADD
            </button>
            <button
              className=" mt-3 btn btn-primary w-100"
              onClick={() => navigate("/admin/dashboard")}
            >
              CANCEL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
