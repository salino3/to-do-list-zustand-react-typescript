import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  initialFilters,
  useProviderSelector,
  type ITodoItem,
} from "../../store";
import { TodoTable, type Columns } from "../../common-app";
import { routesApp } from "../../router";
import "./home.styles.scss";

const ROW_PER_PAGES = [5, 10, 25];

const HomePage: React.FC = () => {
  const { todoList, addTodo, setTodo } = useProviderSelector(
    "todoList",
    "addTodo",
    "setTodo",
  );

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [flag, setFlag] = useState<boolean>(false);

  function sortedTodoList(list: ITodoItem[] = []): ITodoItem[] {
    // 1. Define the order weights
    const priorityWeight: Record<string, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return [...list].sort((a, b) => {
      const weightA = priorityWeight[a.priority] ?? 0;
      const weightB = priorityWeight[b.priority] ?? 0;

      // To sort High to Low, do B - A
      return weightB - weightA;
    });
  }

  const columnsTable: Columns[] = useMemo(
    () => [
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
        render: (item: boolean, row: ITodoItem) => (
          <span
            onClick={() => setTodo && setTodo(row)}
            style={{
              background: "black",
              padding: "2px 1px",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            {item ? "✅ Done" : "⏳ Pending"}- {row?.priority}
          </span>
        ),
      },
    ],
    [],
  );

  function addData() {
    addTodo &&
      addTodo({
        nameTodo: "Test todo",
        web: "httpszzzz",
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
      <button onClick={() => setFlag(() => !flag)}>test data</button>
      <br />
      <TodoTable
        uniqueKey="id"
        columns={columnsTable || []}
        setPage={setPage}
        setPageSize={setPageSize}
        page={page}
        pageSize={pageSize}
        setFlag={setFlag}
        rowPerPages={ROW_PER_PAGES}
        totalData={todoList?.length || 0}
        rows={sortedTodoList(todoList || [])}
        initialFilters={initialFilters}
      />
    </div>
  );
};

export default HomePage;
