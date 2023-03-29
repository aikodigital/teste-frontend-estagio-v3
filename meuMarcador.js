


export function meuMarcador(map) {
  

  const marker = new google.maps.Marker({
    position: {lat: -19.126536, lng: -45.947756},
    map: map,
    title: "Caminhão de carga",
    
    id: "a7c53eb1-4f5e-4eba-9764-ad205d0891f9",
    icon: {
      url: "icones/truck.png",
      size: new google.maps.Size(32, 32)
    },
    data: [
      {state: 'Ativo', date: new Date("2021-02-01T17:00:00Z")},
      {state: 'Em Manutenção', date: new Date("2021-02-03T23:00:00Z")},
      {state: 'Desligado', date: new Date("2021-05-09T08:00:00Z")}
    ]

  });

  const infoW = new google.maps.InfoWindow({
    content:  "<p> Estado Atual: Ativo </p>"
  });

  marker.addListener('click', () => {
    let content = '<p>Estado Atual: ' + marker.data.slice(-1)[0].state + '</p>';
     content += '<p>Histórico de Estados:</p>';
    marker.data.forEach((item) => {
      content += `<p>${item.date.toLocaleString()} - ${item.state}</p>`;
    });
    infoW.setContent(content);
    infoW.open(map, marker);
  });

 
  
  return {marker, infoW}
}





  
  
