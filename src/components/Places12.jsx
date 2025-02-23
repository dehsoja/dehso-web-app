//version: 12
//To accept verified location name as url parameter from new landing page

import React from "react";
import { useLoadScript} from "@react-google-maps/api";
import { useParams } from 'react-router-dom';
import Map4 from "./Map4";



export default function Places12() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"], 
  });
  const { name } = useParams();

  if (!isLoaded) return <div>Loading...</div>;
  
  return <Map4 nameParam={name} />;
  
}


  



