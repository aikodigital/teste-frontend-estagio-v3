import { Box } from "@chakra-ui/react";
import Map from "./Components/Map/Map";
import Panel from "./Components/Panel/Panel";

function App() {
  return (
    <Box display="flex">
      <Panel />
      <Map />
    </Box>
  );
}

export default App;
