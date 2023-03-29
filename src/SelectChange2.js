import React from "react";
import Map from "./Map";
import Map2 from "./Map2";
import { createRoot } from 'react-dom/client';

function SelectChange2(event) {
    const selectedValue = event.target.value;
    if (selectedValue === 'todos') {
        createRoot(document.querySelector('.mapa-completo')).render(<div><Map filter={null}/></div>)
    } else {
        const Retorna = () =>{
            createRoot(document.querySelector('.mapa-completo')).render(<div><Map filter={null}/></div>);
          }
        createRoot(document.querySelector('.mapa-completo')).render(<Map2 Retorna={Retorna} equipmentId={selectedValue}/>)
    }    
}
export default SelectChange2;