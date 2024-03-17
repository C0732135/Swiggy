// import Login from "./Login";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [btnText, setbtnText] = useState("Login");
  return (
    <div className="flex justify-center  border-2 border-b-red-500 border-t-red-500 h-20 bg-red-200 ">
      {/* <div className="logo-container">
        <img
          className="logo-img"
          alt="app-logo"
          src="https://img.freepik.com/free-vector/food-shopping-logo-template-design_460848-10299.jpg"
        />
      </div> */}
      <div className="flex content-center ">
        <ul className="flex text-xl items-center space-x-3 ">
          <li>
            <Link
              to="/"
              className="   hover:text-2xl hover:ease-in-out duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="   hover:text-2xl hover:ease-in-out duration-200"
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="   hover:text-2xl hover:ease-in-out duration-200"
            >
              Contact us
            </Link>
          </li>
          <li>
            <Link
              to="/grocery"
              className="   hover:text-2xl hover:ease-in-out duration-200"
            >
              Grocery
            </Link>
          </li>
          <li className="   hover:text-2xl hover:ease-in-out duration-200">
            Cart
          </li>

          <button
            className="btn-login"
            onClick={() => {
              btnText == "Login" ? setbtnText("Logout") : setbtnText("Login");
            }}
          >
            {btnText}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
