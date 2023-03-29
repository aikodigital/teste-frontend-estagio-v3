import { createSlice } from "@reduxjs/toolkit";

const selectedSlice = createSlice({
    name: 'selectedEquipment',

    initialState: {
        id: '',
        name: '',
        eqState: '',
        isLoged: false,
        initialDate: '',
        finalDate: '',
        model:'',
    },
    reducers: {
        changeName(state, { payload }) {
            return { ...state, name: payload }
        },
        changeIsLoged(state, { payload }) {
            return { ...state, isLoged: payload }
        },
        changeInitialDate(state, { payload }) {
            return { ...state, initialDate: payload }
        },
        changeFinalDate(state, { payload }) {
            return { ...state, finalDate: payload }
        },
        changeId(state, { payload }) {
            return { ...state, id: payload }
        },
        changeEqState(state, { payload }) {
            return { ...state, eqState: payload }
        },
        changeModel(state, { payload }) {
            return { ...state, model: payload }
        },
        changeAll(state,  {payload} ) {
            return { ...state, id:payload.id ,name: payload.name, isLoged: payload.isloged, eqState: payload.eqState, model: payload.model}
        },
    }
})


export const { changeName, changeIsLoged, changeInitialDate, changeFinalDate, changeId, changeEqState, changeModel, changeAll } = selectedSlice.actions
export default selectedSlice.reducer