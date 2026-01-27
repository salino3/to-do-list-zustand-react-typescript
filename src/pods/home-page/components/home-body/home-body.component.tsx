import React, { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  initialFilters,
  useProviderSelector,
  type ITodoItem,
} from "../../../../store";
import { TodoTable, type Columns } from "../../../../common-app";
import "./home-body.styles.scss";
import { routesApp } from "../../../../router";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const ROW_PER_PAGES = [5, 10, 25];

export const HomeBody: React.FC<Props> = memo((props) => {
  const { page, pageSize, setFlag, setPage, setPageSize } = props;

  const { todoList, setTodo } = useProviderSelector(
    "todoList",
    "addTodo",
    "setTodo",
  );

  //
  function sortedTodoList(list: ITodoItem[] = []): ITodoItem[] {
    // 1. Define the order weights
    const priorityWeight: Record<string, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return [...list].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      const weightA = priorityWeight[a.priority] ?? 0;
      const weightB = priorityWeight[b.priority] ?? 0;

      // To sort High to Low, do B - A
      return weightB - weightA;
    });
  }

  //
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
        render: (item: string) => <a href={item}>{item}</a>,
      },
      {
        key: "actions",
        title: "Actions",
        render: (_: undefined, row: ITodoItem) => {
          console.log("clog!!!");
          return (
            <div className="containerActions">
              <button className="deleteItem" onClick={() => alert(row.id)}>
                Delete
              </button>
              <span
                className="spanToggle"
                onClick={() => setTodo && setTodo(row)}
              >
                {row.completed ? "✅" : "⏳"}
              </span>
              <Link className="updateItem" to={routesApp.detailsTodo(row.id)}>
                Update
              </Link>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="rootHomeBody">
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
});
