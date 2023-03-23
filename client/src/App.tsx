import '../src/css/global.css'

import { Map } from './components/Map/Map'


function App() {

  return (
    <section className="container">
      <div className="column-left"></div>
      <div className="column-right"><Map/></div>
    </section>
  )
}

export default App
