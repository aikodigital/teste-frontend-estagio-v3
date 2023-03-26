import React from "react";

import { Routes, Route } from "react-router-dom";

import SectionMap from "../SectionMap/SectionMap";
import NotFound from "../NotFound/NotFound";

function Content() {
  return (
    <main className="Content">
      <Routes>
        <Route path="/" exact element={<SectionMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default Content;
