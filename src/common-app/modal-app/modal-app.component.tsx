import type React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./Modal.css";

export const ModalApp: React.FC = () => (
  <Dialog.Root>
    {/* The trigger automatically handles aria-haspopup and aria-expanded */}
    <Dialog.Trigger className="Button">Open Settings</Dialog.Trigger>

    <Dialog.Portal>
      {/* Overlay covers the background */}
      <Dialog.Overlay className="DialogOverlay" />

      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">User Settings</Dialog.Title>
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
    </Dialog.Portal>
  </Dialog.Root>
);
