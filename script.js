function Page(callback) {
  // Função para formatar as datas deixando no padrão do Brasil
  function formatDate(dataBR) {
    const date = new Date(dataBR);
    const dia = date.getUTCDate().toString().padStart(2, '0'); // adiciona um zero se o dia tiver apenas um dígito
    const mes = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // adiciona um zero se o mês tiver apenas um dígito
    const ano = date.getUTCFullYear();
    const hora = date.getUTCHours().toString().padStart(2, '0'); // adiciona um zero se a hora tiver apenas um dígito
    const minuto = date.getUTCMinutes().toString().padStart(2, '0'); // adiciona um zero se o minuto tiver apenas um dígito
    const segundo = date.getUTCSeconds().toString().padStart(2, '0'); // adiciona um zero se o segundo tiver apenas um dígito
    return `${dia}/${mes}/${ano} às ${hora}:${minuto}:${segundo}`;
  }
  const Page = document.getElementById('MapAndTable')
  // Todo HTML da parte de Tabelas e MAPA
  Page.innerHTML = `     
  <h1 id="nameCar"></h1>
  <div id="divMapTable">
        <div id="Pos">
          <h2 class="h2posTab">Posições</h2>
          <div class="dataFilter">
            <label for="dateFilter">Filtrar por:</label>
            <input type="date" id="dateFilter" min="2021-02-01" max="2021-02-28">
          </div>

          <div id="map"></div>
          <div class="divBTNS">
            <button class="btnPosTable" id="showAllPositions">Mostrar todas as posições</button>
            <button class="btnPosTable" id="showLastPosition">Mostrar posição mais recente</button>
          </div>
        </div>
        <div id="State">
          <h2 class="h2posTab">Estados do equipamento</h2>
          <div class="dataFilter">
            <label for="dateFilterEq">Filtrar por:</label>
            <input type="date" id="dateFilterEq" min="2021-02-01" max="2021-03-01">
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Estado do equipamento</th>
                </tr>
              </thead>
              <tbody id="table-body"></tbody>
            </table>
          </div>
          <div class="divBTNS">
            <button class="btnPosTable" id="showAllStates">Mostrar todos os estados</button>
            <button class="btnPosTable" id="updateLastStateButton">Mostrar estado mais recente</button>
          </div>
        </div>
      </div>
    </div>
</div>
    `;


  fetch('./data/equipmentPositionHistory.json')
    .then(response => response.json())
    .then(data => {
      var equipment = data[callback];
      fetch('./data/equipmentModel.json')
        .then(response => response.json())
        .then(model => {


          //Pegando o nome do equipment
          fetch('./data/equipment.json')
            .then(response => response.json())
            .then(equipments => {

              // BLOCO DE CÓDIGOS PARA O MAPA 

              // Faz um filtro que identifica qual equipamento estamos usando a partir do const equipment = data[X];
              const equipmentInfo = equipments.find(equipments => equipments.id === equipment.equipmentId);

              // Faz um filtro que identifica qual modelo estamos usando a partir do equipmentInfo
              const modelo = model.find(models => models.id === equipmentInfo.equipmentModelId)

              // Coloca o nome no h1
              const nameCar = document.getElementById('nameCar');
              nameCar.innerHTML = equipmentInfo.name;
              const dateFilter = document.getElementById('dateFilter');
              const showAllPositionsButton = document.getElementById('showAllPositions');

              // Cria um array com as posições que correspondem à data filtrada, codigo desenvolvido com base em um codigo de um usuario do StackOverFlow.com e adaptado
              const filteredPositions = equipment.positions.filter(position => position.date.startsWith(dateFilter.value));
              // Pega a primeira posição do mapa
              const FirstPosMap = equipment.positions[0];
              console.log(FirstPosMap)
              // Adiciona o mapa
              const map = L.map('map').setView([FirstPosMap.lat, FirstPosMap.lon], 12);

              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 11
              }).addTo(map);

              // Itera sobre as posições filtradas e cria um marcador para cada uma
              filteredPositions.forEach(position => {
                const marker = L.marker([position.lat, position.lon]).addTo(map);
                marker.bindPopup(`<h3>${equipmentInfo.name}</h3><p>Modelo: ${modelo.name}</p><p>ID Modelo: ${equipmentInfo.equipmentModelId}</p><p>Data: ${formatDate(position.date)}</p><p>ID: ${equipment.equipmentId}</p>`);
              });

              // Adiciona um listener para o campo de input, que atualiza os marcadores conforme o usuário digita uma data
              dateFilter.addEventListener('input', () => {
                const newFilteredPositions = equipment.positions.filter(position => position.date.startsWith(dateFilter.value));

                // Remove os marcadores antigos do mapa
                map.eachLayer(layer => {
                  if (layer instanceof L.Marker) {
                    layer.remove();
                  }
                });

                // Adiciona os novos marcadores ao mapa
                newFilteredPositions.forEach(position => {
                  const marker = L.marker([position.lat, position.lon]).addTo(map);
                  marker.bindPopup(`<h3>${equipmentInfo.name}</h3><p>Veículo: ${modelo.name}</p><p>Data: ${formatDate(position.date)}</p><p>ID: ${equipment.equipmentId}</p>`);
                });
              });

              // Adiciona um listener de evento para o botão "Mostrar Todas as Posições"
              showAllPositionsButton.addEventListener('click', () => {
                // Remove os marcadores antigos do mapa
                map.eachLayer(layer => {
                  if (layer instanceof L.Marker) {
                    layer.remove();
                  }
                });
                // Itera sobre todas as posições do equipamento e cria um marcador para cada uma
                equipment.positions.forEach(position => {
                  const marker = L.marker([position.lat, position.lon]).addTo(map);
                  marker.bindPopup(`<h3>${equipmentInfo.name}</h3><p>Veículo: ${modelo.name}</p><p>Data: ${formatDate(position.date)}</p><p>ID: ${equipment.equipmentId}</p>`);
                });
              });
              const showLastPositionButton = document.getElementById('showLastPosition');

              // Adiciona um listener de evento para o botão "Mostrar Última Posição"
              showLastPositionButton.addEventListener('click', () => {
                // Remove os marcadores antigos do mapa
                map.eachLayer(layer => {
                  if (layer instanceof L.Marker) {
                    layer.remove();
                  }
                });

                // Pega a última posição do equipamento
                const lastPosition = equipment.positions.at(-1)

                // Cria um marcador para a última posição do equipamento
                const marker = L.marker([lastPosition.lat, lastPosition.lon]).addTo(map);
                marker.bindPopup(`<h3>${equipmentInfo.name}</h3><p>Veículo: ${modelo.name}</p><p>Data: ${formatDate(lastPosition.date)}</p><p>ID: ${equipment.equipmentId}</p>`);
              });

            })
            .catch(error => console.log(error));

          //BLOCO DE CÓDIGOS PARA A TABELA
          fetch('./data/equipmentStateHistory.json')
            .then(response => response.json())
            .then(data => {
              // Carregar dados de equipmentStateTypes
              return fetch('./data/equipmentState.json')
                .then(response => response.json())
                .then(stateTypes => {

                  // Mapear IDs de estado de equipamento a seus nomes e cores correspondentes
                  const stateTypeMap = {};
                  for (const stateType of stateTypes) {
                    stateTypeMap[stateType.id] = {
                      name: stateType.name,
                      color: stateType.color
                    };
                  }

                  // Criar tabela com dados de equipmentStateHistory

                  const equipmentState = data.find(equipments => equipments.equipmentId === equipment.equipmentId).states
                  const tableBody = document.querySelector('#table-body');
                  function CreateTable() {
                    for (const state of equipmentState) {
                      const row = document.createElement('tr');
                      const stateType = stateTypeMap[state.equipmentStateId];
                      row.innerHTML = `
                      <td class="tdDate">${formatDate(state.date)}</td> <td class="tdStats" style="color: ${stateType.color || 'black'}">${stateType.name}</td>`;
                      tableBody.appendChild(row);
                    }
                  }
                  CreateTable()
                  // Adicionar filtro por data
                  const DateFilterEq = document.getElementById('dateFilterEq');
                  DateFilterEq.addEventListener('input', () => {
                    // Remove as linhas atuais da tabela
                    while (tableBody.firstChild) {
                      tableBody.removeChild(tableBody.firstChild);
                    }

                    // Filtra os estados de equipamento por data
                    const filteredStates = equipmentState.filter(state => state.date.startsWith(DateFilterEq.value));

                    // Cria novas linhas na tabela com os estados de equipamento filtrados

                    for (const state of filteredStates) {
                      const row = document.createElement('tr');
                      const stateType = stateTypeMap[state.equipmentStateId];
                      row.innerHTML = `
                      <td>${formatDate(state.date)}</td>
                      <td style="color: ${stateType.color || 'black'}">${stateType.name}</td>`;
                      tableBody.appendChild(row);
                    }
                  });

                  const lastStateRow = document.createElement('tr');
                  lastStateRow.id = 'last-state-row';
                  tableBody.appendChild(lastStateRow);
                  const updateLastStateButton = document.getElementById('updateLastStateButton');

                  updateLastStateButton.addEventListener('click', () => {
                    const lastState = equipmentState[equipmentState.length - 1];
                    const stateType = stateTypeMap[lastState.equipmentStateId];

                    // Remove todas as linhas da tabela
                    while (tableBody.firstChild) {
                      tableBody.removeChild(tableBody.firstChild);
                    }

                    // Adiciona linha com o último estado de equipamento
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${formatDate(lastState.date)}</td> <td style="color: ${stateType.color || 'black'}">${stateType.name}</td>`;
                    tableBody.appendChild(row);
                  });
                  const recreateTable = document.getElementById('showAllStates');
                  recreateTable.addEventListener('click', () => {
                    tableBody.innerHTML = ''; // Remove todas as linhas da tabela
                    CreateTable()// Cria a tabela novamente
                  });

                });

            })
            .catch(error => console.error(error));
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}


//Pega o numero do carro, que é o mesmo do array, e faz ele imprimir na tela

selectCar.addEventListener('change', () => {
 const divSelect = document.getElementById('divSelect')
  const selectCar = document.getElementById('selectCar')
  const selectedValue = selectCar.value;
  const pageElement = document.getElementById('MapAndTable');
  const ImgHM = document.getElementById('divImgHm');
  const ItensHM = document.getElementById('BvHM');
  const body = document.body
  if (selectedValue >= 0 && selectedValue <= 8) {
    Page(selectedValue);
    ImgHM.style.display = 'none';
    ItensHM.style.display = 'none';
    divSelect.style = 'margin-top:7vh;';
    body.style = 'background:none'
  } else {
    pageElement.innerHTML = ""; //Faz com que o Mapa não fique na tela se não tiver informações para mostrar 
    ImgHM.style.display = '';
    ItensHM.style.display = '';
    divSelect.style = '';
    body.style = '';
  }
});

