import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { EquipmentsProvider } from "./Context/EquipmentsContext";
import { EquipmentsModelProvider } from "./Context/EquipmentsModelContext";
import { EquipmentsStateProvider } from "./Context/EquipmentsState";
import { EquipmentsStateHistoryProvider } from "./Context/EquipmentsStateHistory";
import { EquipmentsPositionProvider } from "./Context/EquipmentsPositionContext";
import { SelectedEquipmentIdProvider } from "./Context/SelectedEquipmentIdContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SelectedEquipmentIdProvider>
    <EquipmentsProvider>
      <EquipmentsModelProvider>
        <EquipmentsPositionProvider>
          <EquipmentsStateProvider>
            <EquipmentsStateHistoryProvider>
              <ChakraProvider>
                <App />
              </ChakraProvider>
            </EquipmentsStateHistoryProvider>
          </EquipmentsStateProvider>
        </EquipmentsPositionProvider>
      </EquipmentsModelProvider>
    </EquipmentsProvider>
  </SelectedEquipmentIdProvider>
);
