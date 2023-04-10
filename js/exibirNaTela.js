/* Essa função irá exibir a lista dos equipamentos na tabela */
function exibirListaNaTela(equipamentos){
    /* Pegando o Id da tabela para a exibição */
    const tabelaDeEquipamentos = document.getElementById('equipamentos')
    /* Reiniciando a lista Equipamentos */
    tabelaDeEquipamentos.innerHTML = `
    <tr>
        <th>Check</th>
        <th>Nome</th>
        <th>Estado</th>
        <th>Modelo</th>
        <th>Valor p/Hora</th>
    </tr>   
    `
    /* Executara para cada elemento da Array Equipamentos */
    equipamentos.forEach(equipamento => {
        /* Imprimindo na tabela */
        /* Veja que atribui o ID do equipamento ao ID da checkbox, para que possa ser usado quando for buscar o histórico daquele item */
        tabelaDeEquipamentos.innerHTML += `
        <tr>
            <td><input type="checkbox" class="btn" name="checkbox" id="${equipamento.equipamentoId}"></td>
            <td>${equipamento.equipamento}</td>
            <td style="color:${equipamento.EstadoCor}">${equipamento.estadoAtual}</td>
            <td>${equipamento.modelo}</td>
            <td>R$${equipamento.valor}</td>
        </tr>
        `
    })
    /* Ao final da execução ele criar um EventListener para a checkbox que fica ao lado de cada elemento da lista.  */
    let checkbox = document.querySelectorAll("input[name=checkbox]")
    /* Essa função servirá para saber quais elementos estão selecionados para aparecerem no histórico */
    checkbox.forEach(btn => btn.addEventListener('click', selecionarHistorico))

}

/* Criando o mapa na tela */
var map = L.map('map').setView([-19.1, -46], 11);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
/* Criando a array para receber os marcadores */
var markerMap = []


/* Função para criar os marcadores no mapa baseado nos equipamentos que foram enviados */
function exibirListaNoMapa(equipamentos){
    /* Para item na array equipamentos */
    for (let i = 0; i < equipamentos.length; i++) {
        /* atribuindo o ultimo item da array (Ele guarda a posicao mais recente do equipamento) a latitude e longitude */
        let latitude = equipamentos[i].HistoricoDePosicoes.at(-1).lat
        let longitude = equipamentos[i].HistoricoDePosicoes.at(-1).lon

        /* Adicionando o marcador no mapa */
        let marker = L.marker([latitude, longitude]).addTo(map)
        /* PopUp ao clicar no marcador */
            .bindPopup(equipamentos[i].equipamento + '<br>' + equipamentos[i].estadoAtual + '<br>' +  equipamentos[i].modelo)
        /* Colocando o marcador na array MarkerMap para poder limpar os marcadores */
        markerMap.push(marker)
    }

}

/* Funcao para limpar os marcadores atuais no mapa para adicionar novos */
function limparMapa(){
    /* Para cara item na array */
    markerMap.forEach(e => {
        /* Removendo os marcadores */
        e.remove()
    })
}

/* Essa função irá exibir o histórico dos itens selecionados pela checkbox */
function exibirHistoricoEstado(listaHistorico){
    /* Pegando o Id da tabela para a exibição */
    const tabelaDeHistorico = document.getElementById('historico-equipamento')
    /* Funcao para reiniciar a tabela do histórico */
    limparHistorico()
    /* Para cada elemento da Array listaHistorico. A array lista hitorico armazena outras arrays por isso um ForEach dentro de um For*/
    for (let i = 0; i < listaHistorico.length; i++) {
        let equipamentoHistorico = listaHistorico[i].historico
        /* Para cada elemento da lista historico na posição "i" */
        equipamentoHistorico.forEach(itemHistorico => {
             /* Imprimindo na tabela */
            tabelaDeHistorico.innerHTML += `
            <tr>
                <td>${itemHistorico.date}</td>
                <td>${itemHistorico.NomeEquipamento}</td>
                <td style="color:${itemHistorico.estadoCor}">${itemHistorico.Estado}</td>
                <td>R$${itemHistorico.valor}</td>
            </tr>
            `
        })
    } 
    console.log(listaHistorico)
}

/* Funcao para reiniciar a tabela do histórico */
function limparHistorico() {
/* Pegando o Id da tabela para a exibição */
const tabelaDeHistorico = document.getElementById('historico-equipamento')
/* Adicionando o topo da tabela no HTML */
tabelaDeHistorico.innerHTML = `
<tr>
    <th>Data</th>
    <th>Equipamento</th>
    <th>Estado</th>
    <th>Valor p/Hora</th>
</tr>
                        `
}

const equipamentosTotalCard= document.getElementById('qntDeEquipamentos')
const lucroTotalCard = document.getElementById('lucroDosEquipamentos')

function exibirNosCards(equipamentoTotal, lucroTotal){
    equipamentosTotalCard.innerHTML = equipamentoTotal
    lucroTotalCard.innerHTML = `R$${lucroTotal}`
}