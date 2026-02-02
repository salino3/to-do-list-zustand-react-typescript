import { forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useProviderSelector, type ITodoItem } from "../../store";
import { useAppUtilities } from "../../hooks";
import "./modal-delete-todo.styles.scss";

interface Props {
  open: ITodoItem;
  setIsOpen: React.Dispatch<React.SetStateAction<ITodoItem | null>>;
}

export const ModalDeleteTodo = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { open, setIsOpen } = props;

    const { deleteTodo } = useProviderSelector("deleteTodo");

    const { fnPromise } = useAppUtilities();

    function fnDeleteTodo(id: string) {
      const idTodo: string = id;
      if (id) {
        fnPromise(deleteTodo && deleteTodo(id)).then(() => {
          alert("To do " + idTodo + " deleted!");

          setIsOpen(null);
        });
      }
    }

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

          <button
            onClick={() => fnDeleteTodo(open.id)}
            className="Button primary"
          >
            Confirm
          </button>
        </div>
      </Dialog.Content>
    );
  },
);

// Good practice for debugging
// manually gives that component a clear name in the dev tools.
ModalDeleteTodo.displayName = "ModalDeleteTodo";
