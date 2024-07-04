import React, { useState, useMemo, useRef, useCallback } from "react"; // Import React hooks
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"; // Google Maps components
import usePlacesAutocomplete, { // Places autocomplete hook
  getGeocode, // Geocoding function (address to coordinates)
  getLatLng, // Function to get lat/lng from geocoding result
} from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const containerStyle = {
    // width: "500px", 
    height: "100%",
};

// Main component to handle API loading
export default function Places4() {
  const { isLoaded } = useLoadScript({ // Load the Google Maps script
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY, // API key (from environment variable)
    libraries: ["places"], // Load the Places library for autocomplete
    mapIds: ['4d9b25e8266eef75'] 
  });

  if (!isLoaded) return <div>Loading...</div>; // Show loading message while API loads
  return <Map />; // Render the Map component when loaded
}

// Map component
function Map() {
  const center = useMemo(() => ({ lat: -34.397, lng: 150.644 }), []); // Initial map center (Spanish Town, Jamaica)
  const [selected, setSelected] = useState(null); // State to hold the selected location coordinates
  const mapRef = useRef();

  // Callback to handle panning when a place is selected
  const handlePanToLocation = useCallback((coordinates) => {
    mapRef.current?.panTo(coordinates);
  }, []);

  return (

    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: "100vw",  margin: 0, padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', backgroundColor:"white" }}>
            <PlacesAutocomplete setSelected={setSelected} onSelect={handlePanToLocation} /> {/* Search bar for places */}
        </div>
        <div style={{ flex: 1 }}>
            <GoogleMap // Google Map component
                zoom={10} // Initial zoom level
                center={selected || center} // Center of the map
                mapContainerStyle={containerStyle}
                // mapContainerClassName="map-container" // CSS class for the map container
                ref={mapRef}
                // mapId="4d9b25e8266eef75"
            >
                {selected && <Marker position={selected} />} {/* Render marker if location selected */}
            </GoogleMap>
        </div>
    </div>
   
//    <>
        
//       <div className="places-container"> 
//         <PlacesAutocomplete setSelected={setSelected} /> {/* Search bar for places */}
//       </div>

//       <GoogleMap // Google Map component
//         zoom={10} // Initial zoom level
//         center={center} // Center of the map
//         mapContainerStyle={containerStyle}
//         // mapContainerClassName="map-container" // CSS class for the map container
//       >
//         {selected && <Marker position={selected} />} {/* Render marker if location selected */}
//       </GoogleMap>
//     </>
  );
}

// Component for places autocomplete
const PlacesAutocomplete = ({ setSelected, onSelect }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
        // componentRestrictions: { country: "jm" }, // Restrict to Jamaica
    });

    const handleSelect = async (event, newValue) => {
        // Ensure newValue is not null before proceeding
        if (newValue) {
          setValue(newValue, false);
          clearSuggestions();
          const results = await getGeocode({ address: newValue });
          const { lat, lng } = await getLatLng(results[0]);
          setSelected({ lat, lng });

          // Call the onSelect callback to trigger panning
          onSelect({ lat, lng });

        }
    };
    // const handleSelect = async (event, newValue) => {
    //   // Ensure newValue is not null before proceeding
    //   if (newValue) {
    //     setValue(newValue, false);
    //     clearSuggestions();
    //     const results = await getGeocode({ address: newValue });
    //     const { lat, lng } = await getLatLng(results[0]);
  
    //     // Check if the selected location is within Jamaica
    //     if (results[0].address_components.some(component =>
    //         component.short_name === "JM"
    //     )) {
    //       setSelected({ lat, lng });
    //     } else {
    //       // Handle the case where the selected location is not in Jamaica
    //       alert("Please select a location within Jamaica.");
    //       setValue(""); // Clear the input field
    //     }
    //   }
    // };
  
    return (
      <Autocomplete
        id="places-autocomplete"
        sx={{ width: 300 }}
        getOptionLabel={(option) => 
          typeof option === 'string' ? option : option.description 
        }
        filterOptions={(x) => x}
        options={status === "OK" ? data : []}
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
