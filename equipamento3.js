export function meuMarcador3(map) {
  

    const marker3 = new google.maps.Marker({
      position: {lat: -19.125318, lng: -46.064429},
      map: map,
      title: "Harvester",
      
      id: "1c7e9615-cc1c-4d72-8496-190fe5791c8b",
      icon: {
        url: "icones/harvester.png",
        size: new google.maps.Size(32, 32)
      },
      data: [
        {state: 'Desligado', date: new Date("2021-02-01T17:00:00Z")},
        {state: 'Em Manutenção', date: new Date("2021-02-03T23:00:00Z")},
        {state: 'Ativo', date: new Date("2021-05-09T08:00:00Z")}
      ]
  
    });
  
    const infoW3 = new google.maps.InfoWindow({
      content:  "<p> Estado Atual: Em Manutenção </p>"
    });
  
    marker3.addListener('click', () => {
      let content = '<p>Estado Atual: ' + marker3.data.slice(-1)[0].state + '</p>';
       content += '<p>Histórico de Estados:</p>';
      marker3.data.forEach((item) => {
        content += `<p>${item.date.toLocaleString()} - ${item.state}</p>`;
      });
      infoW3.setContent(content);
      infoW3.open(map, marker3);
    });
  
   
    
    return {marker3, infoW3}
  }