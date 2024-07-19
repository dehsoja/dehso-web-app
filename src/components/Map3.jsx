import React, { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, Marker, Circle, InfoWindowF, MarkerClusterer } from "@react-google-maps/api";
import PlacesAutocomplete2 from "./PlacesAutocomplete2";
import POIAccordion2 from "./poiAccordion2";
import { useMediaQuery, useTheme } from '@mui/material';
import { red, yellow, green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Header from "./header";
import PlacesAutocompleteSmall from "./PlacesAutocompleteSmall";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import {Link} from 'react-router-dom';

export default function Map3() {
    const center = useMemo(() => ({ lat: 18.1096, lng: -77.2975 }), []);
    const [selected, setSelected] = useState(null); // Use null initially
    const [selectedString, setSelectedString] = useState(null); // Use null initially
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [poi, setPoi] = useState([]);
    const [groupedPOIs, setGroupedPOIs] = useState([]);
    const [safety, setSafety] = useState(null);
    const [scores, setScores] = useState(null);
    const [open, setOpen] = useState(false);
    const mapRef = useRef();
    const circlesRef = useRef([]); // Ref to store circle instances
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  
    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSelect = async (newValue,newValueString) => {
      // Remove previous circles
      circlesRef.current.forEach((circle) => circle.setMap(null));
      setSelected(newValue);
      setSelectedString(newValueString)

      
      if (newValue) {
        // Fetch POI data based on selected location
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/pois/distance/${newValue.lat}/${newValue.lng}`); // Include lat/lng in query
          if (!response.ok) {
            setPoi([]);
            setGroupedPOIs([]);
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          setPoi(data.pois);
          const grouping = data.pois.reduce((groups, facility) => {
              (groups[facility.category] = groups[facility.category] || []).push(facility);
              return groups;
          }, {});
          setGroupedPOIs(grouping)
          
          setSafety(null)
          if (data.safety) setSafety(data.safety);
          
          setScores(null)
          if (data.scores) setScores(data.scores) 

          // Pan and zoom to the selected location
          const map = mapRef.current;
          if (map) {
              map.panTo(newValue);
              map.setZoom(12); // Adjust zoom level as needed

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
          setPoi([]);
          setGroupedPOIs([]);
          console.error("Error fetching POI data:", error);
        }
        
      }
      
    };
  
    return (
      <div style={{ position: "relative", flexDirection: "column", height: "100vh", width: "100vw", margin: 0, padding: 0, backgroundColor: "white" }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
          {/* <PlacesAutocomplete2 setSelected={handleSelect} /> */}
          <Header 
            places={<PlacesAutocomplete2 setSelected={handleSelect} coverageWarn={handleClickOpen}/>} 
            placesSmall={<PlacesAutocompleteSmall setSelected={handleSelect} coverageWarn={handleClickOpen} />}
          >

          </Header>
        </Box>
        
        <Link to="/about">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  
            <Alert severity="warning" sx={{ width: '100%'}}>
              This is a proof of concept. Click to learn more.
            </Alert>
          </Box>
        </Link>


        {selected && poi.length > 0 && (
          <Box
            sx={{
              position: isSmallScreen ? 'static' : 'absolute',
              top: isSmallScreen ? 0 : "17%",
              left: isSmallScreen ? 0 : "10%",
              zIndex: 10,
              width: isSmallScreen ? '95%' : "20%",
              backgroundColor: "white",
              margin: isSmallScreen ? theme.spacing(1) : theme.spacing(5), // Add margin for small screens
            }}
          >
            <POIAccordion2 selected={selected} groupedPOIs= {groupedPOIs} safety={safety} scores={scores} locationString={selectedString}/>
          </Box>
        )}

        <Box sx={{ height: "100%" }}>
          <GoogleMap
              zoom={10}
              center={center} // Center on selected or default
              mapContainerStyle={containerStyle}
            //   disableDefaultUI={true}
            //   options={options}
              options={{
                mapId:import.meta.env.VITE_MAP_ID,
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

                    
                    {/* Health Cluster */}
                    {groupedPOIs["healthFacility"] && (
                      <MarkerClusterer
                        options={{
                          styles: [
                            {
                              url: "./healthCluster.svg", 
                              width: 30,
                              height: 30,
                              textColor: 'white', // Adjust text color if needed
                              textSize: 12 
                            },
                          ],
                        }}
                      >
                      
                        {(clusterer) =>
                          groupedPOIs["healthFacility"].map((facility, index) => (
                              
                              <Marker
                                  key={facility.name}
                                  position={{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }}
                                  clusterer={clusterer} 
                                  icon={`/${markerIcons[facility.type.replace(/\s/g, '')]}.svg`}
                                  onClick={() => setSelectedFacility((index + "healthFacility"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "healthFacility") && ( // Conditionally show InfoWindow
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
                          ))
                        }
                      </MarkerClusterer>
                    )}
                    
                    {/* Grocery Cluster */}
                    {groupedPOIs["supermarket"] && (
                      <MarkerClusterer
                        options={{
                          styles: [
                            {
                              url: "./groceryCluster.svg", 
                              width: 30,
                              height: 30,
                              textColor: 'white', // Adjust text color if needed
                              textSize: 12 
                            },
                          ],
                        }}
                      >
                      
                        {(clusterer) =>
                          groupedPOIs["supermarket"].map((facility, index) => (
                              
                              <Marker
                                  key={facility.name}
                                  position={{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }}
                                  clusterer={clusterer} 
                                  icon={`/${markerIcons[facility.type.replace(/\s/g, '')]}.svg`}
                                  onClick={() => setSelectedFacility((index + "supermarket"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "supermarket") && ( // Conditionally show InfoWindow
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
                          ))
                        }
                      </MarkerClusterer>
                    )}

                    {/* Education Cluster */}
                    {groupedPOIs["education"] && (
                      <MarkerClusterer
                        options={{
                          styles: [
                            {
                              url: "./educationCluster.svg", 
                              width: 30,
                              height: 30,
                              textColor: 'white', // Adjust text color if needed
                              textSize: 12 
                            },
                          ],
                        }}
                      >
                      
                        {(clusterer) =>
                          groupedPOIs["education"].map((facility, index) => (
                              
                              <Marker
                                  key={facility.name}
                                  position={{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }}
                                  clusterer={clusterer} 
                                  icon={`/${markerIcons[facility.type.replace(/\s/g, '')]}.svg`}
                                  onClick={() => setSelectedFacility((index + "education"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "education") && ( // Conditionally show InfoWindow
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
                          ))
                        }
                      </MarkerClusterer>
                    )}

                    {/* Financial Services Cluster */}
                    {groupedPOIs["financialServices"] && (
                      <MarkerClusterer
                        options={{
                          styles: [
                            {
                              url: "./financeCluster.svg", 
                              width: 30,
                              height: 30,
                              textColor: 'white', // Adjust text color if needed
                              textSize: 12 
                            },
                          ],
                        }}
                      >
                      
                        {(clusterer) =>
                          groupedPOIs["financialServices"].map((facility, index) => (
                              
                              <Marker
                                  key={facility.name}
                                  position={{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }}
                                  clusterer={clusterer} 
                                  icon={`/${markerIcons[facility.type.replace(/\s/g, '')]}.svg`}
                                  onClick={() => setSelectedFacility((index + "financialServices"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "financialServices") && ( // Conditionally show InfoWindow
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
                          ))
                        }
                      </MarkerClusterer>
                    )}

                    {/* Emergency Services Cluster */}
                    {groupedPOIs["emergencyservices"] && (
                      <MarkerClusterer
                        options={{
                          styles: [
                            {
                              url: "./emergencyCluster.svg", 
                              width: 30,
                              height: 30,
                              textColor: 'white', // Adjust text color if needed
                              textSize: 12 
                            },
                          ],
                        }}
                      >
                      
                        {(clusterer) =>
                          groupedPOIs["emergencyservices"].map((facility, index) => (
                              
                              <Marker
                                  key={facility.name}
                                  position={{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }}
                                  clusterer={clusterer} 
                                  icon={`/${markerIcons[facility.type.replace(/\s/g, '')]}.svg`}
                                  onClick={() => setSelectedFacility((index + "emergencyservices"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "emergencyservices") && ( // Conditionally show InfoWindow
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
                          ))
                        }
                      </MarkerClusterer>
                    )}


                    
                </>
              )}
            </GoogleMap>
        </Box>
        
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Warning"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please search for a location within Spanish Town, Jamaica.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        
      </div>

    );
}
  
const markerIcons = {
    Hospital: "homeHealth3",
    HealthCentre: "homeHealth3",
    Supermarket: "shoppingCart4",
    PoliceStation:"localPolice2",
    FireStation:"fireTruck2",
    AmbulanceService: "ambulance2",
    HighSchool:"school4",
    ATM:"atm2",
    CommercialBank: "bank3"
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