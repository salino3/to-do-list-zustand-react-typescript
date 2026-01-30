import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  initialTableFilters,
  intialValuesTodoForm,
  Priority,
  useProviderSelector,
  type ITodoItem,
} from "../../../../store";
import { useAppUtilities } from "../../../../hooks";
import { CustomButton, CustomInput, type SelectList } from "../../../../common";
import { routesApp } from "../../../../router";
import "./form-todo.styles.scss";

const selectList: SelectList[] = [
  {
    optgroup: "Priority",
    content: Object.values(Priority).map((c) => {
      return {
        key: c,
        text: c === "" ? "..." : c.charAt(0).toUpperCase() + c.slice(1),
      };
    }),
  },
];

export const FormTodo: React.FC = memo(() => {
  const { id = "" } = useParams();

  const navigate = useNavigate();
  const { todoList, addTodo, updateDataTodo } = useProviderSelector(
    "todoList",
    "addTodo",
    "updateDataTodo",
  );
  const { fnPromise } = useAppUtilities();

  const [formData, setFormData] = useState<ITodoItem>(
    intialValuesTodoForm as ITodoItem,
  );

  //
  const handleChange =
    (key: keyof ITodoItem) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined,
    ) => {
      setFormData((prev: ITodoItem) => ({
        ...prev,
        [key]: e?.target.value,
      }));
    };

  //
  function handleSubmit(e: React.FormEvent<HTMLFormElement> | undefined) {
    e?.preventDefault();
    if (id) {
      fnPromise(updateDataTodo && updateDataTodo(formData)).then(() =>
        navigate(routesApp.root),
      );
    } else {
      fnPromise(
        addTodo &&
          addTodo({
            ...formData,
            id: uuidv4(),
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
  }, [id]);

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
        <CustomInput
          name={"tel"}
          id={"tel"}
          value={formData.tel}
          lbl="Telephone"
          type="tel"
          handleChange={handleChange("tel")}
          pl="Telephone"
        />
        <CustomInput
          name={"email"}
          id={"email"}
          value={formData.email}
          lbl="Email"
          type="email"
          handleChange={handleChange("email")}
          pl="Email"
        />
        <CustomInput
          name={"Topic"}
          id={"topic"}
          value={formData.topic}
          lbl="Topic"
          type="text"
          handleChange={handleChange("topic")}
          pl="Topic"
        />
        <CustomInput
          name={"Place"}
          id={"place"}
          value={formData.place}
          lbl="Place"
          type="text"
          handleChange={handleChange("place")}
          pl="Place"
        />
        <CustomInput
          name={"reminderDate"}
          id={"place"}
          value={formData.reminderDate}
          lbl="R. Date"
          type="datetime-local"
          handleChange={handleChange("reminderDate")}
          pl="R. Date"
        />
        <CustomInput
          select
          name={"priority"}
          id={"priority"}
          value={formData.priority}
          lbl="Priority"
          handleChange={handleChange("priority")}
          pl="Priority"
          selectList={selectList}
        />
      </div>

      <div className="boxButtons">
        <CustomButton text="Submit" type="submit" />
      </div>
    </form>
  );
});
