// Plotando Mapa
var map = L.map('map').setView([-19.163073, -46.06338], 12);

//Adicionando camada
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



function estado_atual() {
    fetch("./estado_recente.json").then((arquivo) => {
      arquivo.json().then((dados) =>{
        let nome_equipa, pos_data, codigo, estado, cor, nome, latitude, longitude;
        dados.map(item => {
          console.log(item.equipmentId)
          console.log(item.date.split("T")[0])
          console.log(item.equipmentStateId)
          console.log(item.atualmente)
          console.log(item.color)
          console.log(item.name)
          console.log(item.Latitude)
          console.log(item.Longitude)
          console.log("___________________________________")
  
          nome_equipa = item.equipmentId
          pos_data = item.date.split("T")[0]
          codigo = item.equipmentStateId
          estado = item.atualmente
          cor = item.color
          nome = item.name
          latitude = item.Latitude
          longitude = item.Longitude
  
          //PopUp
          const ponto = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`<div style="background-color: ${cor}; color: black"><b>Nome: </b>${nome}<br>
                        <b>Estado: </b>${estado}<br>
                        <hr>
                        <b>Latitude: </b>${latitude}<br>
                        <b>Longitude: </b>${longitude}<br> 
                        <hr>
                        <b>Data recente: </b>${pos_data}<br></div>`);
        })
      })
    })
  }
  
  estado_atual();
  