import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker  } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function MapComponent() {
  

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"], 
    //  libraries: ["marker"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;

  
}

function Map(){
    const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
    const mapRef = useRef(null);

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const handleClick = () => {
        const newCenter = { lat: 18.0179, lng: -76.8099 }; // Jamaica
        setCenter(newCenter); 

        if (mapRef.current) {
        mapRef.current.panTo(newCenter); // Smoothly pan to new location
        }
    };

    const handleClick2 = (newVal) => {
        const newCenter = newVal; // Jamaica
        setCenter(newCenter); 

        if (mapRef.current) {
        mapRef.current.panTo(newCenter); // Smoothly pan to new location
        }
    };

    return (
        <div>
        <button onClick={handleClick}>Move to New York</button>
        <PlacesAutocomplete setSelected={handleClick2}/>
            <GoogleMap
            mapContainerStyle={{ height: "100vh", width: "100vw" }}
            center={center}
            zoom={10}
            onLoad={onLoad}
            >
                <Marker position={center} /> {/* Add Marker component */}
            </GoogleMap>
     
        </div>
    );

}


// Component for places autocomplete
const PlacesAutocomplete = ({ setSelected }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
      componentRestrictions: { country: "jm" }, // Restrict to Jamaica
    });
  
    const handleSelect = async (event, newValue) => {
        // Ensure newValue is not null before proceeding
        // setSelected({ lat: 18.0179, lng: -76.8099 });
        console.log("New Value:");
        console.log(newValue);
        if (newValue) {
          console.log("New Value End:");
          setValue(newValue, false);
          clearSuggestions();
          const results = await getGeocode({ address: newValue });
          const { lat, lng } = await getLatLng(results[0]);
          setSelected({ lat, lng });

          // Call the onSelect callback to trigger panning
          onSelect({ lat, lng });

        }
    };
  
    return (
      <Autocomplete
        id="places-autocomplete"
        sx={{ width: 300 }}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={status === "OK" ? data.map(item => item.description) : []}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={handleSelect}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search an address" variant="outlined" />
        )}
      />
    );
};
