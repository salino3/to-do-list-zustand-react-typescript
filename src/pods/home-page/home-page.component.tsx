import type React from "react";
import { Link } from "react-router-dom";
import { routesApp } from "../../router/interfaces-routes";
import "./home.styles.scss";

const HomePage: React.FC = () => {
  return (
    <div className="rootHomePage">
      HomePage
      <Link to={routesApp?.detailsTodo("test-route")}>
        <button>Click</button>
      </Link>
    </div>
  );
};

export default HomePage;
