import React, { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, Circle, InfoWindowF } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Place } from '@mui/icons-material'

const containerStyle = {
  height: "100%",
};

export default function Places8() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"], 
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 18.1096, lng: -77.2975 }), []);
  const [selected, setSelected] = useState(null); // Use null initially
  const [selectedFacility, setSelectedFacility] = useState(null);
  const mapRef = useRef();

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const handleSelect = async (newValue) => {
    setSelected(newValue);

    // Pan and zoom to the selected location
    const map = mapRef.current;
    if (map) {
        map.panTo(newValue);
        map.setZoom(14); // Adjust zoom level as needed
    }
    
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: "100vw", margin: 0, padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', backgroundColor: "white" }}>
        <PlacesAutocomplete setSelected={handleSelect} />
      </div>
      <div style={{ flex: 1 }}>
        <GoogleMap
          zoom={10}
          center={center} // Center on selected or default
          mapContainerStyle={containerStyle}
        //   disableDefaultUI={true}
        //   options={options}
          options={{
            mapId:"d821845d72367a05",
            // disableDefaultUI: true,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
          }} // Correctly set options here
          onLoad={onLoad}
        >
          {selected && (
            <>
                <Marker position={selected} />
                <Circle center={selected} radius={1000} options={closeOptions}/>
                <Circle center={selected} radius={5000} options={middleOptions}/>
                <Circle center={selected} radius={10000} options={farOptions}/>
                {poi.map((facility, index) => (
                     <Marker
                        key={facility.name}
                        position={{ lat: facility.lat, lng: facility.lng }}
                        icon={`/${markerIcons[facility.cluster]}.svg`}
                        onClick={() => setSelectedFacility(index)} // Set selected facility on click
                    >
                        {selectedFacility === index && ( // Conditionally show InfoWindow
                            <InfoWindowF
                                position={{ lat: facility.lat, lng: facility.lng }}
                                onCloseClick={() => setSelectedFacility(null)} // Close on click outside
                            >
                                    <div>
                                        <h3 style={{ color: "black" }}>{facility.name}</h3>

                                        <p style={{ color: "black" }}>{facility.type}</p> 
                                    </div>
                    
                            </InfoWindowF>
                        )}
                    </Marker>
                ))}
            </>
          )}
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
  

const markerLabel= {
    fontWeight: "bold",
    backgroundColor: "white",
    padding: "2px 5px",
    borderRadius: "3px",
}

const markerIcons = {
    healthFacility: "homeHealth",
    supermarket: "shoppingCart",
    fireStation:"fireTruck",
    police:"localPolice",
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };
  const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
  };
  const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
  };


const poi = [
    {
        name: "Spanish Town Hospital",
        cluster: "healthFacility",
        type: "Hospital",
        location: "Burke Road, Spanish Town",
        lat: 17.992668657865284, 
        lng: -76.94821501917997,
        locStatus: 1
    },
    {
        name: "Cumberland Road Health Centre",
        cluster: "healthFacility",
        type: "Health Centre",
        location: "43 Cumberland Road, Spanish Town",
        lat: 18.010571520396205, 
        lng: -76.97103096657997,
        locStatus: 2
    },
    {
        name: "Sydenham Health Centre",
        cluster: "healthFacility",
        type: "Health Centre",
        location: "36 Federal Road, Spanish Town",
        lat: 17.989396604836585, 
        lng: -76.98062656151025,
        locStatus: 1
    },
    {
        name: "St. Jago Park Health Centre",
        cluster: "healthFacility",
        type: "Health Centre",
        location: "Burke Road, Spanish Town",
        lat: 17.993026174070913, 
        lng: -76.94652471917993,
        locStatus: 1
    },
    {
        name: "Shoppers Fair Burke Road",
        cluster: "supermarket",
        type: "Supermarket",
        location: "Cnr Burke Rd, White Church St, Spanish Town",
        lat: 17.9920157287055, 
        lng: -76.95116737141721,
        locStatus: 1
    },
    {
        name: "Shopper's Fair Supermarket",
        cluster: "supermarket",
        type: "Supermarket",
        location: "92 Brunswick Ave, Spanish Town",
        lat: 18.014212643401557, 
        lng: -76.97163281988192,
        locStatus: 1
    },
    {
        name: "Hi-Lo Food Stores",
        cluster: "supermarket",
        type: "Supermarket",
        Location: "Burke Rd, Spanish Town",
        lat: 17.991115681337437, 
        lng: -76.9537772407382,
        locStatus: 1
    },
    {
        name: "St. Jago Shop N Save",
        cluster: "supermarket",
        type: "Supermarket",
        location: "St. Jago Shopping Centre Burke Road Spanish Town",
        lat: 17.991970599242382, 
        lng: -76.94988691072912,
        locStatus: 1
    },
    {
        name: "Spanish Town Police Station",
        cluster: "police",
        type: "Police Station",
        location: "3-5 Burke Rd, Spanish Town",
        lat: 17.991560219439684,  
        lng: -76.95052209541716,
        locStatus: 1
    },
    {
        name: "Spanish Town Fire Station",
        cluster: "fireStation",
        type: "Fire Station",
        location: "White Church St, Spanish Town",
        lat: 17.992283395967373,   
        lng: -76.95226211364752,
        locStatus: 1
    }
];