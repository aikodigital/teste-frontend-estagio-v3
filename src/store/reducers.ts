import { combineReducers } from '@reduxjs/toolkit';
import equipmentReducer from './equipment/equipmentReducer';
import modalReducer from './modal/modalReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  equipment: equipmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
