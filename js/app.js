import createElementsGroup from '../services/api.js'
const cardWrapper = document.querySelector('.card-wrapper')

const renderElements = async () => {
    const elements = await createElementsGroup()
    elements.map(element => {
        cardWrapper.innerHTML += `
        <div class="card">
            <div class="id">${element.id.slice(0, 8)}</div>
            <div class="machine-info">
                <span class="card-name">${element.name}</span>
                <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/4772397-red-color-side-cargo-truck-cartoon-illustration-design-gratis-vetor.jpg" alt="Desenho de um caminhão de carga">
                <span class="card-model">${element.modelName}</span>
            </div>
            <span class="card-state ${element.state.name}">${element.state.name}</span>
            <div class="card-location">
                <span class="lat">Lat: ${element.location.lat}</span>
                <span class="long">Lon: ${element.location.long}</span>
            </div>
            <div class="card-btns">
                    <button type="button" class="btn-history">Localização</button>
                    <button type="button" class="btn-history">Histórico</button>
            </div>
        </div>
        `
    })
} 

renderElements()