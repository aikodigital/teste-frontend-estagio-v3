import React, {useState} from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Landing from './pages/Landing/Landing';

export default function App() {
  const [isDashLoaded, setDashLoaded] = useState(false)

  return <>
  {isDashLoaded ?
    <Dashboard/>
    :
    <Landing setDashLoaded={setDashLoaded}/>
  }
  </>
}