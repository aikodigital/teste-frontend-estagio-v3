import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const PositionMap = () => {
  const [data, setData] = useState([]);
  const [equipmentStates, setEquipmentStates] = useState([]);
  const [currentEquipmentState, setCurrentEquipmentState] = useState(null);
  const [equipmentStateHistory, setEquipmentStateHistory] = useState([]);
  const [currentEquipmentStateHistory, setCurrentEquipmentStateHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/equipmentPositionHistory.json", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log("Erro ao carregar arquivo JSON:", error);
      }
    };

    fetchData();
    
    const fetchStatesHistory = async () => {
      try {
        const response = await fetch("/data/equipmentStateHistory.json", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setEquipmentStateHistory(data);
      } catch (error) {
        console.log("Erro ao carregar arquivo JSON:", error);
      }
    };

    fetchStatesHistory();

  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch("/data/equipmentStateHistory.json", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setEquipmentStateHistory(data);
    } catch (error) {
      console.log("Erro ao carregar arquivo JSON:", error);
    }
  };

  fetchStates();
}, []);z

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("/data/equipmentState.json", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setEquipmentStates(data);
      } catch (error) {
        console.log("Erro ao carregar arquivo JSON:", error);
      }
    };

    fetchStates();
  }, []);

  const getEquipmentStateById = (id) =>
    equipmentStates.find((state) => state.id === id);

  const handleMarkerHover = (equipmentId) => {
    const state = getEquipmentStateById(equipmentId);
    setCurrentEquipmentState(state);
  };

  const handleMarkerClick = (equipmentId) => {
    const equipmentStateHistoryFiltered = equipmentStateHistory.filter(
      (equipment) => equipment.equipmentId === equipmentId
    );
    setCurrentEquipmentStateHistory(equipmentStateHistoryFiltered);
  };

  const handleClosePopup = () => {
    setCurrentEquipmentState(null);
  };

  const handleClosePopup = () => {
    setCurrentEquipmentState(null);
    setCurrentEquipmentId(null);
    setEquipmentStateHistory(null);
    };

  return (
    <MapContainer center={[-19.258918, -45.955511]} zoom={10} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((equipment) =>
        equipment.positions.map((position, index) => (
          <Marker
            key={equipment.equipmentId + index}
            position={[position.lat, position.lon]}
            onMouseOver={() => handleMarkerHover(equipment.equipmentId)}
            onMouseOut={handleClosePopup}
            onClick={() => handleMarkerClick(equipment.equipmentId)}
          >
            {currentEquipmentState && (
              <Popup>{currentEquipmentState.name}</Popup>
            )}

              {equipmentStateHistory && (
              <Popup
              position={[
              data.find((equipment) => equipment.equipmentId === currentEquipmentId)
              .positions[0].lat,
              data.find((equipment) => equipment.equipmentId === currentEquipmentId)
              .positions[0].lon,
              ]}
              onClose={handleClosePopup}
              >
              <div>
              <h3>Estado atual: {currentEquipmentState.name}</h3>
              </div>
              </Popup>
              )}
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default PositionMap;
