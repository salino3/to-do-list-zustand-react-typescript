import type React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { ITodoItem } from "../../store";
import "./modal-app.styles.scss";

interface Props {
  open: ITodoItem;
  onOpenChange: (newOpenState: boolean) => void;
  children: React.ReactNode;
}

export const ModalApp: React.FC<Props> = (props) => {
  const { open, onOpenChange, children } = props;

  return (
    <Dialog.Root open={!!open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay covers the background */}
        <Dialog.Overlay className="DialogOverlay" />

        {children}
      </Dialog.Portal>
    </Dialog.Root>
  );
};
