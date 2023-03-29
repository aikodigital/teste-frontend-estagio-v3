import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapSlice";
import equipmentReducer from "./equipmentSlice";
import selectedReducer from "./selectedEquipment";


export default configureStore({
    reducer:{
        map: mapReducer,
        equipments : equipmentReducer,
        selectedEquipment: selectedReducer,
    }
}) 
