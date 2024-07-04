import React, { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const containerStyle = {
  height: "100%",
};

export default function Places6() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"], 
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 18.0179, lng: -76.8099 }), []);
  const [selected, setSelected] = useState(null); // Use null initially
  const mapRef = useRef();

  const options = (
    () => ({
    //   mapId: "x",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const handleSelect = async (newValue) => {
    if (newValue) {
      const results = await getGeocode({ address: newValue });
      const { lat, lng } = await getLatLng(results[0]);

      if (results[0].address_components.some(component => component.short_name === "JM")) {
        setSelected({ lat, lng });

        // Pan and zoom to the selected location
        const map = mapRef.current;
        if (map) {
          map.panTo({ lat, lng });
          map.setZoom(14); // Adjust zoom level as needed
        }
      } else {
        alert("Please select a location within Jamaica.");
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: "100vw", margin: 0, padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', backgroundColor: "white" }}>
        <PlacesAutocomplete setSelected={handleSelect} />
      </div>
      <div style={{ flex: 1 }}>
        <GoogleMap
        //   ref={mapRef} // Add ref to access map instance
          zoom={10}
          center={center} // Center on selected or default
          mapContainerStyle={containerStyle}
        //   disableDefaultUI={true}
        //   options={options}
          options={{
            mapId:"d821845d72367a05",
            // disableDefaultUI: true,
            clickableIcons: false,
          }} // Correctly set options here
          onLoad={onLoad}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
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
      if (newValue) {
        setValue(newValue, false);
        clearSuggestions();
        const results = await getGeocode({ address: newValue });
        const { lat, lng } = await getLatLng(results[0]);
  
        setSelected(newValue); // Set the selected value before checking if it's in Jamaica
        // Check if the selected location is within Jamaica
        if (results[0].address_components.some(component => component.short_name === "JM")) {
          setSelected({ lat, lng });
        } else {
          // Handle the case where the selected location is not in Jamaica
          alert("Please select a location within Jamaica.");
          setValue(""); // Clear the input field
          setSelected(null); // Clear the selected location
        }
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
  
