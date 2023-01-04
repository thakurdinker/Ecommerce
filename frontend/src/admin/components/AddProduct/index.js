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
    productImages: null,
  });

  const [uploaded, setUploaded] = useState(false);

  const handleInputChange = (event) => {
    const temp = {
      [event.target.name]: event.target.value,
    };

    setProductData((prevData) => {
      return Object.assign({}, { ...prevData }, { ...temp });
    });
  };

  const handleFormSubmit = async (event) => {
    if (!checkImages()) {
      event.preventDefault();
      return;
    }

    // console.log(productData);
    // // Send form data to server
    // try {
    //   const res = await axios.post(`/admin/products`, {
    //     ...productData,
    //   });
    //   toast.success(res.data.message);
    //   // navigate(`/admin/product/${res.data.productId}`);
    // } catch (err) {
    //   toast.error(err.response.data.message);
    // }
  };

  const checkImages = () => {
    const images = document.getElementById("productImages");

    const allowedFormats = ["jpg", "jpeg", "png"];

    if (images.files.length === 0) {
      toast.info("Please select Images");
      return false;
    }

    //Max 3 files allowed
    if (images.files.length > 3) {
      toast.error("Max 3  Files allowed");
      return false;
    }

    // Only JPEG, JPG and PNG formats allowed
    for (let i = 0; i < images.files.length; i++) {
      if (
        !allowedFormats.includes(
          images.files[i].name.slice(
            (Math.max(0, images.files[i].name.lastIndexOf(".")) || Infinity) + 1
          )
        )
      ) {
        toast.error("Only JPEG, JPG and PNG formats allowed");
        return false;
      }
    }

    return true;
  };

  const handleImagesChange = (event) => {
    const temp = {
      [event.target.name]: event.target.files,
    };

    setProductData((prevData) => {
      return Object.assign({}, { ...prevData }, { ...temp });
    });
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-3">Add Product</h1>
      <div className="row">
        <div className="col-md-6 offset-3">
          <form
            onSubmit={handleFormSubmit}
            method="POST"
            action="/admin/products"
            encType="multipart/form-data"
          >
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="productImages" className="form-label">
                <strong>Select Images</strong>
              </label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="productImages"
                  name="productImages"
                  multiple
                  required
                  onChange={handleImagesChange}
                />
                {/* <button
                  className={`btn ${uploaded ? "btn-success" : "btn-primary"}`}
                  type="button"
                  id="uploadImagesbtn"
                  name="uploadImagesbtn"
                  onClick={handleImageUpload}
                  disabled={uploaded}
                >
                  {uploaded ? "Uploaded" : "Upload"}
                </button> */}
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
                required
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
