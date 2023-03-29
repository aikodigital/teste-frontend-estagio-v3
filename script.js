async function fetchId() {
  const response = await fetch("data/equipment.json").then((response) =>
    response.json()
  );
  for (var i = 0; i < equipamentos.length; i++) {
    equipamentos[i].id = response[i].id;
  }
  for (var i = 0; i < equipamentos.length; i++) {
    equipamentos[i].equipmentModelId = response[i].equipmentModelId;
  }
}

async function posicaoRecente() {
  await fetch("data/equipmentPositionHistory.json")
    .then((response) => response.json())
    .then((json) => {
      for (var i = 0; i < json.length; i++) {
        const ultimaPosicao = json[i].positions.length - 1;
        if (equipamentos[i].id === json[i].equipmentId) {
          // data
          equipamentos[i].dataUltimaPosicao =
            json[i].positions[ultimaPosicao].date.match(/\d{4}-\d{2}-\d{2}/);
          // horário
          equipamentos[i].horarioUltimaPosicao =
            json[i].positions[ultimaPosicao].date.match(/\d{2}:\d{2}:\d{2}/);
          // localizção
          equipamentos[i].latitude = json[i].positions[ultimaPosicao].lat;
          equipamentos[i].longitude = json[i].positions[ultimaPosicao].lon;
        }
      }
    });
}

async function modelos() {
  const response = await fetch("data/equipmentModel.json").then((response) =>
    response.json()
  );
  for (var i = 0; i < response.length; i++) {
    equipamentos.map((equipamento) => {
      if (equipamento.equipmentModelId === response[i].id) {
        equipamento.nome = response[i].name;
      }
    });
  }
}

async function statusAtual() {
  const status = await fetch("data/equipmentState.json").then((response) =>
    response.json()
  );

  const statusAtual = await fetch("data/equipmentStateHistory.json").then(
    (response) => response.json()
  );

  for (var i = 0; i < statusAtual.length; i++) {
    indexUltimoEstado = statusAtual[i].states.length - 1;

    if (equipamentos[i].id === statusAtual[i].equipmentId) {
      equipamentos[i].statusId =
        statusAtual[i].states[indexUltimoEstado].equipmentStateId;
    }
  }

  equipamentos.map((equipamento) => {
    for (var i = 0; i < status.length; i++) {
      if (equipamento.statusId === status[i].id) {
        equipamento.status = status[i].name;
        equipamento.corStatus = status[i].color;
      }
    }
  });
}

