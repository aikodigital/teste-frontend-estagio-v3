/* Array para receber o histórico */
let historicoTotal = []
/* Essa função vai criar uma lista com os historicos com os itens selecionados */
function selecionarHistorico(){  
    /* Pegar o Id da checkbox selecionada. O id da checkbox está com o ID do respectivo Equipamento */
    const checkbox = document.getElementById(this.id).id
    if(this.checked) {
            /* Inicialização da array vazia */
            let historico = {}
            /* Para cada item da lista */
            for (let a = 0; a < lista.length; a++) {
                /* Se o ID do equipamento da lista for igual ao ID da checkbox */
                if (lista[a].equipamentoId == checkbox) {
                    /* Atribuir o historico de estados ao dicionario Historico */
                    historico.historico = lista[a].HistoricoDeEstados
                    /* Atribuir o nome do equipamento ao dicionario historico */
                    historico.equipamento = lista[a].equipamento
                }
            }
            /* Colocar dicionario na array HistoricoTotal */
            historicoTotal.push(historico)
        }
        /* Caso a checkbox seja desselecionada */
        else{
                /* Criando um dicionario vazio */
                let historico = {}
                /* Para cada item do historico de estados */
                for (let a = 0; a < lista.length; a++) {
                    /* Se o ID do equipamento da lista for igual ao ID da checkbox */
                    if (lista[a].equipamentoId == checkbox) {
                        /* Atribuir o historico de estados ao dicionario Historico */
                        historico.historico = lista[a].HistoricoDeEstados
                        /* Atribuir o nome do equipamento ao dicionario historico */
                        historico.equipamento = lista[a].equipamento
                        /* Para cada item do historicoTotal */
                        for (let a = 0; a < historicoTotal.length; a++) {
                            /* Se o equipamento no historicoTotal for igual ao equipamento no historico de equipamentos */
                            if (historicoTotal[a].equipamento == historico.equipamento){
                                /* Retirar do historico total o equipamento */
                                historicoTotal.splice(a, 1)
                            }
                        }
                    }
                }
            }
/* Chamando função para exibir o historico atualizado */
    exibirHistoricoEstado(historicoTotal)
}


function filtrarHistorico(){
    
}