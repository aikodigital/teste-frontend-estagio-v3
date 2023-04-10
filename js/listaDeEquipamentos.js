/* Iniciando a array Lista vazia */
var lista = [] 
/*Função para fazer os processos de comparação de chave Estrangeira com chave primaria e atribuir todos valores a array Lista. Essa lista sera usada para receber todas as informações de cada equipamento */
function adicionarEquipamentoAListaGlobal(){   
    /* Percorrer toda Array de equipamentos*/
    for (let i = 0; i < equipamentos.length; i++) { 
        /* Dicionario Items ira receber os equipamentos e as propriadades e depois colocar os equipamentos na Lista */
        let items = {}
        /* Adicionando o nome do equipamento ao dicionario*/
            items.equipamento = equipamentos[i].name
        /* Adicionando o Id do equipamento ao dicionario */
            items.equipamentoId = equipamentos[i].id
        /* Adicionando o ID do modelo do equipamento ao dicionario */
            items.equipmentModelId = equipamentos[i].equipmentModelId

            /* Percorrer toda Array de posicoes dos equipamentos  */
            for (let t = 0; t < posicoes.length; t++) {
                /* Se o ID Equipamento na array Posicoes for igual ao ID Equipamento do dicionario  */
                if (posicoes[t].equipmentId == items.equipamentoId) {
                    /* Atribuindo o historico de posicoes ao dicionario */
                    items.HistoricoDePosicoes = posicoes[t].positions

                    /* Percorrer toda Array do historico de posicoes do equipamento[i]  */
                    for (let z = 0; z < items.HistoricoDePosicoes.length; z++) {
                        
                        /* Essa parte é para manipulação das datas para uma exibição mais limpa na tabela */
                        /* Atribuindo a data a variavel dataIso */
                        let dataIso = items.HistoricoDePosicoes[z].date

                        /* Transformando dataIso em uma data */
                        let data = new Date(dataIso)
                        let dia = data.getDate() //Pegando o dia da data
                        let mes = data.getMonth() + 1 //Pegando o mês da data e como o mês começa em zero, então adicionamos 1
                        let ano = data.getFullYear() //Pegando o ano da data
                        let horas = data.getHours() //Pegando a hora da data
                    
                        if (dia < 10) {
                            dia = '0' + dia // Adiciona um zero à esquerda se o dia for menor que 10
                        }
                    
                        if (mes < 10) {
                            mes = '0' + mes // Adiciona um zero à esquerda se o mês for menor que 10
                        }

                        if (horas < 10){
                            horas = '0' + horas // Adiciona um zero à esquerda se a hora for menor que 10
                        }

                        /* Criando a data organizada e formatada e atribuindo a variavel dataFormatada*/
                        let dataFormatada = dia + '/' + mes + '/' + ano + '-' + horas + 'h'

                        /* Atribuindo a data formatada ao historico de posicoes */
                        items.HistoricoDePosicoes[z].date = dataFormatada
                    }
                }
            }
        /* Percorrer toda Array do histórico do equipamento */
        for (let e = 0; e < estadosHistorico.length; e++) {
            /* Se o ID Equipamento for igual ao ID EquipamentoHistórico  */
            if (equipamentos[i].id == estadosHistorico[e].equipmentId) {

                /* Adicionando o histórico dos estados ao dicionario */
                items.HistoricoDeEstados = estadosHistorico[e].states

                /* Para cada item do historico de estados */
                for (let x = 0; x < items.HistoricoDeEstados.length; x++) {
                    
                        /* Essa parte é para manipulação das datas para uma exibição mais limpa na tabela */
                        /* Atribuindo a data a variavel dataIso */
                        let dataIso = items.HistoricoDeEstados[x].date

                        /* Transformando dataIso em uma data */
                        let data = new Date(dataIso)
                        let dia = data.getDate() //Pegando o dia da data
                        let mes = data.getMonth() + 1 //Pegando o mês da data e como o mês começa em zero, então adicionamos 1
                        let ano = data.getFullYear() //Pegando o ano da data
                        let horas = data.getHours() //Pegando as horas da data
                    
                        if (dia < 10) {
                            dia = '0' + dia // Adiciona um zero à esquerda se o dia for menor que 10
                        }
                    
                        if (mes < 10) {
                            mes = '0' + mes // Adiciona um zero à esquerda se o mês for menor que 10
                        }

                        if (horas < 10){
                            horas = '0' + horas
                        }

                        /* Criando a data organizada e formatada e atribuindo a variavel dataFormatada*/
                        let dataFormatada = dia + '/' + mes + '/' + ano + '-' + horas + 'h'

                        /* Atribuindo a data formatada ao historico de estados */
                        items.HistoricoDeEstados[x].date = dataFormatada

                /* Percorrer toda Array dos possiveis estados do equipamento */
                for (let d = 0; d < estados.length; d++) {
                    /* Se o ID do estado no historico for igual ao ID do Estado na array de estados */
                    if (items.HistoricoDeEstados[x].equipmentStateId == estados[d].id) {
                        /* Adicionando no histórico dos estados o nome do estado */
                        items.HistoricoDeEstados[x].Estado = estados[d].name
                        /* Adicionando no histórico dos estados o nome do equipamento */
                        items.HistoricoDeEstados[x].NomeEquipamento = equipamentos[i].name
                        /* Adicionando no histórico dos estados a cor do estado */
                        items.HistoricoDeEstados[x].estadoCor = estados[d].color
                        
                    }

                    /* Se o ID do Estado mais atual do equipamento for igual ao ID da lista de estados*/
                    if (estadosHistorico[e].states.at(-1).equipmentStateId == estados[d].id) {

                        /* Adicionando a cor do estado ao dicionario */
                        items.EstadoCor = estados[d].color


                        /* Percorrer toda Array dos modelos de equipamento */
                        for (let j = 0; j < modelos.length; j++) {
                            /* Adicionando os precos dos modelos a var ganho para facilitar o uso */
                            let ganho = modelos[j].hourlyEarnings
                            /* Adicionando o estado atual do equipamento ao dicionario*/
                            items.estadoAtual = estados[d].name
                            

                            /* Se o ID do modelo for igual ao ID do equipamento  */
                            if (modelos[j].id == equipamentos[i].equipmentModelId) {    
                                /* Adicionando o modelo do equipamento ao dicionario*/
                                items.modelo = modelos[j].name 

                                /* Percorrer toda Array dos ganhos pelos equipamento */
                                for (let a = 0; a < ganho.length; a++) {

                                    /* Se o ID do estado do equipamento no historico de estados for igual ao Id do estado na array de ganho(por hora) */
                                    if (items.HistoricoDeEstados[x].equipmentStateId == ganho[a].equipmentStateId) {
                                        /* Adicionando no histórico dos estados o valor do estado */
                                        items.HistoricoDeEstados[x].valor = ganho[a].value
                                        
                                    }
                                    /* Se o ID do estado atual do equipamento for igual ao ID do estado */
                                    if (ganho[a].equipmentStateId == estados[d].id) {
                                        /* Adicionando o valor do equipamento ao dicionario*/
                                        items.valor = ganho[a].value
                                    }
                                    
                                }
                            }
                        }
                    } 
                }
                }
            }
        }
        /* Adicionando cada item a array Lista */
        lista.push(items)
    }
    /* Ao terminar todo o procedimento, chamar as funcoes */
    /* Exibir a lista de equipamentos */
    exibirListaNaTela(lista)
    /* Exibir os equipamentos no mapa */
    exibirListaNoMapa(lista)
    /* Exibir os dados em graficos */
    criarDados(lista)
}
