import React from "react";
import { useLoadScript} from "@react-google-maps/api";
import Map2 from "./Map2";



export default function Places10() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"], 
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map2 />;
}


  



