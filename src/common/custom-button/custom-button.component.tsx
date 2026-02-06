import type React from "react";
import "./custom-button.styles.scss";

interface Props {
  text: string;
  customStyles?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  click?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const CustomButton: React.FC<Props> = (props) => {
  const { text, customStyles, type, click } = props;

  return (
    <button onClick={click} type={type} className={`btnStyles ${customStyles}`}>
      {text}
    </button>
  );
};
