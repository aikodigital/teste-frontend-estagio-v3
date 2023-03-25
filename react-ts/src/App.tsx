import "./App.css";

import { HelmetProvider, Helmet } from "react-helmet-async";
import L from "leaflet";
import List from "./components/List";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>teste</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
      </Helmet>
      <div className="App">
        <List/>
      </div>
    </HelmetProvider>
  );
}

export default App;
