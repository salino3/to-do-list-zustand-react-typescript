import type React from "react";
import "./custom-input.styles.scss";
import type { ITodoItem } from "../../store";

interface Props {
  value: string | number | readonly string[] | undefined;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name: string;
  id: string;
  type: React.HTMLInputTypeAttribute | undefined;
  pl: string | undefined;
}

export const CustomInput: React.FC<Props> = (props) => {
  const { value, handleChange, id, name, type, pl } = props;

  return (
    <div className={`boxInput boxInput${name}`}>
      <label htmlFor={(id || name) + "ID"}>Name</label>
      <input
        type={type}
        id={(id || name) + "ID"}
        name="nameTodo"
        value={value ?? ""}
        onChange={handleChange}
        placeholder={pl || name}
      />
    </div>
  );
};
