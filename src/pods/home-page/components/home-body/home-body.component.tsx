import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  initialFilters,
  useProviderSelector,
  type ITodoItem,
} from "../../../../store";
import { TodoTable, type Columns } from "../../../../common-app";
import "./home-body.styles.scss";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  flag: boolean;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const ROW_PER_PAGES = [5, 10, 25];

export const HomeBody: React.FC<Props> = (props) => {
  const { flag, page, pageSize, setFlag, setPage, setPageSize } = props;

  const { todoList, addTodo, setTodo } = useProviderSelector(
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
            {item ? "✅ Done" : "⏳ Pending"} - {row?.priority}
          </span>
        ),
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
};
