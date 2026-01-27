import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useProviderSelector } from "../../store";
import { HomeBody } from "./components";
import { routesApp } from "../../router";
import "./home.styles.scss";

const HomePage: React.FC = () => {
  const { addTodo } = useProviderSelector("addTodo");

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [flag, setFlag] = useState<boolean>(false);

  function addData() {
    addTodo &&
      addTodo({
        nameTodo: "Test todo",
        web: "httpszzzz",
        tel: "093",
        priority: "high",
        reminderDate: 0,
        place: "",
        completed: false,
        completedAt: 11,
        createdAt: 11,
        updatedAt: 22,
        topic: "",

        id: uuidv4(),
      });
  }

  return (
    <div className="rootHomePage">
      HomePage
      <Link to={routesApp?.detailsTodo("test-route")}>
        <button>Click</button>
      </Link>
      <button onClick={() => addData()}>Add data</button>
      <button onClick={() => setFlag(() => !flag)}>test data</button>
      <br />
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
