import './App.css'
// import MapFiddle from './components/MapFiddle';
// import Places11 from './components/Places11';
import Places12 from './components/Places12';
import AboutUs from './components/aboutus';
import Personas from './components/personas';
import Landing from './components/landing';
import TestMe from './components/TestMe';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



function App () {

  
  return (
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Places11/>} /> */}
          <Route path="/" element={<Landing/>} />
          {/* <Route path="/new" element={<Places12/>} /> */}
          {/* <Route path="/:name" element={<Places11/>} /> */}
          <Route path="/:name" element={<Places12/>} />
          {/* <Route path="/new/:name" element={<Places12/>} /> */}
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/personas" element={<Personas />} /> 
          <Route path="/landing" element={<Landing />} /> 
          <Route path="/testme" element={<TestMe />} /> 
        </Routes>
    </BrowserRouter>
  )
    

} 

export default App
