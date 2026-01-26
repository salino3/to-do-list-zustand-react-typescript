import { type ITodoItem } from "../../store";
import "./table-to-do.styles.scss";

export interface FilteringValuesFilter {
  [key: string]: ValuesFilter[];
}

export interface ValuesFilter {
  text: string;
  value: any;
}

export interface Row {
  key?: string;
  title: string;
  tooltip?: (item: any, row: ITodoItem) => any | string | undefined;
  render?: (item: any, row: ITodoItem) => any | string | undefined;
  typeFilter?: any;
  valuesFilter?: ValuesFilter[] | [];
  filter?: any;
  setFilter?: any;
  minDate?: string | number | undefined;
  maxDate?: string | number | undefined;
  formToRight?: boolean;
}

//

interface TableProps {
  totalData: number;
  columns: any[];
  row: any[];
  uniqueKey?: string;
  page?: number;
  pageSize?: number;
  setFlag?: React.Dispatch<React.SetStateAction<boolean>>;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  rowPerPages?: number[];
  initialFilters: Partial<ITodoItem>;
}

export const TodoTable: React.FC<TableProps> = ({
  totalData = 0,
  columns,
  row,
  uniqueKey,
  page = 1,
  pageSize = 10,
  setFlag,
  setPage,
  setPageSize,
  rowPerPages = [5, 10, 25, 50],
  initialFilters,
}) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <caption>List of To-Dos</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task Name</th>
            <th scope="col">Topic</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
            <th scope="col">info</th>
          </tr>
        </thead>
        <tbody>
          {columns &&
            columns?.length > 0 &&
            columns.map((todo: ITodoItem, index: number) => (
              <tr
                key={todo.id}
                className={todo.completed ? "row-completed" : ""}
              >
                <th scope="row">{index + 1}</th>
                <td>{todo.nameTodo}</td>
                <td>{todo.topic}</td>
                <td>
                  <span className={`badge priority-${todo.priority}`}>
                    {todo.priority}
                  </span>
                </td>
                <td>{todo.completed ? "✅ Done" : "⏳ Pending"}</td>
                <td style={{ minWidth: "290px" }}>
                  {todo.nameTodo}
                  {todo.nameTodo}
                  {todo.nameTodo}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
