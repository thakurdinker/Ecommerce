import hero_img from "../../assets/images/hero.png";

// #fcf0e4

const Hero = () => {
  return (
    <section>
      <div
        className=" p-5 d-flex flex-row justify-content-between"
        style={{ backgroundColor: "#c7fced", height: "400px" }}
      >
        <div className="d-flex flex-column justify-content-center align-items-start">
          <h1 className="text-success mb-4 fw-bold">
            Grab Upto 50% Off On <br /> Selected Products
          </h1>
          <button
            className="btn btn-success fw-bold"
            style={{ borderRadius: "2em" }}
          >
            Buy Now
          </button>
        </div>
        <div className="d-none d-md-inline-block">
          <img
            src={hero_img}
            alt=""
            className="mx-auto img-fluid"
            style={{ height: "300px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
