
const myMap = L.map('map').setView([-43.940933, -19.912998], 10);

const  attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 

const tileLayer = L.tileLayer(titleUrl, {attribution});
tileLayer.addTo(myMap);


var  myIcon = L.icon({
    iconUrl: '../img/location.png',
    iconSize: [30, 40],
    
});


function generateList(){
    const ul = document.querySelector('.list');

    storeList.forEach((store)=> {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
       
        a.addEventListener('mouseover',()=>{
            flyToStore(store);
            
        });
       
        div.classList.add('store-item');
        a.innerText = store.properties.name1;
        a.href ='#';
        p.innerText = store.properties.name;
        p.innerText = store.properties.date;
        p.innerText = store.properties.lat;
        p.innerText = store.properties.lon;
        p.innerText = store.properties.id;
        p.innerText = store.properties.status;
        p.innerText = store.properties.color;
        p.innerText = store.properties.equipmentStateId;
        p.innerText = store.properties.info;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);


    });
}

generateList();

function makePopupContent(store){
    return `
        <div>
            <h4>${store.properties.name1}</h4>
            <p>Nome-${store.properties.name}</p>
            <p>Data-${store.properties.date}</p>
            <p>Latitude${store.properties.lat}</p>
            <p>Longitude${store.properties.lon}</p>
            <p>ID-${store.properties.id}</p>
            <p>Status-${store.properties.status}</p>
            <p>cor-${store.properties.color}</p>
            <p>Estado do Equipamento-${store.properties.equipmentStateId}</p>
        </div>`
    ;
    
}

function onEachFeature(feature, layer){
    layer.bindPopup(makePopupContent(feature), L.popup({closeButton: true, offset: L.point(0, -8)}));
}

const storesLayer = L.geoJSON(storeList,{
    onEachFeature: onEachFeature,
    pointToLayer: function(feature,coordinates){
        return L.marker(coordinates, {icon: myIcon});

    }
});

storesLayer.addTo(myMap);

function flyToStore(store){
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];

    myMap.flyTo([lat, lng], 14,{
        duration: 3
    });

    setTimeout(()=>{
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat,lng])
        .setContent(makePopupContent(store))
        .openOn(myMap);
    },3000);
    
    }