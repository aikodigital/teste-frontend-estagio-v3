function abrirModal(equipmentId, estado, equipamento, modelo) {

  let logica1 = JSON.parse(localStorage.getItem("data")).equipmentStateHistory.find(el => el.equipmentId == equipmentId)

  console.log(logica1)

  let equipmentState = JSON.parse(localStorage.getItem("data")).equipmentState

  document.querySelector('.modal').classList.add('opened')
  document.querySelector('.modal-title').innerText = "Equipamento: " + equipamento;
  document.querySelector('.modal-modelo').innerText = "Modelo: " + modelo;
  document.querySelector('.modal-estado').innerText = "Estado: " + estado;

  let listaHistorico = ""

  logica1.states.forEach(state => {
    listaHistorico += `
    <div clas="modal-historico-conteudo"> 
      Data: ${new Date(state.date).toLocaleString()} - Estado: ${equipmentState.find(el => el.id == state.equipmentStateId).name}
    </div > `
  });
  document.querySelector('.modal-historico').innerHTML = listaHistorico;
}

const modalEl = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');

function closeModal() {
  modalEl.classList.remove('opened');
  document.body.style.overflow = 'auto';
};

document.addEventListener('click', (e) => {
  if (e.target === modalEl) closeModal();
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') closeModal();
});

closeBtn.addEventListener('click', closeModal);