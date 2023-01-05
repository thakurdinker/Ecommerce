const Carousel = ({ images }) => {
  const generateImages = images.map(function (image, index) {
    return (
      <div key={index} className={`carousel-item ${index === 0 && "active"}`}>
        <img src={image} className="d-block w-100" alt="" />
      </div>
    );
  });

  return (
    <div
      id="carouselExampleControls"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">{generateImages}</div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
