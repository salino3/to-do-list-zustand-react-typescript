import type React from "react";
import { Link } from "react-router-dom";
import { TodoTable } from "../../common-app";
import { routesApp } from "../../router";
import "./home.styles.scss";

const HomePage: React.FC = () => {
  return (
    <div className="rootHomePage">
      HomePage
      <Link to={routesApp?.detailsTodo("test-route")}>
        <button>Click</button>
      </Link>
      <br />
      <TodoTable />
    </div>
  );
};

export default HomePage;
