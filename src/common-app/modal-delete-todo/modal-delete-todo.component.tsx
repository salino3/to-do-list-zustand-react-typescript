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
        <Dialog.Title className="DialogTitle">
          User Settings: {open && open?.id}
        </Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>

        {/* Your custom form or content */}
        <div style={{ marginTop: "20px" }}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
        </div>

        <div className="Actions">
          <Dialog.Close asChild>
            <button className="Button secondary">Cancel</button>
          </Dialog.Close>
          <button className="Button primary">Save changes</button>
        </div>

        {/* Accessibility check: The close icon button must have an aria-label */}
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            X
          </button>
        </Dialog.Close>
      </Dialog.Content>
    );
  },
);

// Good practice for debugging
// manually gives that component a clear name in the dev tools.
ModalDeleteTodo.displayName = "ModalDeleteTodo";
