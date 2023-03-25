import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { EquipmentsContext } from "../../Context/EquipmentsContext";

function Panel() {
  const equipments = useContext(EquipmentsContext);

  return (
    <Box bg="#f1eee8" h="100vh" w="20%" borderRight="solid 1px black">
      Panel
    </Box>
  );
}

export default Panel;
