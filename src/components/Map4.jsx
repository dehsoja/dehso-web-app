import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker, Circle, InfoWindowF, MarkerClusterer } from "@react-google-maps/api";
import PlacesAutocomplete2 from "./PlacesAutocomplete2";
import PlacesAutocomplete3 from "./PlacesAutocomplete3";
import POIAccordion2 from "./poiAccordion2";
import { useMediaQuery, useTheme } from '@mui/material';
import { red, yellow, green, purple } from '@mui/material/colors';
import { Box } from "@mui/material";
import Header from "./header";
import PlacesAutocompleteSmall from "./PlacesAutocompleteSmall";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Alert } from "@mui/material";
import {Link} from 'react-router-dom';
import { getGeocode, getLatLng } from "use-places-autocomplete";

export default function Map3({nameParam}) {
    const center = useMemo(() => ({ lat: 18.1096, lng: -77.2975 }), []);
    const [selected, setSelected] = useState(null); // Use null initially
    const [selectedString, setSelectedString] = useState(null); // Use null initially
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [poi, setPoi] = useState([]);
    const [groupedPOIs, setGroupedPOIs] = useState([]);
    const [safety, setSafety] = useState(null);
    const [scores, setScores] = useState(null);
    const [open, setOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("");
    const mapRef = useRef();
    const circlesRef = useRef([]); // Ref to store circle instances
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  
    useEffect(() => {
      
      const newStr = nameParam.replaceAll("+"," ");
      const newStr2 = newStr.replaceAll("-",",");
    
      const fetchData = async () => {

        try {

          const results = await getGeocode({ address: newStr2 });
          const { lat, lng } = await getLatLng(results[0]);
          const formatedAd = results[0].formatted_address; 

          // Check if the selected location is within Jamaica
          
          if (results[0].address_components.some(component => component.short_name === "JM" ) ) {
            handleSelect({ lat, lng },newStr2) 
            
          } else {
            throw new Error("Not Jamaica")
            
          }
          
        } catch (error) {
          // Handle the case where the selected location is not in Jamaica
          handleWarning("Please search for a location within Spanish Town or Portmore, Jamaica.")
            
          handleSelect(null,null); // Clear the selected location
          
        }
        
      };
  
      fetchData();
      
      

    }, [nameParam]);

    const onLoad = useCallback((map) => (mapRef.current = map), []);


    const handleWarning = (msg) => {
      setDialogMsg(msg)
      setOpen(true);
    };

    const handleResponseStatusWarning = (status) => {
      if (status === "404"){
        setDialogMsg("Please search for a location within Spanish Town or Portmore, Jamaica.")
      }else{
        setDialogMsg("There was an error please try again later.")
      }
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setDialogMsg("")
    };

    const moveTOInfoWindow = (windowName, lat, lng) => {
      
      setSelectedFacility(windowName)
      const map = mapRef.current;
      if (map) {
          map.panTo({lat: lat, lng: lng});
          map.setZoom(25); // Adjust zoom level as needed
      }

      setTimeout(() => {
        const element = document.getElementById(windowName);
        
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }

      }, 500); // Delay of 500 milliseconds
      
    }

    const selectHelper = async (newValue,newValueString,data) => {
        
      try {

        //Close any open info windows
        setSelectedFacility(null);
        // Remove previous circles
        circlesRef.current.forEach((circle) => circle.setMap(null));
        setSelected(newValue);
        setSelectedString(newValueString)
        
        setPoi([]);
        setGroupedPOIs([]);
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
        throw error;
      }
        

    }

    const faildRequestHelper = (msg) =>{
      setPoi([]);
      setGroupedPOIs([]);
      // Remove previous circles
      circlesRef.current.forEach((circle) => circle.setMap(null));
      handleResponseStatusWarning(msg)
    }
  
    const handleSelect = async (newValue,newValueString) => {
       
      
      if (newValue) {
        // Fetch POI data based on selected location
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/pois/distance/${newValue.lat}/${newValue.lng}`); // Include lat/lng in query
          if (!response.ok) {
            throw new Error(response.status);
          }

          const data = await response.json();


          if(data.pois.length < 1 || data["scores"] === undefined) throw new Error("404");
          
          await selectHelper(newValue, newValueString, data)
          

        } catch (error) {
          faildRequestHelper(error.message)
          // console.log("Error fetching POI data:", error);
        }
        
      }
      
    };

  
    return (
      <div style={{ position: "relative", flexDirection: "column", height: "100vh", width: "100vw", margin: 0, padding: 0, backgroundColor: "white" }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
          {/* <PlacesAutocomplete2 setSelected={handleSelect} /> */}
          <Header 
            places={<PlacesAutocomplete3 coverageWarn={handleWarning} preScoreabilityCheck={false}  />} 
            placesSmall={<PlacesAutocomplete3 coverageWarn={handleWarning} cusWidth={260} preScoreabilityCheck={false} />}
          >

          </Header>
        </Box>
        
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  
          <Alert severity="info" sx={{ width: '100%'}}>
            Coverage: Spanish Town and Portmore, Jamaica.
          </Alert>
        </Box> */}
        


        {selected && poi.length > 0 && (
          <Box
            sx={{
              position: isSmallScreen ? 'static' : 'absolute',
              top: isSmallScreen ? 0 : "8%",
              left: isSmallScreen ? 0 : "5%",
              zIndex: 10,
              width: isSmallScreen ? '95%' : "25%",
              backgroundColor: "white",
              margin: isSmallScreen ? theme.spacing(1) : theme.spacing(5), // Add margin for small screens
            }}
          >
            <POIAccordion2 
              selected={selected} 
              groupedPOIs= {groupedPOIs} 
              safety={safety} 
              scores={scores} 
              locationString={selectedString}
              moveTOInfoWindow={moveTOInfoWindow}
            />
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
                                  icon={markerIconsLinks[facility.type.replace(/\s/g, '')]}
                                  onClick={() => setSelectedFacility((index + "healthFacility"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "healthFacility") && ( // Conditionally show InfoWindow
                                      <InfoWindowF
                                          position={{ lat: facility.lat, lng: facility.lng }}
                                          onCloseClick={() => setSelectedFacility(null)} // Close on click outside
                                      >
                                              <div style={{ color: "black", padding: '10px' }}>
                                                  <h3 id={index + "healthFacility"}>{facility.name}</h3>
          
                                                  <p>({facility.type})</p> 
                                                  {/* <p>{facility.address}</p>  */}
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
                                  icon={markerIconsLinks[facility.type.replace(/\s/g, '')]}
                                  onClick={() => setSelectedFacility((index + "supermarket"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "supermarket") && ( // Conditionally show InfoWindow
                                      <InfoWindowF
                                          position={{ lat: facility.lat, lng: facility.lng }}
                                          onCloseClick={() => setSelectedFacility(null)} // Close on click outside
                                      >
                                              <div style={{ color: "black", padding: '10px' }}>
                                                  <h3 id={index + "supermarket"}>{facility.name}</h3>
          
                                                  <p>({facility.type})</p> 
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
                                  icon={markerIconsLinks[facility.type.replace(/\s/g, '')]}
                                  onClick={() => setSelectedFacility((index + "education"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "education") && ( // Conditionally show InfoWindow
                                      <InfoWindowF
                                          position={{ lat: facility.lat, lng: facility.lng }}
                                          onCloseClick={() => setSelectedFacility(null)} // Close on click outside
                                      >
                                              <div style={{ color: "black", padding: '10px' }}>
                                                  <h3 id={index + "education"}>{facility.name}</h3>
          
                                                  <p>({facility.type})</p> 
                                              </div>
                              
                                      </InfoWindowF>
                                  )}
                              </Marker>
                          ))
                        }
                      </MarkerClusterer>
                    )}

                    {/* ATM Financial Services Cluster */}
                    {(groupedPOIs["financialServices"] && groupedPOIs["financialServices"].filter(facility => facility.type === "ATM").length > 0) && (
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
                          groupedPOIs["financialServices"].filter(facility => facility.type === "ATM").map((facility, index) => (
                              
                              <Marker
                                  key={facility.name}
                                  position={{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }}
                                  clusterer={clusterer} 
                                  icon={markerIconsLinks[facility.type.replace(/\s/g, '')]}
                                  onClick={() => setSelectedFacility((index + "ATM"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "ATM") && ( // Conditionally show InfoWindow
                                      <InfoWindowF
                                          position={{ lat: facility.lat, lng: facility.lng }}
                                          onCloseClick={() => setSelectedFacility(null)} // Close on click outside
                                      >
                                              <div style={{ color: "black", padding: '10px' }}>
                                                  <h3 id={index + "ATM"}>{facility.name}</h3>
          
                                                  <p>({facility.type})</p> 
                                              </div>
                              
                                      </InfoWindowF>
                                  )}
                              </Marker>
                          ))
                        }
                      </MarkerClusterer>
                    )}

                    {/* Commercial Bank Financial Services Cluster */}
                    {(groupedPOIs["financialServices"] && groupedPOIs["financialServices"].filter(facility => facility.type === "Commercial Bank").length > 0) && (
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
                          groupedPOIs["financialServices"].filter(facility => facility.type === "Commercial Bank").map((facility, index) => (
                              
                              <Marker
                                  key={facility.name}
                                  position={{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }}
                                  clusterer={clusterer} 
                                  icon={markerIconsLinks[facility.type.replace(/\s/g, '')]}
                                  onClick={() => setSelectedFacility((index + "Commercial Bank"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "Commercial Bank") && ( // Conditionally show InfoWindow
                                      <InfoWindowF
                                          position={{ lat: facility.lat, lng: facility.lng }}
                                          onCloseClick={() => setSelectedFacility(null)} // Close on click outside
                                      >
                                              <div style={{ color: "black", padding: '10px' }}>
                                                  <h3 id={index + "Commercial Bank"}>{facility.name}</h3>
          
                                                  <p>({facility.type})</p> 
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
                                  icon={markerIconsLinks[facility.type.replace(/\s/g, '')]}
                                  onClick={() => setSelectedFacility((index + "emergencyservices"))} // Set selected facility on click
                              >
                                  {selectedFacility === (index + "emergencyservices") && ( // Conditionally show InfoWindow
                                      <InfoWindowF
                                          position={{ lat: facility.lat, lng: facility.lng }}
                                          onCloseClick={() => setSelectedFacility(null)} // Close on click outside
                                      >
                                              <div style={{ color: "black", padding: '10px' }}>
                                                  <h3 id={index + "emergencyservices"}>{facility.name}</h3>
          
                                                  <p>({facility.type})</p> 
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
                {dialogMsg}
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
  
// const markerIcons = {
//     Hospital: "homeHealth3",
//     HealthCentre: "homeHealth3",
//     Supermarket: "shoppingCart4",
//     PoliceStation:"localPolice2",
//     FireStation:"fireTruck2",
//     AmbulanceService: "ambulance2",
//     HighSchool:"school4",
//     ATM:"atm2",
//     CommercialBank: "bank3",
//     MedicalServices: "homeHealth3"
// }

const markerIconsLinks = {
  Hospital: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1733082642/homeHealth3Marker_tku5dn.svg",
  HealthCentre: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1733082642/homeHealth3Marker_tku5dn.svg",
  Supermarket: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1732999713/shoppingCartMarker_hutvj4.svg",
  PoliceStation:"https://res.cloudinary.com/dubn0hzzi/image/upload/v1732999139/localPoliceMarker_kf5opd.svg",
  FireStation:"https://res.cloudinary.com/dubn0hzzi/image/upload/v1732999714/fireTruckMarker_m6zlwi.svg",
  AmbulanceService: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1732999715/ambulanceMarker_sbtt34.svg",
  HighSchool:"https://res.cloudinary.com/dubn0hzzi/image/upload/v1732999713/schoolMarker_bmdtbk.svg",
  ATM:"https://res.cloudinary.com/dubn0hzzi/image/upload/v1732999715/atmMarker_iobt3q.svg",
  CommercialBank: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1732999715/bankMarker_plcgdc.svg",
  MedicalServices: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1733082642/homeHealth3Marker_tku5dn.svg"
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