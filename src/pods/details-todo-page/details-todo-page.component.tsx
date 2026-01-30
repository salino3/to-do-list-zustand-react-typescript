import React, { startTransition, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ModalApp } from "../../common-app";
import { FormTodo } from "./componentes";
import "./details-todo-page.styles.scss";

export const DetailsTodoPage: React.FC = () => {
  const { id = "" } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const triggerBtnRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (newOpenState: boolean) => {
    startTransition(() => {
      setIsOpen(newOpenState);
    });

    // Manual Focus Restoration: If closing, return focus to the trigger button
    if (!newOpenState) {
      setTimeout(() => {
        triggerBtnRef.current?.focus();
      }, 0); // Timeout ensures the DOM is ready before focusing
    }
  };

  return (
    <div className="rootDetailsTodoPage">
      <h1>{id ? "Update" : "Create"} To do</h1>
      <h2>{id}</h2>
      {/* Attach the ref to the button */}
      <button ref={triggerBtnRef} onClick={() => setIsOpen(true)}>
        Open Settings
      </button>
      {isOpen && <ModalApp open={isOpen} onOpenChange={handleOpenChange} />}
      <FormTodo />
    </div>
  );
};
