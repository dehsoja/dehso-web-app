import './App.css'
// import MapFiddle from './components/MapFiddle';
import Places11 from './components/Places11';
import AboutUs from './components/aboutus';
import Personas from './components/personas';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



function App () {

  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Places11/>} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/personas" element={<Personas />} /> 
        </Routes>
    </BrowserRouter>
  )
    

} 

export default App
