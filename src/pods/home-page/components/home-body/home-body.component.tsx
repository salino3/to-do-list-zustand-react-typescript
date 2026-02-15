import React, { memo, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  initialTableFilters,
  useProviderSelector,
  type FilterFormTable,
  type ITodoItem,
} from "../../../../store";
import {
  ModalApp,
  ModalDeleteTodo,
  TodoTable,
  type Columns,
} from "../../../../common-app";
import { FilterTableTodo } from "../filter-table-todo";
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

  const triggerBtnsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [isOpen, setIsOpen] = useState<ITodoItem | null>(null);
  const [dropDownTable, setDropDownTable] = useState<Record<string, boolean>>(
    {},
  );

  const [filterFormTable, setFilterFormTable] = useState<FilterFormTable>(
    initialTableFilters as FilterFormTable,
  );

  const handleOpenChange = (newOpenState: boolean) => {
    setIsOpen(null);

    setTimeout(() => {
      // Manual Focus Restoration: If closing, return focus to the trigger button
      if (!newOpenState && isOpen?.id) {
        // Get the specific button from our Map using the ID
        const btn = triggerBtnsRef.current.get(isOpen?.id);
        btn?.focus();
      } else {
        const table = document.querySelector(".custom-table") as HTMLElement;
        if (table) {
          table.focus();
        }
      }
    }, 0);
  };

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
        dropDownTable: (_: undefined, row: ITodoItem) => dropDownTable[row.id],
        valueClass: (_: undefined, row: ITodoItem) => `actions-${row.priority}`,
        render: (_: undefined, row: ITodoItem) => {
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
                type="button"
                className="spanToggle"
                onClick={() => setTodo && setTodo(row)}
              >
                {row.completed ? "✅" : "⏳"}
              </button>
              <Link className="updateItem" to={routesApp.detailsTodo(row.id)}>
                📝
              </Link>
              <button
                className={`dropDownButton ${dropDownTable[row.id] ? "rotate" : ""}`}
                onClick={() =>
                  setDropDownTable((prev) => ({
                    ...prev,
                    [row.id]: !prev[row.id],
                  }))
                }
              >
                {"<<"}
              </button>
            </div>
          );
        },
      },
    ],
    [dropDownTable],
  );

  //
  const sortedTodoList = useMemo(() => {
    // 1. Pre-calculate filter values
    const searchName: string = filterFormTable.nameTodo;
    const searchWeb: string = filterFormTable.web;
    const searchTel: string = filterFormTable.tel;
    const searchPlace: string = filterFormTable.place;
    const searchTags: string[] =
      filterFormTable.tags && filterFormTable.tags.length > 0
        ? filterFormTable.tags
        : [];
    const searchCompleted: boolean | null = filterFormTable.completed ?? null;
    const start: number | null = filterFormTable.startReminderDate;
    const end: number | null = filterFormTable.endReminderDate;

    // Sort values
    const priorityWeight: Record<string, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };

    // 2. Filter everything in a single chain
    return (todoList || [])
      .filter((todo) => {
        // Name check
        if (searchName && !todo.nameTodo.toLowerCase().includes(searchName))
          return false;
        // Web check
        if (searchWeb && !todo.web!.toLowerCase().includes(searchWeb))
          return false;
        // Tel check
        if (searchTel && !todo.tel!.toLowerCase().includes(searchTel))
          return false;
        // Place check
        if (searchPlace && !todo.place!.toLowerCase().includes(searchPlace))
          return false;
        // Tags check
        if (searchTags.length > 0) {
          const todoTags = (todo.tags || []).map((t) => t.toLowerCase());

          const hasAtLeastOneMatch = searchTags.some(
            (term: string) =>
              term && todoTags.some((tTag) => tTag.includes(term)),
          );

          if (!hasAtLeastOneMatch) return false;
        }
        // Uncompleted check
        if (searchCompleted && !!todo.completed) return false;

        // Date checks
        if (start || end) {
          if (typeof todo.reminderDate !== "number") return false;
          if (start && todo.reminderDate < start) return false;
          if (end && todo.reminderDate > end) return false;
        }

        return true;
      })
      .sort((a: ITodoItem, b: ITodoItem) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return (
          (priorityWeight[b.priority] ?? 0) - (priorityWeight[a.priority] ?? 0)
        );
      });
  }, [todoList, filterFormTable]);

  return (
    <div className="rootHomeBody">
      <FilterTableTodo
        filterFormTable={filterFormTable}
        setFilterFormTable={setFilterFormTable}
      />
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
        clearFilter={() =>
          setFilterFormTable(initialTableFilters as FilterFormTable)
        }
        dropDownTable={dropDownTable}
      />
      {isOpen && (
        <ModalApp open={isOpen} onOpenChange={handleOpenChange}>
          <ModalDeleteTodo open={isOpen} onOpenChange={handleOpenChange} />
        </ModalApp>
      )}
    </div>
  );
});
