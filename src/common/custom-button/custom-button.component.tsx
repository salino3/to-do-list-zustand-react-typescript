import type React from "react";
import "./custom-button.styles.scss";

interface Props {
  text: string;
  customStyles?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
}

export const CustomButton: React.FC<Props> = (props) => {
  const { text, customStyles, type } = props;

  return (
    <button type={type} className={`btnStyles ${customStyles}`}>
      {text}
    </button>
  );
};
