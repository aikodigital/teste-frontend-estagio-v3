import { useContext, useEffect } from 'react';
import { ModalContext } from '../context/ModalContext';
import {
  getEquipmentById,
  getEquipmentModelById,
  getStatesByEquipmentId,
} from '../utils/api';

function ModalEquipment() {
  const { closeModal, modalId } = useContext(ModalContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!modalId) return null;

  const equipment = getEquipmentById(modalId);
  const model = getEquipmentModelById(equipment.equipmentModelId);
  const states = getStatesByEquipmentId(modalId);

  return (
    <div className="fixed inset-0 z-[99999] flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="w-96 rounded bg-white p-5 shadow">
        <div className="flex justify-end">
          <button
            className="rounded bg-red-500 px-2 py-1 text-white"
            onClick={closeModal}
          >
            Fechar
          </button>
        </div>
        <h1 className="text-2xl font-bold">{equipment.name}</h1>
        <p className="font-bold opacity-70">{model.name}</p>
        <div className="flex items-center">
          <p className="text-sm font-bold opacity-80">{states[0].name}</p>
          <div
            className="m-2 h-3 w-3 rounded-full"
            style={{ backgroundColor: states[0].color }}
          />
        </div>
        <div className="h-60 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="text-left">Data</th>
                <th className="text-left">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {states.map((state) => (
                <tr
                  key={state.id}
                  className="divide-x divide-gray-300 odd:bg-gray-200"
                >
                  <td>{new Date(state.date).toLocaleDateString()}</td>
                  <td>{state.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ModalEquipment;
