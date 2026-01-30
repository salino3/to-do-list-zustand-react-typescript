import type React from "react";
import "./custom-input.styles.scss";

interface Props {
  value: string | number | readonly string[] | undefined | null;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  name: string;
  id: string;
  type: React.HTMLInputTypeAttribute | undefined;
  pl: string | undefined;
  lbl: string;
}

export const CustomInput: React.FC<Props> = (props) => {
  const { value, handleChange, id, name, type, pl, lbl } = props;

  return (
    <div className={`boxInput boxInput${name}`}>
      <label htmlFor={(id || name) + "ID"}>{lbl}</label>
      <input
        type={type}
        id={(id || name) + "ID"}
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        placeholder={pl || name}
      />
    </div>
  );
};
