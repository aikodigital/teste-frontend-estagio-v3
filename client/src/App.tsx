import "../src/css/global.css";

import { Map } from "./components/Map/Map";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <section className="container">
      <Sidebar />
      <Map lat={-19.192595} lon={-46.061072} />
    </section>
  );
}

export default App;
