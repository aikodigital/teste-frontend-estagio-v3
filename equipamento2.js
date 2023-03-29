
export function meuMarcador2(map) {
  

    const marker2 = new google.maps.Marker({
      position: {lat:  -19.141662, lng: -46.066043},
      map: map,
      title: "Garra traçadora",
      
      id: "9c3d009e-0d42-4a6e-9036-193e9bca3199",
      icon: {
        url: "icones/crane.png",
        size: new google.maps.Size(32, 32)
      },
      data: [
        {state: 'Desligado', date: new Date("2021-02-01T17:00:00Z")},
        {state: 'Em Manutenção', date: new Date("2021-02-03T23:00:00Z")},
        {state: 'Em Manutenção', date: new Date("2021-05-09T08:00:00Z")}
      ]
  
    });
  
    const infoW2 = new google.maps.InfoWindow({
      content:  "<p> Estado Atual: Em Manutenção </p>"
    });
  
    marker2.addListener('click', () => {
      let content = '<p>Estado Atual: ' + marker2.data.slice(-1)[0].state + '</p>';
       content += '<p>Histórico de Estados:</p>';
      marker2.data.forEach((item) => {
        content += `<p>${item.date.toLocaleString()} - ${item.state}</p>`;
      });
      infoW2.setContent(content);
      infoW2.open(map, marker2);
    });
  
   
    
    return {marker2, infoW2}
  }