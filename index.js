var map = L.map("mapid").setView([-19.9167, -43.9345], 12);
let input = document.querySelector("#inputValue");
let button = document.getElementById("botao");
let positionButton = document.querySelector(".list-group");
let inputvalue = input.value;

button.addEventListener("click", () => {
  let inputvalue = input.value;
  if (inputvalue === "") {
    alert("Escreva: Operando, Manutenção ou Parado");
  } else {
    retrieveEquipmentPositionTable(inputvalue);
  }
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

var myIcon = L.icon({
  iconUrl: "./assets/imgs/mi.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -26],
});

async function retrieveEquipmentPositionTable(value) {
  retrieveRequisitionData(value);
  retrieveDomData();
}

async function retrieveRequisitionData(value) {
  let fetchEquipment = await fetch("./equipament.json");
  let responseEquipment = await fetchEquipment.json();

  let fetchEquipmentModel = await fetch("./equipamentModel.json");
  let responseEquipmentModel = await fetchEquipmentModel.json();

  let fetchEquipmentState = await fetch("./equipamentState.json");
  let responseEquipmentState = await fetchEquipmentState.json();

  let fetchEquipmentPositionHistory = await fetch(
    "./equipmentPositionHistory.json"
  );
  let responseEquipmentPositionHistory =
    await fetchEquipmentPositionHistory.json();

  const names = [];

  responseEquipmentModel.forEach((model) => {
    model.hourlyEarnings.forEach((hourlyEarning) => {
      const stateId = hourlyEarning.equipmentStateId;
      const state = responseEquipmentState.find((state) => state.id == stateId);
      if (state) {
        names.push(model.name);
      }
    });
  });

  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker || layer instanceof L.Circle) {
      map.removeLayer(layer);
    }
  });
  const initialPosition = [-19.9167, -43.9345];
  map.setView(initialPosition, 10);

  responseEquipmentPositionHistory.forEach((equipment, i) => {
    const lastPosition = equipment.positions[equipment.positions.length - 1];
    const newMarker = L.marker([lastPosition.lat, lastPosition.lon], {
      icon: myIcon,
      title: "Clique para ver mais",
    });

    newMarker.unbindPopup();

    const resultReq = responseEquipment.find(
      (item) => item.id === equipment.equipmentId
    );

    if (resultReq) {
      const matchingStatus = responseEquipmentState.find(
        (s) => s.name === value
      );
      resultReq.statusName = matchingStatus ? matchingStatus.name : "error";
      resultReq.color = matchingStatus ? matchingStatus.color : "red";
      const popupContent = `Equipment ID: ${resultReq.id} <br> Name: ${resultReq.name}-${names[i]} <br> Status: ${resultReq.statusName}`;

      newMarker.bindPopup(popupContent).openPopup();
    }

    newMarker.addTo(map);
    L.circle([lastPosition.lat, lastPosition.lon], {
      color: "#003184",
      fill: true,
      fillColor: resultReq.color,
      fillOpacity: 0.1,
      radius: 500,
    }).addTo(map);

    map.flyTo([lastPosition.lat, lastPosition.lon], 14);
  });
}

async function retrieveDomData() {
  const fetchEquipmentPositionHistory = await fetch(
    "./equipmentPositionHistory.json"
  );
  const responseEquipmentPositionHistory =
    await fetchEquipmentPositionHistory.json();

  positionButton.innerHTML = "";

  Object.values(responseEquipmentPositionHistory).forEach((equipment) => {
    const elementH6 = document.createElement("h6");
    elementH6.innerText = `Equipment ID: ${equipment.equipmentId}`;

    const positionsElement = document.createElement("table");
    const positionsHead = document.createElement("thead");
    const positionsHeadRow = document.createElement("tr");
    const positionsBody = document.createElement("tbody");

    const positionLatHead = document.createElement("th");
    positionLatHead.innerText = "Latitude";
    const positionLonHead = document.createElement("th");
    positionLonHead.innerText = "Longitude";

    positionButton.appendChild(positionsElement);
    positionsHeadRow.appendChild(positionLatHead);
    positionsHeadRow.appendChild(positionLonHead);
    positionsHead.appendChild(positionsHeadRow);
    positionsElement.appendChild(positionsHead);

    for (let i = 0; i < 9; i++) {
      const positionBodyRow = document.createElement("tr");
      const positionLat = document.createElement("td");
      positionLat.innerText =
        equipment.positions[equipment.positions.length - i - 1].lat;
      const positionLon = document.createElement("td");
      positionLon.innerText =
        equipment.positions[equipment.positions.length - i - 1].lon;

      positionBodyRow.appendChild(positionLat);
      positionBodyRow.appendChild(positionLon);
      positionsBody.appendChild(positionBodyRow);
    }

    positionsElement.appendChild(positionsBody);
    positionButton.appendChild(elementH6);
    positionButton.appendChild(positionsElement);
  });
}
