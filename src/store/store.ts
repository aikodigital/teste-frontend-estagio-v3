import { createStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = createStore(rootReducer);
export default store;
