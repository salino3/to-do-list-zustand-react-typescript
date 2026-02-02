import React from "react";
import { Link, useParams } from "react-router-dom";
import { FormTodo } from "./componentes";
import { routesApp } from "../../router";
import "./details-todo-page.styles.scss";

export const DetailsTodoPage: React.FC = () => {
  const { id = "" } = useParams();

  return (
    <div className="rootDetailsTodoPage">
      <header>
        <Link to={routesApp.root}>⬅️</Link>
        <h1>{id ? "Update" : "Create"} To do</h1>
      </header>

      <FormTodo />
    </div>
  );
};
