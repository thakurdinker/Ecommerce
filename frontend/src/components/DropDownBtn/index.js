import "./dropDownbtn.css";
const DropDownBtn = ({ name }) => {
  return (
    <div id="dropDownbtn" className="btn-group mt-1">
      <button
        type="button"
        className="btn dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {name}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="/">
            Action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/">
            Another action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/">
            Something else here
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" href="/">
            Separated link
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropDownBtn;
