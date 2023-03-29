import { Box } from "@chakra-ui/react";
import Panel from "./Components/Display/Panel/Panel";
import Map from "./Components/Display/Map/Map";

function App() {
  return (
    <Box display="flex">
      <Panel />
      <Map />
    </Box>
  );
}

export default App;
