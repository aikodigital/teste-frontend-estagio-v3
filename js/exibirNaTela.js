/* pegando o ID dos canvas para exibir os graficos */
const chartEstados = document.getElementById('chartEstados')
const chartEquipamentos = document.getElementById('chartEquipamentos')

/* Funcao para criar os graficos e os exibir, parametro importado ao final do listaDeEquipamentos.js */
function criarDados(equipamento){

    /* Array para receber a quantidade de cada tipo de estado */
    const qntEquipamentosEstado = []
    /* Array para receber cada modelo de equipamento */
    const qntEquipamentos = []

    /* Declarando arrays para receberem as quantidades de estados e modelos */
    let OP = 0, PR = 0, MT = 0
    let CA = 0, HV = 0, GT = 0
    /* Para cada item na array equipamento */
    equipamento.forEach(e => {
        if (e.estadoAtual == "Operando") {/* Se o estado atual do equipamento for igual a Operando adicionar OP + 1 */
            OP = OP + 1
            
        }else if(e.estadoAtual == "Parado"){ /* Se o estado atual do equipamento for igual a Parado adicionar PR + 1 */
            PR = PR + 1
            
        }else if(e.estadoAtual == "Manutenção"){ /* Se o estado atual do equipamento for igual a Manutenção adicionar MT + 1 */
            MT = MT + 1
        }

        if (e.modelo == "Caminhão de carga") {  /* Se o modelo do equipamento for igual a Caminhão de carga adicionar CA + 1 */
            CA = CA + 1
        }else if(e.modelo == "Harvester"){ /* Se o modelo do equipamento for igual a Harvester adicionar HV + 1 */
            HV = HV + 1
        }else if(e.modelo == "Garra traçadora"){ /* Se o modelo do equipamento for igual a Garra traçadora adicionar GT + 1 */
            GT = GT + 1
        }

    })
    
    /* Adicionando na array os valores de cada equipamento para serem exibidas no grafico */
    qntEquipamentos.push(CA,HV,GT)

    /* Variavel para somar a quantidade de estados */
    let equipamentoTotal = CA+HV+GT
    let estadosTotais = OP+PR+MT

    /* Adicionando as porcentagens a array para serem exibidas no grafico */
    qntEquipamentosEstado.push(OP, PR, MT)
    /* funcao para exibir os dados dos modelos */
    exibirCardEquipamento(CA,HV,GT, equipamentoTotal)
    /* funcao para exibir os dados dos estados */
    exibirCardEstado(OP, PR, MT, estadosTotais)

    /* Criando o gráfico de estados */
    new Chart(chartEstados, {
    type: 'pie',
    responsive: true,
    data: {
        labels: ['Operando', 'Parado', 'Manutenção'],
        datasets: [{
          label: '# of Votes',
          data: qntEquipamentosEstado ,
          borderWidth: 1,
          backgroundColor: ["#2ecc71", "#f1c40f", "#e74c3c"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
    }
    })
    /* Criando o gráfico de modelos */
    new Chart(chartEquipamentos, {
        type: 'pie',
        data: {
          labels: ['Caminhão de Carga', 'Harvester', 'Garra traçadora'],
          datasets: [{
            label: '# of Votes',
            data: qntEquipamentos/* [12, 19, 3, 5, 2, 3] */,
            borderWidth: 1,
            backgroundColor: ["blue", "purple", "orange"]
          }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
      })
}


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
/* pegando o Id do card que ira exibir os dados dos modelos */
const cards_equipamento = document.getElementById('cards-equipamento')

/* Funcao para exibir os dados dos modelos */
function exibirCardEquipamento(caminhao, harvester, garra, equipamentoTotal){
    /* Array para receber os dados */
    let modelosParaExibicao = []
    /* Para cada tipo de modelo */
    modelos.forEach(e => {
        if (e.name == "Caminhão de carga") {/* Se o nome do modelo for igual a Caminhao de Carga */
            /* Atribuindo a cor para o caminhao de carga  */
            e.color = "blue"
            /* Atribuindo a quantidade de caminhao de carga */
            e.quntModelo = caminhao
            /* Atribuindo a porcentagem de caminhao de carga sobre a soma dos modelos totais */
            e.porcentagem = 100*(caminhao / equipamentoTotal)
        }else if(e.name == "Harvester"){/* Se o nome do modelo for igual a Harvester */
            /* Atribuindo a cor para o Harvester  */
            e.color = "purple"
            /* Atribuindo a quantidade de Harvester */
            e.quntModelo = harvester
            /* Atribuindo a porcentagem de Harvester sobre a soma dos modelos totais */
            e.porcentagem = 100*(harvester / equipamentoTotal)
        }else if(e.name == "Garra traçadora"){ /* Se o nome do modelo for igual a Garra traçadora */
        /* Atribuindo a cor para o Garra traçadora  */
            e.color = "orange"
            /* Atribuindo a quantidade de Garra traçadora */
            e.quntModelo = garra
            /* Atribuindo a porcentagem de Garra traçadora sobre a soma dos modelos totais */
            e.porcentagem = 100*(garra / equipamentoTotal)
        }
        /* Adicionando os modelos a array modelosParaExibicao*/
        modelosParaExibicao.push(e)
    })

    /* Para cada modelosParaExibicao */
    for (let a = 0; a < modelosParaExibicao.length; a++) {
        /* Imprimindo os cards */
        cards_equipamento.innerHTML += 
        `
        <div class="card_estado">
            <h3 style="color:${modelosParaExibicao[a].color}">${modelosParaExibicao[a].name}</h3>
            <h3>${modelosParaExibicao[a].quntModelo}</h3>
            <p>Equivale a: ${modelosParaExibicao[a].porcentagem.toFixed(2)}%</p>
        </div>
        `
        
    }

}
/* pegando o Id do card que ira exibir os dados dos estados */
const cards_estado = document.getElementById('cards-estado')

/* Funcao para exibir os dados dos estados */
function exibirCardEstado(operando, parado, manutencao, estadoTotal){
    /* Array para receber os dados */
    let estadosParaExibicao = []
    /* Para cada tipo de estado */
    estados.forEach(e => {
        if (e.name == "Operando") {/* Se o nome do estado for igual a Operando */
            /* Atribuindo a quantidade equipamentos de operando  */
            e.quntEstado = operando
            /* Atribuindo a porcentagem de caminhao de carga sobre a soma dos estados totais */
            e.porcentagem = 100*(operando / estadoTotal)
        }else if(e.name == "Parado"){ /* Se o nome do estado for igual a Parado */
            /* Atribuindo a quantidade de equipamentos Parado */
            e.quntEstado = parado
            /* Atribuindo a porcentagem de caminhao de carga sobre a soma dos estados totais */
            e.porcentagem = 100*(parado / estadoTotal)
        }else if(e.name == "Manutenção"){ /* Se o nome do estado for igual a Manutenção */
        /* Atribuindo a quantidade de equipamentos em manutencao */
            e.quntEstado = manutencao
            /* Atribuindo a porcentagem de Manutenção sobre a soma dos estados totais */
            e.porcentagem = 100*(manutencao / estadoTotal)
        }
        /* Adicionando os estados a array estadosParaExibicao*/
        estadosParaExibicao.push(e)
    })

    /* Para cada estadosParaExibicao */
    for (let a = 0; a < estadosParaExibicao.length; a++) {
        /* Imprimindo os cards */
        cards_estado.innerHTML += 
        `
        <div class="card_estado">
            <h3 style="color:${estadosParaExibicao[a].color}">${estadosParaExibicao[a].name}</h3>
            <h3>${estadosParaExibicao[a].quntEstado}</h3>
            <p>Equivale a: ${estadosParaExibicao[a].porcentagem.toFixed(2)}%</p>
        </div>
        `
        
    }

}