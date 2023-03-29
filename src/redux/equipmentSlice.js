import { createSlice } from "@reduxjs/toolkit";
import { EquipmentControl } from "../utils/equipmentControl";

const control = new EquipmentControl();
const equipments = control.currentEquipments();

const equipmentSlice = createSlice({
    name: 'equipments',
    
    initialState: {
        equipments
    },
    reducers: {
        changeEquipmentList(state, { payload }) {
            return { ...state, payload }
        },
    
    }
})


export const {changeEquipmentList} = equipmentSlice.actions
export default equipmentSlice.reducer