import type React from "react";
import "./custom-input.styles.scss";

interface Content {
  key: string;
  text: string;
}

export interface SelectList {
  optgroup: string;
  content: Content[];
}

interface Props {
  value: string | number | readonly string[] | null | undefined;
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement | undefined>
    | React.ChangeEventHandler<HTMLSelectElement | undefined>
    | undefined
    | any;
  name: string;
  id: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  pl: string | undefined;
  lbl: string;
  select?: boolean;
  click?: React.MouseEventHandler<HTMLSelectElement> | undefined;
  selectList?: SelectList[];
}

export const CustomInput: React.FC<Props> = (props) => {
  const {
    value,
    handleChange,
    id,
    name,
    type,
    pl,
    lbl,
    select = false,
    click,
    selectList,
  } = props;

  return (
    <div className={`boxInput boxInput${name}`}>
      <label htmlFor={(id || name) + "ID"}>{lbl}</label>
      {select ? (
        <select
          // className={`${checkError ? "inputError" : ""}
          //     ${readonly ? "readonly" : ""}
          //   `}
          id={name + "ID"}
          name={name}
          value={value ?? ""}
          onClick={click}
          onChange={handleChange}
          // aria-label={ariaLabeInput}
          // readOnly={readonly}
          // aria-required={ariaRq}
          style={{ color: value === "" || !value ? "gray" : "black" }}
        >
          <option value="" disabled hidden>
            Priority
          </option>
          {selectList &&
            selectList?.length > 0 &&
            selectList.map((item: SelectList) => (
              <optgroup key={item.optgroup} label={item.optgroup}>
                {item.content.map((c: Content) => (
                  <option key={c.key} value={c.key}>
                    {c.text}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>
      ) : (
        <input
          type={type}
          id={(id || name) + "ID"}
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          placeholder={pl || name}
        />
      )}
    </div>
  );
};