function mostrarStatusCaminhao(event) {
  if (event.target.options.status === 'Operando') {
    const statusPopup = L.popup({ className: "popupOperando" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }

  if (event.target.options.status === 'Manutenção') {
    const statusPopup = L.popup({ className: "popupManutencao" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }

  if (event.target.options.status === 'Parado') {
    const statusPopup = L.popup({ className: "popupParado" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }
}

function mostrarStatusHarvester(event) {
  if (event.target.options.status === 'Operando') {
    const statusPopup = L.popup({ className: "popupOperando" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }

  if (event.target.options.status === 'Manutenção') {
    const statusPopup = L.popup({ className: "popupManutencao" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }

  if (event.target.options.status === 'Parado') {
    const statusPopup = L.popup({ className: "popupParado" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }
}

function mostrarStatusGarra(event) {
  if (event.target.options.status === 'Operando') {
    const statusPopup = L.popup({ className: "popupOperando" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }

  if (event.target.options.status === 'Manutenção') {
    const statusPopup = L.popup({ className: "popupManutencao" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }

  if (event.target.options.status === 'Parado') {
    const statusPopup = L.popup({ className: "popupParado" }).setContent(
      "<p></p>"
    );
    this.bindPopup(statusPopup).openPopup();
  }
}

async function mostrarHistoricoCaminhao(event) {
  const stateHistoryAll = await fetch('data/equipmentStateHistory.json').then(response => response.json());
  const status = await fetch('data/equipmentState.json').then(response => response.json())
  
  let historico;
  let statusHistorico;

  stateHistoryAll.forEach( history => {
    if ( event.target.options.id === history.equipmentId) {
      historico = history.states;
    }
  })
 
  historico.forEach(historico => {
    const data = historico.date.match(/\d{4}-\d{2}-\d{2}/);
    const hora = historico.date.match(/\d{2}:\d{2}/);
    
    status.forEach( status => {
      if ( historico.equipmentStateId === status.id) {
        statusHistorico = status.name
      }
    })
    
    tabela.innerHTML += `<td> ${data} </td> <td> ${hora} </td> <td> ${statusHistorico} </td>`
  }) 
}

async function mostrarHistoricoHarvester(event) {
  const stateHistoryAll = await fetch('data/equipmentStateHistory.json').then(response => response.json());
  const status = await fetch('data/equipmentState.json').then(response => response.json())
  
  let historico;
  let statusHistorico;

  stateHistoryAll.forEach( history => {
    if ( event.target.options.id === history.equipmentId) {
      historico = history.states;
    }
  })
 
  historico.forEach(historico => {
    const data = historico.date.match(/\d{4}-\d{2}-\d{2}/);
    const hora = historico.date.match(/\d{2}:\d{2}/);
    
    status.forEach( status => {
      if ( historico.equipmentStateId === status.id) {
        statusHistorico = status.name
      }
    })
    
    tabela.innerHTML += `<td> ${data} </td> <td> ${hora} </td> <td> ${statusHistorico} </td>`
  }) 
}

async function mostrarHistoricoGarra(event) {
  const stateHistoryAll = await fetch('data/equipmentStateHistory.json').then(response => response.json());
  const status = await fetch('data/equipmentState.json').then(response => response.json())
  
  let historico;
  let statusHistorico;

  stateHistoryAll.forEach( history => {
    if ( event.target.options.id === history.equipmentId) {
      historico = history.states;
    }
  })
 
  historico.forEach(historico => {
    const data = historico.date.match(/\d{4}-\d{2}-\d{2}/);
    const hora = historico.date.match(/\d{2}:\d{2}/);
    
    status.forEach( status => {
      if ( historico.equipmentStateId === status.id) {
        statusHistorico = status.name
      }
    })
    
    tabela.innerHTML += `<tr> <td> ${data} </td> <td> ${hora} </td> <td> ${statusHistorico} </td> </tr>`
  }) 
}

async function pegarDados() {
  await fetchId();
  await posicaoRecente();
  await modelos();
  await statusAtual();
}

pegarDados().then(() => {
  equipamentos.map((equipamento) => {
    if (equipamento.nome === "Caminhão de carga") {
      const caminhaoMaker = L.marker(
        [equipamento.latitude, equipamento.longitude],
        { icon: greyIcon, status:equipamento.status, id: equipamento.id }
      );
      caminhoes.push(caminhaoMaker);
      caminhaoMaker.addTo(mapa);
    }

    if (equipamento.nome === "Harvester") {
      harvesterMaker = L.marker([equipamento.latitude, equipamento.longitude], {
        icon: orangeIcon, status:equipamento.status, id: equipamento.id
      });
      harvesters.push(harvesterMaker);
      harvesterMaker.addTo(mapa);
    }

    if (equipamento.nome === "Garra traçadora") {
      garraMaker = L.marker([equipamento.latitude, equipamento.longitude], {
        icon: blueIcon, status:equipamento.status, id: equipamento.id
      });
      garras.push(garraMaker);
      garraMaker.addTo(mapa);
    }
  });

  // mostrar status
  caminhoes.forEach(caminhao => {
    caminhao.addEventListener('mouseover', mostrarStatusCaminhao)
  });
  harvesters.forEach(harvester => {
    harvester.addEventListener('mouseover', mostrarStatusHarvester)
  })  
  garras.forEach(garra => {
    garra.addEventListener('mouseover', mostrarStatusGarra)
  })

  //mostrar histórico de status
  caminhoes.forEach(caminhao => {
    caminhao.addEventListener('click', mostrarHistoricoCaminhao)
  });
  harvesters.forEach(harvester => {
    harvester.addEventListener('click', mostrarHistoricoHarvester)
  })  
  garras.forEach(garra => {
    garra.addEventListener('click', mostrarHistoricoGarra)
  })

   //retirar histórico de status
   caminhoes.forEach(caminhao => {
    caminhao.addEventListener('click', () => {
      tabela.innerHTML = '<th>Data</th><th>Hora</th><th>Status</th>';
    })
  });
  harvesters.forEach(harvester => {
    harvester.addEventListener('click', () => {
      tabela.innerHTML = '<th>Data</th><th>Hora</th><th>Status</th>';
    })
  })  
  garras.forEach(garra => {
    garra.addEventListener('click', () => {
      tabela.innerHTML = '<th>Data</th><th>Hora</th><th>Status</th>';
    })
  })

});

// equipamentos
const equipamentos = [
  (ca0001 = {}),
  (ca0002 = {}),
  (ca0003 = {}),
  (ca0004 = {}),
  (hv1001 = {}),
  (hv1002 = {}),
  (gt2001 = {}),
  (gt2002 = {}),
  (gt2003 = {}),
];

console.log(equipamentos)

const caminhoes = [];
const harvesters = [];
const garras = [];

const tabela = document.querySelector('.historico-tabela');


var blueIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var greyIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var orangeIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var mapa = L.map("mapa").setView([-19.062766875581318, -45.86654663085938], 9);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 16,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mapa);
