import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
// import ComboBox from "./TestCombo";
import BasicButtons from "./TestButtons";
import PlacesAutocomplete3 from "./Places3";

const containerStyle = {
    // width: "100%", 
    height: "100%",
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

export default function Map() {
    
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    
    const handlePlaceSelected = (place) => {
        if (place && place.geometry) {
          setCenter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
    };

    // return (
    //     <div style={{height: "100vh", width: "100vw"}}>
    //         <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
    //             <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
    //                 {/* Child components, such as markers, info windows, etc. */}
    //                 <Marker position={center} />
    //             </GoogleMap>
    //         </LoadScript>

    //     </div>
        
    // );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: "100vw",  margin: 0, padding: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', backgroundColor:"white" }}>
                {/* <PlacesAutocomplete onPlaceSelected={handlePlaceSelected} /> */}
                {/* <ComboBox></ComboBox> */}
                {/* <BasicButtons></BasicButtons> */}
                <PlacesAutocomplete3/>
            </div>
            <div style={{ flex: 1 }}>
                <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY}>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                        {/* Child components, such as markers, info windows, etc. */}
                        <Marker position={center} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
        
    );
}