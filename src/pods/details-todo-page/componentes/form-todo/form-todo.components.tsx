import { memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { intialValuesTodoForm, type ITodoItem } from "../../../../store";
import { CustomButton, CustomInput } from "../../../../common";
import "./form-todo.styles.scss";

interface Props {
  id: string;
}

export const FormTodo: React.FC<Props> = memo((props) => {
  const { id } = props;

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
      alert(
        "Create: " +
          JSON.stringify({
            ...formData,
            id: uuidv4(),
            reminderDate: new Date().getMilliseconds(),
          }),
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} id="formDetailsTodoPage">
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

      <div className="boxButtons">
        <CustomButton text="Submit" type="submit" />
      </div>
    </form>
  );
});
