import React from 'react';
import Map2 from './Map2';
import { createRoot } from 'react-dom/client';
import Map from './Map';


function Button(equip, lista) {
    const x = lista.findIndex(obj => obj.key === equip);
    const Retorna = () =>{
        createRoot(document.querySelector('.mapa-completo')).render(<div><Map filter={null}/></div>);
      }
    return (
        createRoot(document.querySelector('.mapa-completo')).render(<Map2 Retorna={Retorna} equipmentId={equip} marker={lista[x]}/>)
    )
}
 export default Button;