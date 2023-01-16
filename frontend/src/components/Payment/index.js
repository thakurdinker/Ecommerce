const Payment = ({ setPaymentOption }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id="headingTwo">
        <button
          id="secondAccordionbtn"
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
          disabled
        >
          <strong>PAYMENT</strong>
        </button>
      </h2>
      <div
        id="collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <ul
            className="list-group list-group-flush"
            onClick={(e) => setPaymentOption(e.target.value)}
          >
            <li className="list-group-item">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentOptions"
                  value="upi"
                  id="upi"
                />
                <label className="form-check-label" htmlFor="upi">
                  UPI
                </label>
              </div>
            </li>
            <li className="list-group-item">
              {" "}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentOptions"
                  id="wallets"
                  value="wallets"
                />
                <label className="form-check-label" htmlFor="wallets">
                  Wallets
                </label>
              </div>
            </li>
            <li className="list-group-item">
              {" "}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentOptions"
                  id="card"
                  value="card"
                />
                <label className="form-check-label" htmlFor="card">
                  Credit / Debit / ATM Card
                </label>
              </div>
            </li>
            <li className="list-group-item">
              {" "}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentOptions"
                  id="netBanking"
                  value="netBanking"
                />
                <label className="form-check-label" htmlFor="netBanking">
                  Net Banking
                </label>
              </div>
            </li>
            <li className="list-group-item">
              {" "}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentOptions"
                  id="cod"
                  value="cod"
                />
                <label className="form-check-label" htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;
