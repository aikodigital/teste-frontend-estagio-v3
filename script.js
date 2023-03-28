// Declaração das variáveis globais
let equipmentData = {};
let equipmentModelData = {};
let equipmentPositionHistoryData = {};
let equipmentStateHistoryData = {};
let equipmentStateData = {};

let filteredEquipmentIds = [];
let selectedEquipmentId = null;

// Definição das constantes
const OPERATING_STATE_ID = 1;

const OPERATING_COLOR = "#00FF00";
const MAINTENANCE_COLOR = "#FF0000";

// Inicialização do mapa
const mymap = L.map("map").setView([-19.126536, -45.947756], 13);

// Adição da camada de mapa
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

// Funções de carregamento de dados
function loadData(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(error => console.log(error));
}

function loadAllData() {
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
        });

        loadData("data/equipmentStateHistory.json", data => {
          data.forEach(equipmentStateHistory => {
            if (equipmentStateHistoryData[equipmentStateHistory.equipmentId] === undefined) {
              equipmentStateHistoryData[equipmentStateHistory.equipmentId] = [];
            }
            equipmentStateHistoryData[equipmentStateHistory.equipmentId].push(equipmentStateHistory);
          });

      // Chamada da função para filtrar os equipamentos
      filterEquipment();
    });
  });
});
});
}