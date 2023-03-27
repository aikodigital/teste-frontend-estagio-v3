import React from "react";

import { Routes, Route } from "react-router-dom";

import SectionMap from "../SectionMap/SectionMap";
import Equipment from "../Equipment/Equipment";
import NotFound from "../NotFound/NotFound";

function Content() {
  return (
    <main className="Content">
      <Routes>
        <Route path="/" exact element={<SectionMap />} />
        <Route path="/equip/:id" element={<Equipment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default Content;
