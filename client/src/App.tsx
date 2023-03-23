import "../src/css/global.css";

import { Map } from "./components/Map/Map";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <section className="container">
      <Sidebar />
      <Map />
    </section>
  );
}

export default App;
