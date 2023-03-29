// ---- equipment.json ----
fetch('equipment.json')
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById('equipment');
    data.forEach(equipment => {
      const option = document.createElement('option');
      option.text = equipment.name;
      option.value = equipment.id;
      select.options.add(option);
    });


    select.addEventListener('change', event => {
      const selectedEquipment = data.find(equipment => equipment.id === event.target.value);
      if (selectedEquipment) {


        // ---- equipmentModel.json ----
        fetch('equipmentModel.json')
          .then(response => response.json())
          .then(modelData => {
            
            const selectedModel = modelData.find(model => model.id === selectedEquipment.equipmentModelId);
            if (selectedModel) {

              // ---- Mostra as informações ----
              const equipmentDetails = document.getElementById('equipmentDetails');
              equipmentDetails.innerHTML = `
              <p id="equipamento-title"><b>EQUIPAMENTO</b></p>
                <p><b>Nome:</b> ${selectedEquipment.name}</p>
                <p><b>Modelo:</b> ${selectedModel.name}</p>
              `;

              // ---- equipmentState.json ----
              fetch('equipmentState.json')
              .then(response => response.json())
              .then(stateData => {
                const selectedState = stateData.find(state => state.equipmentStateId === selectedModel.equipmentStateId);
                if (selectedState) {
                  const equipmentState = document.getElementById('equipmentState');
                  equipmentState.innerHTML = `
                    <p><b>Status:</b> ${selectedState.name}</p>
                  `;
                }
              })
              .catch(error => console.error(error));
          }
        })
        .catch(error => console.error(error));
    }
  });
})
.catch(error => console.error(error));

