var latitude = -19.126536;
var longitude = -45.947756;

const mymap = L.map("map").setView([latitude, longitude], 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoibGVhZmNhcnZhbGhvIiwiYSI6ImNsZmxwMnQzdDA0MDIzcmxreDFrZjhpMm0ifQ.JXmnYWlGsKMXZiNQYJpXGw",
  }
).addTo(mymap);

// Load equipment data and state
let equipmentData = {};
let equipmentModelData = {};
let equipmentPositionHistoryData = {};
let equipmentStateHistoryData = {};
let equipmentStateData = {};

function loadData(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(error => console.log(error));
}

function loadDataAndMarkers() {
  loadData("data/equipmentModel.json", data => {
    data.forEach(equipmentModel => {
      equipmentModelData[equipmentModel.id] = equipmentModel;
    });

    loadData("data/equipmentState.json", data => {
      data.forEach(equipmentState => {
        equipmentStateData[equipmentState.id] = equipmentState;
      });

      loadData("data/equipment.json", data => {
        data.forEach(equipment => {
          equipmentData[equipment.id] = equipment;
        });

        loadData("data/equipmentPositionHistory.json", data => {
          data.forEach(equipmentPositionHistory => {
            if (equipmentPositionHistoryData[equipmentPositionHistory.equipmentId] === undefined) {
              equipmentPositionHistoryData[equipmentPositionHistory.equipmentId] = [];
            }
            equipmentPositionHistoryData[equipmentPositionHistory.equipmentId].push(equipmentPositionHistory);
          });
        }); // adicionado parêntese aqui            
          loadData("data/equipmentStateHistory.json", data => {
            data.forEach(equipmentStateHistory => {
              if (equipmentStateHistoryData[equipmentStateHistory.equipmentId] === undefined) {
                equipmentStateHistoryData[equipmentStateHistory.equipmentId] = [];
              }
              equipmentStateHistoryData[equipmentStateHistory.equipmentId].push(equipmentStateHistory);
            });
      
            // Add markers to the map
            for (const equipmentId in equipmentData) {
              const equipment = equipmentData[equipmentId];
              const equipmentPositionHistory = equipmentPositionHistoryData[equipmentId][0];
              const equipmentStateHistory = equipmentStateHistoryData[equipmentId][0];
              const equipmentModel = equipmentModelData[equipment.modelId];
              const equipmentState = equipmentStateData[equipmentStateHistory.stateId];
      
              const marker = L.marker([equipmentPositionHistory.latitude, equipmentPositionHistory.longitude]).addTo(mymap);
      
              marker.bindPopup(`<b>${equipmentModel.name}</b><br>
                                <b>ID:</b> ${equipment.id}<br>
                                <b>State:</b> ${equipmentState.name}<br>
                                <b>Latitude:</b> ${equipmentPositionHistory.latitude}<br>
                                <b>Longitude:</b> ${equipmentPositionHistory.longitude}<br>
                                <b>Altitude:</b> ${equipmentPositionHistory.altitude}<br>
                                <b>Timestamp:</b> ${equipmentPositionHistory.timestamp}`);
      
            }
          });
        });
      });
      });
      }
      
      loadDataAndMarkers();