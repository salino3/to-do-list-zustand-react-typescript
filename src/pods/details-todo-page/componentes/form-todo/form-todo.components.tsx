import { useState } from "react";
import { intialValuesTodoForm, type ITodoItem } from "../../../../store";
import { CustomInput } from "../../../../common";
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
      <CustomInput
        name={"nameTodo"}
        id={"nameTodo"}
        value={formData.nameTodo}
        type="text"
        handleChange={handleChange("nameTodo")}
        pl="Name To do"
      />
    </form>
  );
};
