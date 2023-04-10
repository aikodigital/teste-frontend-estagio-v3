/* Arrays para receberem as informações dos Json */
let equipamentos = []
let modelos = []
let posicoes = []
let estados = []
let estadosHistorico = []

/* Constantes para fazer as requisição */
const APIEquipamentos = 'data/equipment.json'
const APIModelo = 'data/equipmentModel.json'
const APIPosicao = 'data/equipmentPositionHistory.json'
const APIEstado = 'data/equipmentState.json'
const APIEstadoHistorico = 'data/equipmentStateHistory.json'

/* Função para fazer a requisição */
getBuscarNaAPI()
async function getBuscarNaAPI(){
    const equ = await fetch(APIEquipamentos)
    equipamentos = await equ.json()
    const mod = await fetch(APIModelo)
    modelos = await mod.json()
    const pos = await fetch(APIPosicao)
    posicoes = await pos.json()
    const est = await fetch(APIEstado)
    estados = await est.json()
    const his = await fetch(APIEstadoHistorico)
    estadosHistorico = await his.json()

    /* Função para Adicionar os equipamentos a lista para serem exibidos na tabela */
    adicionarEquipamentoAListaGlobal()
}

