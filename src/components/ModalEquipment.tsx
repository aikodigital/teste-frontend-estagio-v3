import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ModalContext } from '../context/ModalContext';
import { getEquipmentById } from '../utils/api';
import Table from './Table';
import ModalMap from './ModalMap';

function ModalEquipment() {
  const { closeModal, modalId } = useContext(ModalContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeModal();
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [closeModal]);

  const [equipment] = useState(getEquipmentById(modalId));

  const [nav, setNav] = useState('table');

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex h-screen w-screen items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="h-full w-full bg-white p-5 shadow sm:h-auto sm:w-[640px] sm:rounded"
        ref={ref}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className="flex justify-end">
          <button
            className="rounded bg-red-500 px-2 py-1 text-white"
            onClick={closeModal}
          >
            Fechar
          </button>
        </div>
        <h1 className="text-2xl font-bold">{equipment?.name}</h1>
        <p className="font-bold opacity-70">{equipment?.model?.name}</p>
        <div className="flex items-center">
          <p className="text-sm font-bold opacity-80">
            {equipment?.states[0].name}
          </p>
          <div
            className="m-2 h-3 w-3 rounded-full"
            style={{ backgroundColor: equipment?.states[0].color }}
          />
        </div>
        <p className="text-sm font-bold opacity-70">
          Produtividade: {equipment?.productivity.toFixed()}%
        </p>
        <p className="text-sm font-bold opacity-70">
          Ganho: R$ {equipment?.gain.toFixed(2)}
        </p>
        <div className="flex justify-center">
          <button
            className={`w-full border-b-2 p-2 ${
              nav === 'table' ? 'border-slate-500' : 'border-transparent'
            }`}
            onClick={() => setNav('table')}
          >
            Histórico
          </button>
          <button
            className={`w-full border-b-2 p-2 ${
              nav === 'map' ? 'border-slate-500' : 'border-transparent'
            }`}
            onClick={() => setNav('map')}
          >
            Mapa
          </button>
        </div>
        {nav === 'table' && (
          <Table states={equipment ? equipment.states : []} />
        )}
        {nav === 'map' && <ModalMap equipment={equipment} />}
      </motion.div>
    </motion.div>
  );
}

export default ModalEquipment;
