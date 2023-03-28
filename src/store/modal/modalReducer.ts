import { ModalAction, ModalActionTypes } from './modalActions';

const initialState = {
  isModalVisible: false,
};

const modalReducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case ModalActionTypes.openModal:
      return {
        ...state,
        isModalVisible: true,
      };
    case ModalActionTypes.closeModal:
      return {
        ...state,
        isModalVisible: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
