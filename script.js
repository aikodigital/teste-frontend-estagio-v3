/**
 * Variáveis que definem os marcadores das máquinas no mapa.
 */
var marker = L.marker([-19.151801, -46.007759], {title: 'CA-001 - Caminhão de Carga'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>03:00:00</b> - Manutenção<br>' + '<b>06:00:00</b> - Operando<br>' + '<b>18:00:00</b> - Parado<br>' + '<b>Mais recente</b> - Operando'),
    
    marker2 = L.marker([-19.195811, -45.825157], {title: 'CA-002 - Caminhão de Carga'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>03:00:00</b> - Parado<br>' + '<b>06:00:00</b> - Manutenção<br>' + '<b>Mais recente</b> - Operando'),
    
    marker3 = L.marker([-19.134644, -46.087206], {title: 'CA-003 - Caminhão de Carga'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>05:00:00</b> - Parado<br>' + '<b>11:00:00</b> - Manutenção<br>' + '<b>14:00:00</b> - Parado<br>' + '<b>Mais recente</b> - Operando'),
    
    marker4 = L.marker([-18.978732, -45.918204], {title: 'CA-004 - Caminhão de Carga'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>06:00:00</b> - Parado<br>' + '<b>11:00:00</b> - Operando<br>' + '<b>15:00:00</b> - Manutenção<br>' + '<b>Mais recente</b> - Operando'),
    
    marker5 = L.marker([-19.027071, -46.004085], {title: 'HV-1001 - Harvester'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>01:00:00</b> - Manutenção<br>' + '<b>05:00:00</b> - Operando<br>' + '<b>12:00:00</b> - Manutenção<br>' + '<b>14:00:00</b> - Manutenção<br>' + '<b>22:00:00</b> - Parado<br>' + '<b>Mais recente</b> - Operando'),   
    
    marker6 = L.marker([-19.287676, -46.082552], {title: 'HV-1002 - Harvester'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>06:00:00</b> - Manutenção<br>' + '<b>10:00:00</b> - Operando<br>' + '<b>21:00:00</b> - Manutenção<br>' + '<b>Mais recente</b> - Operando'),
    
    marker7 = L.marker([-19.091692, -46.14889], {title: 'GT-2001 - Garra Traçadora'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>14:00:00</b> - Manutenção<br>' + '<b>Mais recente</b> - Operando'),
    
    marker8 = L.marker([-19.172475, -46.080028], {title: 'GT-2002 - Garra Traçadora'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>01:00:00</b> - Operando<br>' + '<b>08:00:00</b> - Manutenção<br>' + '<b>09:00:00</b> - Parado<br>' + '<b>12:00:00</b> - Manutenção<br>' + '<b>15:00:00</b> - Operando<br>' + '<b>20:00:00</b> - Manutenção<br>' + '<b>Mais recente</b> - Operando'),
    
    marker9 = L.marker([-19.163073, -46.06338], {title: 'GT-2003 - Garra Traçadora'})
            .bindPopup('<center><b>Histórico do último dia: </b></center><br>' + '<b>04:00:00</b> - Parado<br>' + '<b>08:00:00</b> - Operando<br>' + '<b>23:00:00</b> - Manutenção<br>' + '<b>Mais recente</b> - Operando');

/**
 * Camadas para filtrar as máquinas que estão operando,as que estão em manutenção e as que estão paradas no mapa.
 */
var operating = L.layerGroup([marker, marker2, marker3, marker4, marker6, marker7, marker8, marker9]);

var maintenance = L.layerGroup([marker5]);

var stopped = L.layerGroup([]);

/**
 * A variável abaixo define o mapa, onde ele vai focar(center), a quantidade de zoom e os layers para filtrar as máquinas pelo seu estado(operando, manutenção e parado).
 */
var map = L.map('mapid', {
    center: [-19.151801, -46.007759],
    zoom: 10.5,
    layers: [operating, maintenance, stopped]
});

/**
 * A variável osm define o renderizador do mapa no programa.
 */
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

/**
 * A variável equipmentState carrega os estados das máquinas que serão usados como layers.
 */
var equipmentState = {
    "Operando": operating,
    "Manutenção": maintenance,
    "Parado": stopped
};

/**
 * a variável layerControl cumpre a função de adicionar a variável equipmentState ao mapa, assim colocando os layers para filtragem.
 */
var layerControl = L.control.layers(equipmentState).addTo(map);

