import React, { useState } from "react";
import { Link } from "react-router-dom";
import { initialFilters, useProviderSelector } from "../../store";
import { TodoTable, type Row } from "../../common-app";
import { routesApp } from "../../router";
import "./home.styles.scss";

const HomePage: React.FC = () => {
  const { todoList } = useProviderSelector("todoList");

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [flag, setFlag] = useState<boolean>(false);

  const rowsTable: Row[] = [
    {
      key: "nameTodo",
      title: "To do",
      tooltip: (item: string) => item,
    },
  ];
  return (
    <div className="rootHomePage">
      HomePage
      <Link to={routesApp?.detailsTodo("test-route")}>
        <button>Click</button>
      </Link>
      <br />
      <TodoTable
        uniqueKey="id"
        row={rowsTable || []}
        setPage={setPage}
        setPageSize={setPageSize}
        page={page}
        pageSize={pageSize}
        setFlag={setFlag}
        rowPerPages={[5, 10, 25]}
        totalData={todoList?.length || 0}
        columns={todoList || []}
        initialFilters={initialFilters}
      />
    </div>
  );
};

export default HomePage;
