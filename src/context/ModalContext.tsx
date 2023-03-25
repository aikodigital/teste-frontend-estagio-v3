import { createContext, useState } from 'react';

interface ModalContextProps {
  openModal: (id: string) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalId: string | null;
}

export const ModalContext = createContext<ModalContextProps>({
  openModal: () => {},
  closeModal: () => {},
  isModalOpen: false,
  modalId: null,
});

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalId, setModalId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id: string) => {
    setModalId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalId(null);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isModalOpen, modalId }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;

export const ModalConsumer = ModalContext.Consumer;
