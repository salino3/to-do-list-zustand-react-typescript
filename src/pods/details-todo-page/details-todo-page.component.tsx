import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ModalApp } from "../../common-app";
import { FormTodo } from "./componentes";
import "./details-todo-page.styles.scss";
import { routesApp } from "../../router";

export const DetailsTodoPage: React.FC = () => {
  const { id = "" } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const triggerBtnRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (newOpenState: boolean) => {
    setIsOpen(newOpenState);

    // Manual Focus Restoration: If closing, return focus to the trigger button
    if (!newOpenState) {
      setTimeout(() => {
        triggerBtnRef.current?.focus();
      }, 0); // Timeout ensures the DOM is ready before focusing
    }
  };

  return (
    <div className="rootDetailsTodoPage">
      <header>
        <Link to={routesApp.root}>⬅️</Link>
        <h1>{id ? "Update" : "Create"} To do</h1>
      </header>

      {/* Attach the ref to the button */}
      {/* <button ref={triggerBtnRef} onClick={() => setIsOpen(true)}>
        Open Settings
      </button> */}
      {isOpen && <ModalApp open={isOpen} onOpenChange={handleOpenChange} />}
      <FormTodo />
    </div>
  );
};
