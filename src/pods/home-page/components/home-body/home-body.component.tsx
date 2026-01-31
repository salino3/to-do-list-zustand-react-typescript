import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  initialTableFilters,
  useProviderSelector,
  type ITodoItem,
} from "../../../../store";
import { TodoTable, type Columns } from "../../../../common-app";
import { routesApp } from "../../../../router";
import "./home-body.styles.scss";

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
      },
      {
        key: "web",
        title: "Web",
        // tooltip: (item: string) => item,
        render: (item: string) => <a href={item}>🌐</a>,
      },
      {
        key: "tel",
        title: "Tel",
        render: (item: string) => <a href={"tel:" + item}>🕿</a>,
      },
      // Conditional Topic Column - 'showTopic'
      ...(false // <--- test example
        ? [
            {
              key: "topic",
              title: "Topic",
              render: (item: string) => (item ? `📑 ${item}` : "-"),
            },
          ]
        : []),
      {
        key: "place",
        title: "Place",
        render: (item: string) => <a href={item}>🗺️</a>,
      },
      {
        // ⏰
        key: "reminderDate",
        title: "R. Date",
        render: (item: number) => {
          if (item === null || item === undefined) return "-";

          const date = new Date(item);

          return date.toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        },
      },
      {
        key: "actions",
        title: "Actions",
        valueClass: (_: undefined, row: ITodoItem) => `actions-${row.priority}`,
        render: (_: undefined, row: ITodoItem) => {
          console.log("clog!!!");
          return (
            <div className="containerActions">
              <button className="deleteItem" onClick={() => alert(row.id)}>
                🗑️
              </button>
              <span
                className="spanToggle"
                onClick={() => setTodo && setTodo(row)}
              >
                {row.completed ? "✅" : "⏳"}
              </span>
              <Link className="updateItem" to={routesApp.detailsTodo(row.id)}>
                📝
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
        initialTableFilters={initialTableFilters}
        customStylesTableRowElement={(item: ITodoItem) =>
          !!item.completed ? "completedRow" : ""
        }
      />
    </div>
  );
});
