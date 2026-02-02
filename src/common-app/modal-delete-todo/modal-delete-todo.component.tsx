import { forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { ITodoItem } from "../../store";
import "./modal-delete-todo.styles.scss";

interface Props {
  open: ITodoItem;
}

export const ModalDeleteTodo = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { open } = props;
    return (
      <Dialog.Content ref={ref} className="rootModalDeleteTodo DialogContent">
        {/* Accessibility check: The close icon button must have an aria-label */}
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            X
          </button>
        </Dialog.Close>
        <Dialog.Title className="DialogTitle">
          User Settings: <strong>{open && open?.nameTodo}</strong>
        </Dialog.Title>

        <Dialog.Description className="DialogDescription">
          Are you sure you want delete this To do?
        </Dialog.Description>

        <div className="Actions">
          <Dialog.Close asChild>
            <button className="Button secondary">Cancel</button>
          </Dialog.Close>

          <button className="Button primary">Confirm</button>
        </div>
      </Dialog.Content>
    );
  },
);

// Good practice for debugging
// manually gives that component a clear name in the dev tools.
ModalDeleteTodo.displayName = "ModalDeleteTodo";
