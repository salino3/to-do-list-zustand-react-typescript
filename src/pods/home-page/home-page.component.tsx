import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeBody } from "./components";
import { routesApp } from "../../router";
import "./home.styles.scss";

const HomePage: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [flag, setFlag] = useState<boolean>(false);

  return (
    <div className="rootHomePage">
      <h1>To dos</h1>
      <header>
        <Link to={routesApp?.createTodo}>
          <button>Create To do Form</button>
        </Link>
        <button onClick={() => setFlag(() => !flag)}>test data</button>
      </header>

      <HomeBody
        page={page}
        pageSize={pageSize}
        setFlag={setFlag}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default HomePage;
