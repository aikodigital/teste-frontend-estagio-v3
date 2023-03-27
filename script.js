
const equipamentos = [
    {
        nome: "Equipamento 1",
        modelo: "Modelo 1",
        lat: -23.5489,
        lng: -46.6388,
        status: "Em operação",
    },
    {
        nome: "Equipamento 2",
        modelo: "Modelo 2",
        lat: -23.5505,
        lng: -46.6362,
        status: "Em manutenção",
    },
    {
        nome: "Equipamento 3",
        modelo: "Modelo 3",
        lat: -23.5531,
        lng: -46.6342,
        status: "Fora de operação",
    },
];


const map = L.map("map").setView([-23.5489, -46.6388], 14);


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(map);


equipamentos.forEach((equipamento) => {
    const marker = L.marker([equipamento.lat, equipamento.lng]).addTo(map);})

    