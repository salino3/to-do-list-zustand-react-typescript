import { useState } from "react";
import { intialValuesTodoForm, type ITodoItem } from "../../../../store";
import "./form-todo.styles.scss";

export const FormTodo: React.FC = () => {
  const [formData, setFormData] = useState<ITodoItem>(
    intialValuesTodoForm as ITodoItem,
  );

  const handleChange =
    (key: keyof ITodoItem) =>
    (e: React.ChangeEvent<HTMLInputElement> | undefined) => {};

  function handleSubmit(e: React.FormEvent<HTMLFormElement> | undefined) {
    e?.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} id="formDetailsTodoPage">
      <div className="boxInput boxInputNameTodo">
        <label htmlFor="nameTodoID">Name</label>
        <input
          type="text"
          id="nameTodoID"
          name="nameTodo"
          value={formData.nameTodo}
          onChange={handleChange("nameTodo")}
        />
      </div>
    </form>
  );
};
