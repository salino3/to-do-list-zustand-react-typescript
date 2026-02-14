import type React from "react";
import type { Content, SelectList } from "../../store";
import "./custom-input.styles.scss";

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
  checked?: boolean | undefined;
  pl: string | undefined;
  lbl: string;
  click?:
    | React.MouseEventHandler<HTMLSelectElement | HTMLInputElement>
    | undefined;
  selectList?: SelectList[];
  ariaRq?: boolean | undefined;
  readonly?: boolean | undefined;
  ariaLabeInput?: string;
  error?: string;
}

export const CustomInput: React.FC<Props> = (props) => {
  const {
    value,
    handleChange,
    id,
    name,
    type,
    checked,
    pl,
    lbl,
    click,
    selectList,
    ariaRq,
    readonly,
    ariaLabeInput,
    error,
  } = props;

  const errorId = `${name}-error-msg`;

  return (
    <div className={`boxInput boxInput${name}`}>
      <label htmlFor={id || name}>{lbl}</label>
      {!type ? (
        <select
          id={name}
          name={name}
          value={value ?? ""}
          onClick={click}
          onChange={handleChange}
          aria-label={ariaLabeInput}
          aria-required={ariaRq}
          style={{ color: value === "" || !value ? "gray" : "black" }}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        >
          <option value="" disabled hidden>
            {pl}
          </option>
          {selectList &&
            selectList?.length > 0 &&
            selectList.map((item: SelectList, index: number) => (
              <optgroup key={item.optgroup + index} label={item.optgroup}>
                {item.content.map((c: Content) => (
                  <option key={c.key + index} value={c.key}>
                    {c.text}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>
      ) : (
        <input
          type={type}
          id={id || name}
          name={name}
          // FIX: Don't pass value="" to a checkbox, it confuses the browser
          {...(type !== "checkbox" ? { value: value ?? "" } : {})}
          checked={checked}
          onChange={handleChange}
          onClick={click}
          onKeyDown={(e) => {
            if (type === "checkbox" && e.key === "Enter") {
              e.preventDefault();

              const createEvent = {
                target: {
                  name: name,
                  type: "checkbox",
                  checked: !checked,
                },
              } as React.ChangeEvent<HTMLInputElement>;

              handleChange(createEvent);
            }
          }}
          placeholder={pl || name}
          readOnly={readonly}
          aria-required={ariaRq}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      <div className="boxErrorMessage">
        {error && (
          <span id={errorId} role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};
