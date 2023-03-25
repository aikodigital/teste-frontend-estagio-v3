import React, { useState } from "react";
import Popup from "./Popup";

export default function ListItem(props: any) {
  const [PopupState, setPopupState] = useState(false);

  return (
    <>
      <button onClick={() => setPopupState(!PopupState)} className=" bg-slate-800 rounded-xl w-4/5 grid place-items-center min-h-[6rem] transform ease-in-out transition duration-700 hover:bg-slate-700">
        {props.equipamento.name}
      </button>
      <Popup trigger={PopupState} setTrigger={setPopupState} equipamento={props.equipamento} />
    </>
  );
}
