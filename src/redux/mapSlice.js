import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
    name: 'map',

    initialState: {
        eqState: '',
        model: '',
    },
    reducers: {
        changeEqState(state, { payload }){
            return {...state, eqState: payload }
        },
        changeModel(state, { payload }){
            return {...state, model: payload}
        }
    }
})


export const {changeEqState, changeModel} = mapSlice.actions
export default mapSlice.reducer