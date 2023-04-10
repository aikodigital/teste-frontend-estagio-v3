async function loadData() {
  try {
    let response = await fetch('http://localhost:3000/db');

    response = await response.json();
    localStorage.setItem('data', JSON.stringify(response));

    renderData();
  } catch (error) {
    console.log(error.message)
  }
}

function renderData(filtro) {
  const data = JSON.parse(localStorage.getItem('data'))
  data.equipmentPositionHistory.forEach(equipPosicao => {
    let equipStateHistorico = data.equipmentStateHistory.find(el => el.equipmentId == equipPosicao.equipmentId)

    let equipStateAtual = data.equipmentState.find(el => el.id == equipStateHistorico.states[equipStateHistorico.states.length - 1].equipmentStateId)

    let equipamento = data.equipment.find(el => el.id == equipPosicao.equipmentId)

    let equipModelo = data.equipmentModel.find(el => el.id == equipamento.equipmentModelId)

    if (filtro) {
      switch (filtro.type) {
        case 'filtro':
          if (filtro.value !== '' && equipStateAtual.id !== filtro.value)
            return;
          break;
        case 'pesquisa':
          if (
            !(
              equipamento.name.includes(filtro.value.trim()) ||
              equipModelo.name.includes(filtro.value.trim())
            )
          )
            return;
          break
      }
    }

    document.querySelector('.equipamentos-card').innerHTML += `
      <li class="equipamentos-card-item" style="background-color: ${equipStateAtual.color}">
      <h3 class="placa-elemento"> Equipamento: ${equipamento.name} </h3>
      <p class="modelo-elemento"> Modelo: ${equipModelo.name}</p>
      <p class="estado-elemento"> Estado: ${equipStateAtual.name} </p>
      <button onclick="abrirModal('${equipPosicao.equipmentId}', '${equipStateAtual.name}', '${equipamento.name}', '${equipModelo.name}' )">
        <span class="texto-estilo-2">Ver histórico</span>
      </button>
      </li>
    `;

    const { lat, lon } = equipPosicao.positions[equipPosicao.positions.length - 1];

    let elementoMarcador = ""

    if (equipModelo.name == "Caminhão de carga") {
      elementoMarcador = L.marker([lat, lon], { icon: greenIcon }).addTo(map)
    }

    if (equipModelo.name == "Harvester") {
      elementoMarcador = L.marker([lat, lon], { icon: blueIcon }).addTo(map)
    }

    if (equipModelo.name == "Garra traçadora") {
      elementoMarcador = L.marker([lat, lon], { icon: redIcon }).addTo(map)
    }

    elementoMarcador.bindPopup(`Equipamento: ${equipamento.name} Estado: ${equipStateAtual.name} `)
    elementoMarcador.on('mouseover', function () {
      this.openPopup();
    });

    elementoMarcador.on('click', function () {
      abrirModal(equipPosicao.equipmentId, equipStateAtual.name, equipamento.name, equipModelo.name)
    });
  });
}

function limparFiltro() {
  map.eachLayer((layer) => {
    if (layer['_latlng'] != undefined)
      layer.remove();
  });
  document.querySelector('.equipamentos-card').innerHTML = null;
}

document.querySelector('#filtro').addEventListener('change', (e) => {
  limparFiltro()
  renderData({ type: 'filtro', value: e.target.value })
})

document.querySelector('#pesquisa').addEventListener('input', (e) => {
  limparFiltro()
  renderData({ type: 'pesquisa', value: e.target.value })
})

var map = L.map('map').setView([-19.123457, -45.987654], 10.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var blueIcon = L.icon({
  iconUrl: '/img/marker-azul.png',
  shadowUrl: '/img/marker-shadow.png',

  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76]
});

var greenIcon = L.icon({
  iconUrl: '/img/marker-verde.png',
  shadowUrl: '/img/marker-shadow.png',

  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76]
});

var redIcon = L.icon({
  iconUrl: '/img/marker-vermelho.png',
  shadowUrl: '/img/marker-shadow.png',

  iconSize: [40, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76]
});

loadData()
