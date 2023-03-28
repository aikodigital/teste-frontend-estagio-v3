export enum ModalActionTypes {
  openModal,
  closeModal,
}

export interface ModalAction {
  type: ModalActionTypes;
}

export function openModal(): ModalAction {
  return {
    type: ModalActionTypes.openModal,
  };
}

export function closeModal(): ModalAction {
  return {
    type: ModalActionTypes.closeModal,
  };
}
