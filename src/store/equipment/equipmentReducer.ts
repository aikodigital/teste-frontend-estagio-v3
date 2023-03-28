import { EquipmentAction, EquipmentActionTypes } from './equipmentActions';

const initialState = {
  equipmentInfo: {},
};

const equipmentReducer = (state = initialState, action: EquipmentAction) => {
  if (!action.payload) {
    return state;
  }

  switch (action.type) {
    case EquipmentActionTypes.setActiveEquipment:
      return {
        ...state,
        equipmentInfo: action.payload,
      };
    case EquipmentActionTypes.clearEquipment:
      return {
        ...state,
        equipmentInfo: action.payload,
      };
    default:
      return state;
  }
};

export default equipmentReducer;
