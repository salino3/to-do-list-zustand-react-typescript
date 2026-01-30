import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  initialTableFilters,
  intialValuesTodoForm,
  useProviderSelector,
  type ITodoItem,
} from "../../../../store";
import { useAppUtilities } from "../../../../hooks";
import { CustomButton, CustomInput } from "../../../../common";
import { routesApp } from "../../../../router";
import "./form-todo.styles.scss";

export const FormTodo: React.FC = memo(() => {
  const { id = "" } = useParams();

  const navigate = useNavigate();
  const { todoList, addTodo } = useProviderSelector("todoList", "addTodo");
  const { fnPromise } = useAppUtilities();

  const [formData, setFormData] = useState<ITodoItem>(
    intialValuesTodoForm as ITodoItem,
  );

  //
  const handleChange =
    (key: keyof ITodoItem) =>
    (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
      setFormData((prev: ITodoItem) => ({
        ...prev,
        [key]: e?.target.value,
      }));
    };

  //
  function handleSubmit(e: React.FormEvent<HTMLFormElement> | undefined) {
    e?.preventDefault();
    if (id) {
      alert("Update: " + JSON.stringify(formData));
    } else {
      fnPromise(
        addTodo &&
          addTodo({
            ...formData,
            id: uuidv4(),
            reminderDate: new Date().getTime(),
          }),
      ).then(() => navigate(routesApp.root));
    }
  }

  //
  useEffect(() => {
    if (id) {
      const filteredTodo: ITodoItem =
        (todoList?.find((todo) => todo.id === id) as ITodoItem) ??
        initialTableFilters;
      setFormData(filteredTodo);
    }
  });

  return (
    <form onSubmit={handleSubmit} id="formDetailsTodoPage">
      <div className="containerInputs">
        <CustomInput
          name={"nameTodo"}
          id={"nameTodo"}
          value={formData.nameTodo}
          lbl="Nmae To do"
          type="text"
          handleChange={handleChange("nameTodo")}
          pl="Name To do"
        />
        <CustomInput
          name={"web"}
          id={"web"}
          value={formData.web}
          lbl="Web"
          type="web"
          handleChange={handleChange("web")}
          pl="Name To do"
        />
      </div>

      <div className="boxButtons">
        <CustomButton text="Submit" type="submit" />
      </div>
    </form>
  );
});
