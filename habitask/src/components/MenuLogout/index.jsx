import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/store";
import "./menu.css";

const Menulogout = () => {
  const { logout } = useUserStore();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/register">Registrar usuario</Link>
        </li>
        <li>
          <Link to="/">login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menulogout;
