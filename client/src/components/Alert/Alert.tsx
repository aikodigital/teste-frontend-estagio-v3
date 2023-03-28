import { ClockCounterClockwise } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";

export const AlertDialog = () => {
 
  return (
    <Dialog.Root >
      <Dialog.Trigger asChild>
        <div className="trigger"> <ClockCounterClockwise size={18} weight="light" /> <p>Histórico de Estados</p></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add A Todo</Dialog.Title>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
