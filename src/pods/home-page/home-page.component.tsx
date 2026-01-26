import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { initialFilters, useProviderSelector } from "../../store";
import { TodoTable, type Row } from "../../common-app";
import { routesApp } from "../../router";
import "./home.styles.scss";

const HomePage: React.FC = () => {
  const { todoList, addTodo } = useProviderSelector("todoList", "addTodo");

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [flag, setFlag] = useState<boolean>(false);

  const columnsTable: Row[] = [
    {
      key: "nameTodo",
      title: "To do",
      tooltip: (item: string) => item,
      render: (item: string) => item,
    },
    {
      key: "web",
      title: "Web",
      tooltip: (item: string) => item,
      render: (item: string) => item,
    },
    {
      key: "completed",
      title: "Task",
      render: (item: boolean, row) => {
        console.log("clog6", row);
        return item ? "✅ Done" : "⏳ Pending";
      },
    },
  ];

  function addData() {
    addTodo &&
      addTodo({
        nameTodo: "Test todo",
        web: "httpsxxxx",
        tel: "093",
        priority: "low",
        reminderDate: 0,
        place: "",
        completed: true,
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
      <br />
      <TodoTable
        uniqueKey="id"
        columns={columnsTable || []}
        setPage={setPage}
        setPageSize={setPageSize}
        page={page}
        pageSize={pageSize}
        setFlag={setFlag}
        rowPerPages={[5, 10, 25]}
        totalData={todoList?.length || 0}
        rows={todoList || []}
        initialFilters={initialFilters}
      />
    </div>
  );
};

export default HomePage;
