import { Box } from "@chakra-ui/react";
import Map from "./Components/Displays/Map/Map";
import Panel from "./Components/Displays/Panel/Panel";

function App() {
  return (
    <Box display="flex">
      <Panel />
      <Map />
    </Box>
  );
}

export default App;
