import React, { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, Marker, Circle, InfoWindowF } from "@react-google-maps/api";
import POITable from "./poiTable";
import PlacesAutocomplete2 from "./PlacesAutocomplete2";
import { PollTwoTone } from "@mui/icons-material";
import POIAccordion from "./poiAccordion";
import { red, yellow, green } from '@mui/material/colors';

export default function Map2() {
    const center = useMemo(() => ({ lat: 18.1096, lng: -77.2975 }), []);
    const [selected, setSelected] = useState(null); // Use null initially
    const [selectedString, setSelectedString] = useState(null); // Use null initially
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [poi, setPoi] = useState([]);
    const [safety, setSafety] = useState(null);
    const [scores, setScores] = useState(null);
    const mapRef = useRef();
    const circlesRef = useRef([]); // Ref to store circle instances
  
    const onLoad = useCallback((map) => (mapRef.current = map), []);
  
    const handleSelect = async (newValue,newValueString) => {
      // Remove previous circles
      circlesRef.current.forEach((circle) => circle.setMap(null));
      setSelected(newValue);
      setSelectedString(newValueString)

      
      if (newValue) {

        // Fetch POI data based on selected location
        try {
          const response = await fetch(`http://127.0.0.1:3000/pois/distance/${newValue.lat}/${newValue.lng}`); // Include lat/lng in query
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          setPoi(data.pois);
          
          setSafety(null)
          if (data.safety) setSafety(data.safety);
          
          setScores(null)
          if (data.scores) setScores(data.scores) 

          // Pan and zoom to the selected location
          const map = mapRef.current;
          if (map) {
              map.panTo(newValue);
              map.setZoom(14); // Adjust zoom level as needed

              //Add circle
              myCircles.forEach((circle)=>{
                    const newCircle = new google.maps.Circle({
                        center: newValue,
                        radius: circle.radius,
                        options: circle.options,
                        map,
                    });
                    circlesRef.current.push(newCircle);
                })
          }

        } catch (error) {
          console.error("Error fetching POI data:", error);
        }
        
      }
      
    };
  
    return (
      <div style={{ position: 'relative', flexDirection: 'column', height: '100vh', width: "100vw", margin: 0, padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', backgroundColor: "white" }}>
          <PlacesAutocomplete2 setSelected={handleSelect} />
        </div>
        {selected && poi.length > 0 && (
          <div style={{ position: "absolute", top: "10%", left: "10%", zIndex: 10, width: "20%", backgroundColor: "white" }}>
                  {/* <POITable selected={selected} poi={poi} /> */}
                  <POIAccordion selected={selected} poi={poi} safety={safety} scores={scores} locationString={selectedString}/>
              
          </div>
        )}
        <div style={{ height:"100%" }}>
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
            {selected && poi.length > 0 && (
              <>
                  <Marker position={selected} />
                  {/* <Circle center={selected} radius={1000} options={closeOptions}/>
                  <Circle center={selected} radius={5000} options={middleOptions}/>
                  <Circle center={selected} radius={10000} options={farOptions}/> */}
                  {poi.map((facility, index) => (
                       <Marker
                          key={facility.name}
                          position={{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }}
                          icon={`/${markerIcons[facility.type.replace(/\s/g, '')]}.svg`}
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
  
const markerIcons = {
    Hospital: "homeHealth",
    HealthCentre: "homeHealth",
    Supermarket: "shoppingCart",
    PoliceStation:"localPolice",
    FireStation:"fireTruck",
    AmbulanceService: "ambulance",
}

const containerStyle = {
    height: "100%",
};

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
    strokeColor: green[500],
    fillColor: "#8BC34A",
};
const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0,
    strokeColor: yellow[700],
    fillColor: "#FBC02D",
};
const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0,
    strokeColor: red[500],
    fillColor: "#FF5252",
};

const myCircles = [
    {radius: 1000, options: closeOptions},
    {radius: 5000, options: middleOptions},
    {radius: 10000, options: farOptions},
]