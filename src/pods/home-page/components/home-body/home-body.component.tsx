import React, { memo, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  initialTableFilters,
  useProviderSelector,
  type ITodoItem,
} from "../../../../store";
import {
  ModalApp,
  ModalDeleteTodo,
  TodoTable,
  type Columns,
} from "../../../../common-app";
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

  const [isOpen, setIsOpen] = useState<ITodoItem | null>(null);

  const triggerBtnsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleOpenChange = (newOpenState: boolean) => {
    setIsOpen(null);

    // Manual Focus Restoration: If closing, return focus to the trigger button
    if (!newOpenState && isOpen?.id) {
      setTimeout(() => {
        // Get the specific button from our Map using the ID
        const btn = triggerBtnsRef.current.get(isOpen?.id);
        btn?.focus();
      }, 0);
    } else {
      setTimeout(() => {
        const table = document.querySelector(".custom-table") as HTMLElement;
        if (table) {
          table.focus();
        }
      }, 0);
    }
  };

  //
  const sortedTodoList = useMemo(() => {
    const priorityWeight: Record<string, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return [...(todoList || [])].sort((a: ITodoItem, b: ITodoItem) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return (
        (priorityWeight[b.priority] ?? 0) - (priorityWeight[a.priority] ?? 0)
      );
    });
  }, [todoList]);

  //
  const columnsTable: Columns[] = useMemo(
    () => [
      {
        key: "nameTodo",
        title: "To do",
        render: (item: string) => <span tabIndex={0}>{item}</span>,
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

          return (
            <span tabIndex={0}>
              {date.toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          );
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
              <button
                className="deleteItem"
                ref={(el) => {
                  if (el) {
                    triggerBtnsRef.current.set(row.id, el);
                  } else {
                    triggerBtnsRef.current.delete(row.id);
                  }
                }}
                onClick={() => setIsOpen(row)}
              >
                🗑️
              </button>
              <button
                className="spanToggle"
                onClick={() => setTodo && setTodo(row)}
              >
                {row.completed ? "✅" : "⏳"}
              </button>
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

  console.log("triggerBtnsRef", triggerBtnsRef);

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
        rows={sortedTodoList || []}
        initialTableFilters={initialTableFilters}
        customStylesTableRowElement={(item: ITodoItem) =>
          !!item.completed ? "completedRow" : ""
        }
      />
      {isOpen && (
        <ModalApp open={isOpen} onOpenChange={handleOpenChange}>
          <ModalDeleteTodo open={isOpen} onOpenChange={handleOpenChange} />
        </ModalApp>
      )}
    </div>
  );
});
