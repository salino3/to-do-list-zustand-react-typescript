import { useProviderSelector, type ITodoItem } from "../../store";
import "./table-to-do.styles.scss";

export const TodoTable = () => {
  const { todoList } = useProviderSelector("todoList");

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
          </tr>
        </thead>
        <tbody>
          {todoList &&
            todoList?.length > 0 &&
            todoList.map((todo: ITodoItem, index: number) => (
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
