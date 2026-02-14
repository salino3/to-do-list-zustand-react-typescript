import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  initialTableFilters,
  intialValuesTodoForm,
  useProviderSelector,
  type ITodoItem,
  type ITodoFormState,
  type ListInput,
} from "../../../../store";
import { useAppUtilities } from "../../../../hooks";
import { CustomButton, CustomInput } from "../../../../common";
import { routesApp } from "../../../../router";
import { listInputs } from "./data-component";
import "./form-todo.styles.scss";

export const FormTodo: React.FC = memo(() => {
  const { id = "" } = useParams();

  const navigate = useNavigate();
  const { todoList, addTodo, updateDataTodo } = useProviderSelector(
    "todoList",
    "addTodo",
    "updateDataTodo",
  );

  const { fnPromise, dateConverter } = useAppUtilities();

  const [formData, setFormData] = useState<ITodoFormState>(
    intialValuesTodoForm as ITodoFormState,
  );

  //
  const handleChange =
    (key: keyof ITodoItem) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined,
    ) => {
      if (key === ("calendar" as keyof ITodoItem)) {
        setFormData((prev: ITodoFormState) => ({
          ...prev,
          calendar: (e?.target as HTMLInputElement).checked ?? false,
        }));
      } else if (key === "tags") {
        setFormData((prev: ITodoFormState) => ({
          ...prev,
          tags: e?.target.value.split(","),
        }));
      } else {
        setFormData((prev: ITodoFormState) => ({
          ...prev,
          [key]: key.includes("eminderDate")
            ? new Date(e?.target.value ?? "").getTime()
            : e?.target.value,
        }));
      }
    };

  //
  async function handleSubmit(e: React.FormEvent<HTMLFormElement> | undefined) {
    e?.preventDefault();

    if (id) {
      await fnPromise(updateDataTodo && updateDataTodo(formData)).then(() =>
        navigate(routesApp.root),
      );
    } else {
      addTodo &&
        addTodo({
          ...formData,
          id: uuidv4(),
        }).then(() => navigate(routesApp.root));
    }
  }

  //
  useEffect(() => {
    if (id) {
      const filteredTodo: ITodoItem =
        (todoList?.find((todo) => todo.id === id) as ITodoItem) ??
        initialTableFilters;
      setFormData(filteredTodo as ITodoFormState);
    }
  }, [id]);

  return (
    <form onSubmit={handleSubmit} id="formDetailsTodoPage">
      <div className="containerInputs">
        {listInputs &&
          listInputs.length > 0 &&
          listInputs.map(
            (input: ListInput) =>
              ((id && input.name !== "calendar") || !id) && (
                <CustomInput
                  key={input.name}
                  name={input.name}
                  id={input.name}
                  checked={
                    input.type === "checkbox"
                      ? !!formData[input.name as keyof ITodoItem]
                      : undefined
                  }
                  value={
                    input.name === "reminderDate"
                      ? dateConverter(
                          (formData[input.name as keyof ITodoItem] as any) ??
                            "",
                        )
                      : ((formData[input.name as keyof ITodoItem] as any) ?? "")
                  }
                  lbl={input.lbl}
                  handleChange={handleChange(input.name as keyof ITodoItem)}
                  click={input.click}
                  pl={input.pl}
                  selectList={input?.selectList}
                  ariaRq={input.ariaRq}
                  type={input.type}
                  ariaLabeInput={input.ariaLabeInput}
                />
              ),
          )}
      </div>

      <div className="boxButtons">
        <CustomButton text="Submit" type="submit" />
      </div>
    </form>
  );
});
