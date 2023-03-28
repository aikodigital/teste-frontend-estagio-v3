import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { SelectedEquipmentIdContext } from "../../Context/SelectedEquipmentIdContext";
import { EquipmentsContext } from "../../Context/EquipmentsContext";

function Panel() {
  const equipments = useContext(EquipmentsContext);
  const SelectedEquipment = useContext(SelectedEquipmentIdContext);

  console.log(SelectedEquipment?.selectedEquipmentId)

  return (
    <Box bg="#f1eee8" h="100vh" w="20%" borderRight="solid 1px black">
      {SelectedEquipment?.selectedEquipmentId ? (
        "batata"
      ) : (
        "Select any marker to see it's state history"
      )}
    </Box>
  );
}

export default Panel;
