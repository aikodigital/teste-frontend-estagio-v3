// URL da API que retorna a posição dos equipamentos
const positionHistory = '/data/equipmentPositionHistory.json';
const stateHistory = '/data/equipmentStateHistory.json'

// Criar o mapa
const map = L.map('map').setView([-19.134644, -46.087206], 9);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);




const markers = {};

// Requisitar a posição dos equipamentos para a API
fetch(positionHistory)
    .then(response => response.json())
    .then(positionHistory => {
        positionHistory.forEach(position => {
            const equipmentId = position.equipmentId;
            const lastPosition = position.positions[position.positions.length - 1];
            const lat = lastPosition.lat;
            const lon = lastPosition.lon;

            let lastEquipmentState = 'Desconhecido';
            fetch(stateHistory)
                .then(response => response.json())
                .then(stateHistory => {
                    stateHistory.forEach(state => {
                        if (state.equipmentId === equipmentId) {
                            const lastState = state.states[state.states.length - 1];
                            const equipmentStateId = lastState.equipmentStateId;
                            if (equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57') {
                                lastEquipmentState = 'Operando';
                            } else if (equipmentStateId === 'baff9783-84e8-4e01-874b-6fd743b875ad') {
                                lastEquipmentState = 'Parado';
                            } else if (equipmentStateId === '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f') {
                                lastEquipmentState = 'Manutenção';
                             }
                        }
                    });

                    const buttons = document.querySelectorAll('.equipment-button');
                    buttons.forEach(button => {
                        button.addEventListener('click', () => {
                            const equipmentId = button.id;
                            const stateHistoryUrl = '/data/equipmentStateHistory.json';

                            // Obter o histórico de estado do equipamento da API
                            fetch(stateHistoryUrl)
                                .then(response => response.json())
                                .then(stateHistory => {
                                    // Filtrar o histórico para o equipamento selecionado
                                    const equipmentStateHistory = stateHistory.find(state => state.equipmentId === equipmentId);

                                    // Criar uma tabela HTML para exibir o histórico de estado
                                    const table = document.createElement('table');
                                    const headerRow = table.insertRow();
                                    headerRow.insertCell().textContent = 'Data';
                                    headerRow.insertCell().textContent = 'Estado';

                                    equipmentStateHistory.states.forEach(state => {
                                        const row = table.insertRow();
                                        row.insertCell().textContent = state.date;

                                        let stateText = '';
                                        if (state.equipmentStateId === '0808344c-454b-4c36-89e8-d7687e692d57') {
                                            stateText = 'Operando';
                                        } else if (state.equipmentStateId === 'baff9783-84e8-4e01-874b-6fd743b875ad') {
                                            stateText = 'Parado';
                                        } else if (state.equipmentStateId === '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f') {
                                            stateText = 'Manutenção';
                                        }
                                        row.insertCell().textContent = stateText;
                                    });

                                    const tableContainer = document.getElementById('equipment-history-container');
                                    tableContainer.innerHTML = '';
                                    tableContainer.appendChild(table);
                            });
                        });
                    });

                    const marker = L.marker([lat, lon]).bindPopup(`Estado atual do equipamento: ${lastEquipmentState}`);
                    markers[equipmentId] = marker;
                    marker.addTo(map);
           });
        });
    });