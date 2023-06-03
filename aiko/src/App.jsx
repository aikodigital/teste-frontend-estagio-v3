import React from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Content from "./components/Content/Content";

import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
