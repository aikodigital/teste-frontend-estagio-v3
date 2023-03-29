// Algumas variáveis globais
let posHistory = "./data/equipmentPositionHistory.json";
let sttHistory = "./data/equipmentStateHistory.json";
let markers = {
};

// Puxando e tratando o histórico de posições
fetch(posHistory).then(response => response.json()).then(positionHistory => {
    positionHistory.forEach(position => {
    let equipmentId = position.equipmentId;
    let lastPos = position.positions[position.positions.length - 1];
    let lat = lastPos.lat;
    let lon = lastPos.lon;
    let lastEquipmentState = "";

// Puxando e tratando o histórico de estados
    fetch(sttHistory).then(response => response.json()).then(sttHistory => {
        sttHistory.forEach(state => {
            if (state.equipmentId == equipmentId) {
                let lastState = state.states[state.states.length - 1];
                let equipmentStateId = lastState.equipmentStateId;
                if (equipmentStateId == "0808344c-454b-4c36-89e8-d7687e692d57") {
                    lastEquipmentState = "Operando";
                } else if (equipmentStateId == "baff9783-84e8-4e01-874b-6fd743b875ad") {
                    lastEquipmentState = "Parado";
                } else if (equipmentStateId == "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f") {
                    lastEquipmentState = "Manutenção";
                }
            }
        });
        
// Criação da lista com o histórico de estados
        let btn = document.querySelectorAll(".btn-equip");
        btn.forEach(button => {button.addEventListener("click", () => {
            let equipmentId = button.id;
            let sttHistoryUrl = "./data/equipmentstateHistory.json";

            fetch(sttHistoryUrl).then(response => response.json()).then(sttHistory => {
                let equipmentsttHistory = sttHistory.find(state => state.equipmentId == equipmentId);
                let table = document.createElement("table");
                let headerRow = table.insertRow();
                                    
                headerRow.insertCell().textContent = "SITUAÇÃO:";

                headerRow.insertCell().textContent = "__ DATA:";

                equipmentsttHistory.states.forEach(state => {
                    let row = table.insertRow();
                    let sttText = "";

                    if (state.equipmentStateId == "0808344c-454b-4c36-89e8-d7687e692d57") {
                        sttText = "Operando";
                    } else if (state.equipmentStateId == "baff9783-84e8-4e01-874b-6fd743b875ad") {
                        sttText = "Parado";
                    } else {
                        sttText = "Manutenção";
                    }
                                        
                    row.insertCell().textContent = sttText;

                    row.insertCell().textContent = " __ " + state.date;
                });

                let tableContainer = document.getElementById("hist-equip");

                tableContainer.innerHTML = "";

                tableContainer.appendChild(table);

            });
        });
        });

// Criação dos marcadores no mapa
        let marker = L.marker([lat, lon], {title: "Clique para ver mais"})
        .bindPopup(`Estado atual: <b>${lastEquipmentState}.</b> </br></br> Utilize o menu acima para acessar o histórico de estados.`);
        markers[equipmentId] = marker;
        marker.addTo(map);
    });
    });
});

// Implementação do mapa
let map = L.map('map').setView([-19.151801, -46.00], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; OpenStreetMap contributors'
})
.addTo(map);