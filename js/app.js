import createElementsGroup from '../services/api.js'
const cardWrapper = document.querySelector('.card-wrapper')
const dashboardTitle = document.querySelector('.dashboard-title')
const mapBtn = document.querySelector('#map-btn')
const dashboardBtn = document.querySelector('#dashboard-btn')

//função para renderizar o dashboard dos equipamentos
const renderDashboard = async () => {
    cardWrapper.innerHTML = ''
    dashboardTitle.innerHTML = `<span class="material-symbols-outlined">dashboard</span>Dashboard`
    const elements = await createElementsGroup() 
    let imgLink = 'https://static.vecteezy.com/ti/vetor-gratis/p1/4772397-red-color-side-cargo-truck-cartoon-illustration-design-gratis-vetor.jpg'

    elements.map(element => {
        if(element.modelName == 'Harvester'){
            imgLink = `https://static6.depositphotos.com/1025962/562/v/450/depositphotos_5621655-stock-illustration-harvest-combine.jpg
            `
        }else if(element.modelName == 'Garra traçadora'){
            imgLink = `https://www.orangeboxminiaturas.com.br/img/products/carregadeira-florestal-volvo-l180e-high-lift-motorart-1-50-mot-10143_1_1200.jpg`
        }
        cardWrapper.innerHTML += `
        
        <div class="card">
            <div class="id">${element.id.slice(0, 8)}</div>
            <div class="machine-info">
                <span class="card-name">${element.name}</span>
                <img class="machine-img" src="${imgLink}" alt="Desenho de um caminhão de carga">
                <span class="card-model">${element.modelName}</span>
            </div>
            <span class="card-state ${element.state.name}">${element.state.name}</span>
            <div class="card-location">
                <span class="lat">Lat: ${element.location.lat}</span>
                <span class="long">Lon: ${element.location.long}</span>
            </div>
            <div class="card-btns">
                    <button type="button" class="btn-location" id="loc${element.id.slice(0, 8)}">Localização</button>
                    <button type="button" class="btn-history" id="his${element.id.slice(0, 8)}">Histórico</button>
            </div>
        </div>
        `
    })
    const indHistory = document.querySelectorAll('.btn-history')
    const indMap = document.querySelectorAll('.btn-location')
    indMap.forEach(element => element.addEventListener('click', renderIndMap))
    indHistory.forEach(element => element.addEventListener('click', renderHistory))
} 

//função para renderizar o mapa com a localização de todos os equipamentos
const renderMap = async () => {
    const elements = await createElementsGroup()
    cardWrapper.innerHTML = ''
    cardWrapper.innerHTML = `<div id="map"></div>`
    dashboardTitle.innerHTML = `<span class="material-symbols-outlined">location_on</span>Mapa`

    let imgLink = 'https://static.vecteezy.com/ti/vetor-gratis/p1/4772397-red-color-side-cargo-truck-cartoon-illustration-design-gratis-vetor.jpg'

    const map = L.map('map').setView([-19.126536, -45.947756], 11)

    elements.forEach(element => {
        if(element.modelName == 'Harvester'){
            imgLink = `https://static6.depositphotos.com/1025962/562/v/450/depositphotos_5621655-stock-illustration-harvest-combine.jpg
            `
        }else if(element.modelName == 'Garra traçadora'){
            imgLink = `https://www.orangeboxminiaturas.com.br/img/products/carregadeira-florestal-volvo-l180e-high-lift-motorart-1-50-mot-10143_1_1200.jpg`
        }

        L.marker([element.location.lat, element.location.long])
        .addTo(map)
        .bindPopup(`
            <div class='popup'>
            <b>${element.name}</b><br>
            <span>${element.id.slice(0, 8)}</span><br>
            <img class='machine-img' src='${imgLink}'>
            </div>
        `)
        .openPopup();
    })
    

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // let marker = 
    //     L.marker([-19.126536, -45.947756])
    //     .addTo(map)
    //     .bindPopup("<div class='popup'><b>Caminhão de carga</b><br><img class='machine-img' src='https://static.vecteezy.com/ti/vetor-gratis/p1/4772397-red-color-side-cargo-truck-cartoon-illustration-design-gratis-vetor.jpg' alt='Desenho de um caminhão de carga'></div>").openPopup();
}

//função para renderizar o histórico do equipamento clicado
const renderHistory = async ({target}) => {
    cardWrapper.innerHTML = ''
    const elements = await createElementsGroup()
    dashboardTitle.innerHTML = `<span class="material-symbols-outlined">history</span>Histórico`

    elements.forEach(element => {
        if(element.id.slice(0, 8) == target.id.slice(3, 12)){
            cardWrapper.innerHTML += `
                <div class="history-wrapper">
                    <h3>${element.name}</h3>
                    <div class="location">
                        <span>Localizações</span>
                    </div>
                    <div class="state">
                        <span>Estados</span>
                    </div>
                </div>
            `
            const historyLoc = document.querySelector('.location')
            const historyStat = document.querySelector('.state')
            let stateName = 'Operando'
            element.history[0].states.forEach(state => {
                element.states.forEach(eleState => {
                    if(state.equipmentStateId === eleState.id){
                        stateName = eleState.name
                    }   
                })
                historyStat.innerHTML += `
                    <div>
                        <span class="state-date">Data: ${state.date}</span>
                        <span class="state">Estado: ${stateName}</span>    
                    </div>
                `
            })

            element.history[1].positions.forEach(positon => {
                historyLoc.innerHTML += `
                    <div>
                            <span class="loc-date">Data: ${positon.date}</span>
                            <div class="lat-lon">
                                <span class="loc-lat">Lat: ${positon.lat}</span>
                                <span class="log-lon">Lon: ${positon.lon}</span>
                            </div>
                        </div>
                    </div>
                `
            })
        }
    })

}

//função para renderizar a localização do equipamento clicado
const renderIndMap = async ({target}) => {  
    const elements = await createElementsGroup()
    cardWrapper.innerHTML = ''
    cardWrapper.innerHTML = `<div id="map"></div>`
    dashboardTitle.innerHTML = `<span class="material-symbols-outlined">location_on</span>Mapa`

    let imgLink = 'https://static.vecteezy.com/ti/vetor-gratis/p1/4772397-red-color-side-cargo-truck-cartoon-illustration-design-gratis-vetor.jpg'

    

    elements.forEach(element => {
        if(element.modelName == 'Harvester'){
            imgLink = `https://static6.depositphotos.com/1025962/562/v/450/depositphotos_5621655-stock-illustration-harvest-combine.jpg
            `
        }else if(element.modelName == 'Garra traçadora'){
            imgLink = `https://www.orangeboxminiaturas.com.br/img/products/carregadeira-florestal-volvo-l180e-high-lift-motorart-1-50-mot-10143_1_1200.jpg`
        }
        
        if(element.id.slice(0, 8) == target.id.slice(3, 12)){
            const map = L.map('map').setView([element.location.lat, element.location.long], 11)

            L.marker([element.location.lat, element.location.long])
            .addTo(map)
            .bindPopup(`
                <div class='popup'>
                <b>${element.name}</b><br>
                <span>${element.id.slice(0, 8)}</span><br>
                <img class='machine-img' src='${imgLink}'>
                </div>
            `)
            .openPopup();

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        }
    })
    
    
    
}

renderDashboard()

mapBtn.addEventListener('click' , renderMap)
dashboardBtn.addEventListener('click' , renderDashboard)





