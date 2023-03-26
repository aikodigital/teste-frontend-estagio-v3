import React from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Content from "./components/Content/Content";

// Components
import Header from "./components/Header/Header";
//import Footer from "./components/Footer/Footer";

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
