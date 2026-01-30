import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ModalApp } from "../../common-app";
import { FormTodo } from "./componentes";
import "./details-todo-page.styles.scss";

export const DetailsTodoPage: React.FC = () => {
  const { id = "" } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rootDetailsTodoPage">
      <h1>{id ? "Update" : "Create"} To do</h1>
      <h2>{id}</h2>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      {isOpen && <ModalApp open={isOpen} onOpenChange={setIsOpen} />}
      <FormTodo />
    </div>
  );
};
