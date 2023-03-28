export interface StoreModel {
  modal: { isModalVisible: boolean };
  equipment: {
    equipmentInfo: {
      equipmentId: string;
      equipmentModelId: string;
      id: string;
      name: string;
    };
  };
}
