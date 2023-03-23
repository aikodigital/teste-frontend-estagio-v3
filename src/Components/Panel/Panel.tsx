import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { EquipmentsContext } from "../../Context/EquipmentsContext";

function Panel() {
  const equipments = useContext(EquipmentsContext);

  console.log(equipments);

  return (
    <Box bg="#e0d8c7" h="100vh" w="20%">
      Panel
    </Box>
  );
}

export default Panel;
