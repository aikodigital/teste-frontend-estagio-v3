let map = L.map('map').setView([-19.151801, -46.007759], 11);

const resEquipmentPositionHistory = await fetch("../data/equipmentPositionHistory.json");
const equipmentPositionHistory = await resEquipmentPositionHistory.json();

const resEquipmentModel = await fetch("../data/equipmentModel.json");
const equipmentModel = await resEquipmentModel.json();

const resEquipment = await fetch("../data/equipment.json");
const equipment = await resEquipment.json();

const resEquipmentStateHistory = await fetch("../data/equipmentStateHistory.json");
const equipmentStateHistory = await resEquipmentStateHistory.json();

const resEquipmentState = await fetch("../data/equipmentState.json");
const equipmentState = await resEquipmentState.json();

const content = document.querySelector('.nav .content')
let icon;
let truckIcon = L.icon({
    iconUrl: './assets/img/truck.svg',
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
let clawIcon = L.icon({
    iconUrl: './assets/img/claw.svg',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});
let harvesterIcon = L.icon({
    iconUrl: './assets/img/harvester.svg',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
});

equipmentPositionHistory.map((history) => {

    let last = history.positions.length - 1

    equipment.map((equip) => {

        equipmentModel.map((model) => {

            if (history.equipmentId === equip.id) {

                if (model.id === equip.equipmentModelId) {

                    equipmentStateHistory.map((stateHistory) => {
                        let lastState = stateHistory.states.length - 1

                        if (stateHistory.equipmentId === history.equipmentId) {
                            equipmentState.map((state) => {

                                if (stateHistory.states[lastState].equipmentStateId === state.id) {

                                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    }).addTo(map);

                                    let date = history.positions[last].date
                                    let dateFormat = date.split('-')
                                    let day = dateFormat[2].substr(0, 2)
                                    let month = dateFormat[1]
                                    let year = dateFormat[0]

                                    let time = date.substr(11, 8).split(':')
                                    let hours = time[0]
                                    let minutes = time[1]
                                    let seconds = time[2]

                                    switch (model.name) {
                                        case 'Caminhão de carga':
                                            icon = truckIcon
                                            break;
                                        case 'Harvester':
                                            icon = harvesterIcon
                                            break;
                                        case 'Garra traçadora':
                                            icon = clawIcon
                                            break;
                                        default:
                                            break;
                                    }
                                    L.marker([history.positions[last].lat, history.positions[last].lon], {
                                            icon: icon
                                        }).addTo(map)
                                        .bindPopup(`
                                                <p class="location">Última Posição</p>
                                                <p class="equipment">${model.name} | ${equip.name}</p>
                                                <div class="color-state" style="background-color: ${state.color}">${state.name}</div>
                                                <p class="date-hour"><i class="fa-regular fa-calendar-days"></i> ${day}/${month}/${year} - <i class="fa-regular fa-clock"></i> ${hours}:${minutes}:${seconds}</p>
                                                `)

                                        .on('click', () => {



                                            function clickEquipment() {
                                                stateHistory.states.forEach(element => {
                                                    equipmentState.map((stateEquip) => {
                                                        model.hourlyEarnings.map((hourlyEarnings) => {
                                                            if (element.equipmentStateId === state.id) {
                                                                let date = element.date
                                                                let dateFormat = date.split('-')
                                                                let day = dateFormat[2].substr(0, 2)
                                                                let month = dateFormat[1]
                                                                let year = dateFormat[0]

                                                                let time = date.substr(11, 8).split(':')
                                                                let hours = time[0]
                                                                let minutes = time[1]
                                                                let seconds = time[2]
                                                                if (stateEquip.id === hourlyEarnings.equipmentStateId) {

                                                                    content.innerHTML += `
                                                                <div class="history" >
                                                                    <div class="state"> ${stateEquip.name} <span class="state-equipment" style= "background-color:${stateEquip.color}"></span></div>
                                                                    <div class="value"><i class="fa-solid fa-dollar-sign"></i> Gerado por Hora <span>${hourlyEarnings.value}</span></div>
                                                                    <div class="date"><i class="fa-regular fa-calendar-days"></i> ${day}/${month}/${year} </div>
                                                                    <div class="hour"><i class="fa-regular fa-clock"></i> ${hours}:${minutes}:${seconds} </div>
                                                                </div>
                                                                
                                                                    `
                                                                }


                                                            }
                                                        })
                                                    })
                                                });

                                            }
                                            content.innerHTML = `
                                            <h2>Histórico de Estado </h2>
                                            <p>${model.name} | ${equip.name}</p>
                                            `
                                            clickEquipment()

                                        })
                                    var circle = L.circle([history.positions[last].lat, history.positions[last].lon], {
                                        color: '#003184',
                                        fillColor: `${state.color}`,
                                        fillOpacity: 0.9,
                                        radius: 500
                                    }).addTo(map);

                                }
                            })

                        }
                    })

                }
            }
        })

    })
});