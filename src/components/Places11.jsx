import React from "react";
import { useLoadScript} from "@react-google-maps/api";
import Map3 from "./Map3";



export default function Places11() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"], 
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map3 />;
}


  



