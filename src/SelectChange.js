import React from "react";
import Map from "./Map";
import { createRoot } from 'react-dom/client';

function SelectChange(event) {
    const selectedValue = event.target.value;
    createRoot(document.querySelector('.mapa-completo')).render(<div><Map filter={selectedValue}/></div>);

}

export default SelectChange;