import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/store";
import "./menu.css";

const Menu = () => {
  const { logout } = useUserStore();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/add-task">Add Tasks</Link>
        </li>
        <li>
          <Link to="/list-tasks">List Tasks</Link>
        </li>
        <li>
          <button onClick={logout}>Cerrar sesión</button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
