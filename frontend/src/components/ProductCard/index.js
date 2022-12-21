function ProductCard({ product }) {
  const { _id, title, main_image, price, currency } = product;
  return (
    <div className="card">
      <img src={main_image} className="img-thumbnail border border-0" alt="" />
      <div className="card-body">
        <h6 className="card-title text-truncate">
          <a href={`/products/${_id}`}>{title}</a>
        </h6>
        <span>
          <strong>Price:</strong> {price} {currency}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
