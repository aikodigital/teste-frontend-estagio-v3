//@ts-nocheck
import { ClockCounterClockwise, XSquare } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { Equipament } from "../../class/Equipment";
import { PositionComp } from "../PositionComp/PositionComp";
import { ScrollAreaComp } from "../Scroll/Scroll";


interface AlertProps {
  equipment: Equipament;
}

export const AlertDialog : React.FC<AlertProps> = ({ equipment }) => {

  const positionComps = equipment.states.map((state) => (
    <PositionComp position={state.positionDateInfo()} key={state.id} />
  ));
 
  return (
    <Dialog.Root >
      <Dialog.Trigger asChild>
        <div className="trigger"> <ClockCounterClockwise size={18} weight="light" /> <p>Histórico de Estados</p></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
        <ScrollAreaComp components={positionComps} isChild={false} />
        
          <Dialog.Title className="DialogTitle"></Dialog.Title>
          <Dialog.Close asChild>
            <XSquare size={32} weight="bold" className="closeButton" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
