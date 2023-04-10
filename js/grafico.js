const chartEstados = document.getElementById('chartEstados')
const chartEquipamentos = document.getElementById('chartEquipamentos')


function criarGrafico(equipamento){

    const qntEquipamentosEstado = []
    const qntEquipamentos = []
    let OP = 0, PR = 0, MT = 0
    let CA = 0, HV = 0, GT = 0
    let valor = 0
    equipamento.forEach(e => {
        if (e.estadoAtual == "Operando") {
            OP = OP + 1
        }else if(e.estadoAtual == "Parado"){
            PR = PR + 1
        }else if(e.estadoAtual == "Manutenção"){
            MT = MT + 1
        }

        if (e.modelo == "Caminhão de carga") {
            CA = CA + 1
        }else if(e.modelo == "Harvester"){
            HV = HV + 1
        }else if(e.modelo == "Garra traçadora"){
            GT = GT + 1
        }

        valor = valor + e.valor
    })
    qntEquipamentosEstado.push(OP, PR, MT)
    qntEquipamentos.push(CA,HV,GT)

    let equipamentosTotais = CA+HV+GT
    exibirNosCards(equipamentosTotais, valor)

    new Chart(chartEstados, {
    type: 'pie',
    responsive: true,
    data: {
        labels: ['Operando', 'Parado', 'Manutenção'],
        datasets: [{
          label: '# of Votes',
          data: qntEquipamentosEstado/* [12, 19, 3, 5, 2, 3] */,
          borderWidth: 1,
          backgroundColor: ["#2ecc71", "#f1c40f", "#e74c3c"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
    }
    })

    new Chart(chartEquipamentos, {
        type: 'pie',
        data: {
          labels: ['Caminhão de Carga', 'Harvester', 'Garra traçadora'],
          datasets: [{
            label: '# of Votes',
            data: qntEquipamentos/* [12, 19, 3, 5, 2, 3] */,
            borderWidth: 1,
            backgroundColor: ["#2ecc71", "#f1c40f", "#e74c3c"]
          }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
      })
}
