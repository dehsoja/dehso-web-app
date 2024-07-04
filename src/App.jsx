import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map";
import Places4 from './components/Places4';
import Places5 from './components/Places5';
import Places6 from './components/Places6';
import Places7 from './components/Places7';
import MapComponent from './components/Pantest';
import Places8 from './components/Places8';
import Places9 from './components/Places9';
import Places10 from './components/Places10';
import MapFiddle from './components/MapFiddle';
import Places11 from './components/Places11';
import AboutUs from './components/aboutus';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

function App () {

  // console.log(import.meta.env.VITE_MAP_KEY)
  
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey:import.meta.env.VITE_MAP_KEY,
  //   libraries: ["places"],
  // });

  // if (!isLoaded) return <div>Loading...</div>;
  
  // return (
  //   <div style={{height: "100vh", width: "100vh"}}>
  //       <Map />
  //   </div>
    
  // );

  // return <Map />
  // return <Places4/>
  // return <Places5/>
  // return <Places6/> //best so far
  // return <Places7/>
  // return <MapComponent/>
  // return <Places8/>
  // return <Places9/>
  // return <Places10/>
  // return <Places11/>
  // return <MapFiddle/>
  // return <AboutUs/>

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Places11/>} />
          <Route path="/about" element={<AboutUs />} /> 
        </Routes>
    </BrowserRouter>
  )
    

} 

export default App
