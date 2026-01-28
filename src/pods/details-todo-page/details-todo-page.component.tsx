import React from "react";
import { useParams } from "react-router-dom";
import { FormTodo } from "./componentes";
import "./details-todo-page.styles.scss";

export const DetailsTodoPage: React.FC = () => {
  const { id = "" } = useParams();
  return (
    <div className="rootDetailsTodoPage">
      <h1>{id ? "Update" : "Create"} To do</h1>
      <h2>{id}</h2>
      <FormTodo id={id} />
    </div>
  );
};
