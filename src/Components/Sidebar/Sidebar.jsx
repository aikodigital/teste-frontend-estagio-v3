import './index.css'
import Logo from '../../assets/aiko1.png'
import { Autocomplete, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import EquipmentJson from '../../../data/equipment.json'
import { useState } from 'react'

function Sidebar({ stateFilterCallback, equipmentFilterCallback }) {
  const [selectedState, setSelectedState] = useState(['Operando', 'Manutenção', 'Parado'])

  function handleStateFilter(e) {
    const { value } = e.target

    setSelectedState(value)
    stateFilterCallback(value)
  }

  const options = EquipmentJson.map(equipment => ({
    label: equipment.name, 
    id: equipment.id,
    value: equipment.name
  }))

  return (
    <div className='sidebar-body'>
      <img src={Logo} alt="" />
      <div className='sidebar-body-estado'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Estados</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label='Estados'
            onChange={handleStateFilter}
            value={selectedState}
            renderValue={(selected) => selected.join(', ')}
            multiple
          >
            <MenuItem value={'Operando'}>
              <Checkbox checked={selectedState.indexOf('Operando') > -1} />
              <ListItemText primary={'Operando'} />
            </MenuItem>
            <MenuItem value={'Manutenção'}>
              <Checkbox checked={selectedState.indexOf('Manutenção') > -1} />
              <ListItemText primary={'Manutenção'} />
            </MenuItem>
            <MenuItem value={'Parado'}>
              <Checkbox checked={selectedState.indexOf('Parado') > -1} />
              <ListItemText primary={'Parado'} />
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className='sidebar-body-estado'>
        <FormControl fullWidth>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            renderInput={(params) => <TextField {...params} label="Equipamentos" />}
            onChange={(e, value) => equipmentFilterCallback(value.label)}
          />
        </FormControl>
      </div>
      <div className='sidebar-reference-model'>
        <div><span className='caminhao-de-carga'>Caminhão de carga</span></div>
        <div><span className='harvester'>Harvester</span></div>
        <div><span className='garra-tracadora'>Garra traçadora</span></div>
      </div>
    </div>
  ) 
}

export default Sidebar