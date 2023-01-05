import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const EditProduct = ({ product, isEditing, navigate }) => {
  const [productData, setProductData] = useState(product);
  const [deleteImages, setDeleteImages] = useState([]);

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
    // // Send form data to server
    // try {
    //   const res = await axios.post(`/admin/products/${product._id}`, {
    //     productData,
    //   });
    //   toast.success(res.data.message);
    //   document.location.reload();
    // } catch (err) {
    //   toast.error(err.response.data.message);
    // }
  };

  const handleDeleteImageForm = (event) => {
    if (deleteImages.length === 0) {
      event.preventDefault();
      toast.info("Please select Image(s) to delete");
      return;
    }
  };

  const checkImages = () => {
    const images = document.getElementById("productImages");

    const allowedFormats = ["jpg", "jpeg", "png"];

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

  const handleCheckBox = (event) => {
    if (event.target.checked) {
      // If checkbox is checked, then push the image url in the deletedImages array
      setDeleteImages((prevdeleteImages) => {
        return [...prevdeleteImages, event.target.value];
      });
    }

    if (!event.target.checked) {
      // If checbox is unchecked
      // First we check if the url is in the deletedImages array, if it is then remove it, otherwise do nothing
      if (deleteImages.includes(event.target.value)) {
        setDeleteImages((prevdeleteImages) => {
          return prevdeleteImages.filter(
            (imageUrl) => imageUrl !== event.target.value
          );
        });
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-1">
        <form
          method="POST"
          action={`/admin/products/${product._id}`}
          encType="multipart/form-data"
          onSubmit={handleFormSubmit}
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
                  step="any"
                  value={productData.price}
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
              />
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
            Update
          </button>
          <button
            className=" mt-3 btn btn-primary w-100"
            onClick={() => isEditing(false)}
          >
            Cancel
          </button>
        </form>
      </div>

      <div className="col-md-3">
        <h3>Uploaded Images:</h3>
        <form
          onSubmit={handleDeleteImageForm}
          method="POST"
          action={`/admin/products/${product._id}`}
        >
          <div className="row">
            {productData.images.map(function (image, index) {
              return (
                <div key={index} className="col-6">
                  <img src={image} className="img-thumbnail" alt="" />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={`deleteImages[${index}]`}
                      value={image}
                      id={`deleteImage[${index}]`}
                      onChange={handleCheckBox}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`deleteImage[${index}]`}
                    >
                      Delete?
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn btn-danger mt-3 w-100">Delete Image(s)</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
