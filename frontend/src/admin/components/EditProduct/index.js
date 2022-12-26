import { useState } from "react";

const EditProduct = ({ product, isEditing }) => {
  const [productData, setProductData] = useState(product);

  return (
    <div className="row">
      <div className="col-md-6 offset-3">
        <form>
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
                  value={productData.title}
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
                  value={productData.brand}
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
                  value={productData.price}
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
                  value={productData.stock}
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
                  value={productData.primary_category}
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
                  value={productData.sub_category_1}
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
                  value={productData.sub_category_2}
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
              value={productData.description}
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
    </div>
  );
};

export default EditProduct;
