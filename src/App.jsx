import './App.css'
import Map from "./components/Map";
import MapFiddle from './components/MapFiddle';
import Places11 from './components/Places11';
import AboutUs from './components/aboutus';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



function App () {

  
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
