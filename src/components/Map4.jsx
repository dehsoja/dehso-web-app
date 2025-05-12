import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { GoogleMap, Marker, Circle, InfoWindowF } from "@react-google-maps/api";
import PlacesAutocomplete2 from "./PlacesAutocomplete2";
import PlacesAutocomplete3 from "./PlacesAutocomplete3";
import POIAccordion2 from "./poiAccordion2";
import { Typography, useMediaQuery, useTheme } from '@mui/material';
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
import { Stack } from "@mui/material";
import { Alert } from "@mui/material";
import {Link} from 'react-router-dom';
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

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
    const [learn, setLearn] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("Loading...");
    const mapRef = useRef();
    const circlesRef = useRef([]); // Ref to store circle instances
    const markersRef = useRef([]);
    const healthclustererRef = useRef(null);
    const supernmarketclustererRef = useRef(null);
    const educationclustererRef = useRef(null);
    const financeclustererRef = useRef(null);
    const emergencyservicesclustererRef = useRef(null);
    const leisureclustererRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const infoWindowRef = useRef(null); // Single InfoWindow instance
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
      // setDialogMsg("")
    };

    const handleLearnOpen = () => {
      setLearn(true);
    };

    const handleLearnClose = () => {
      setLearn(false);
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

    // Function to open/update the single InfoWindow
    const openInfoWindow = (title) => {
      const marker = markersRef.current.find((m) => m.title === title);
      const map = mapRef.current;
      if (marker && map && infoWindowRef.current) {
        // Update InfoWindow content and position
        infoWindowRef.current.setContent(marker.customData.content);
        infoWindowRef.current.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });

      }
    };

    const openInfoWindowZoom = (title) => {
      const marker = markersRef.current.find((m) => m.title === title);
      const map = mapRef.current;
      if (marker && map && infoWindowRef.current) {
        // Update InfoWindow content and position
        infoWindowRef.current.setContent(marker.customData.content);
        infoWindowRef.current.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });

        map.panTo(marker.customData.position);
        map.setZoom(25); // Adjust zoom level as needed

        setTimeout(() => {
          const element = document.getElementById(title);
          
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
  
        }, 500); // Delay of 500 milliseconds
      }
    };

    const createMarkers = (markerType,grouping) => {
      
      if(grouping[markerType]){

        const markers = grouping[markerType].map((facility, index) => {
          const marker =  new google.maps.marker.AdvancedMarkerElement({
            position:{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] },
            title: index + facility.type.replace(/\s/g, ''),
            // content: pin.element, // Use the PinElement as content
            content: createMarkerIcon(markerIconsLinks[facility.type.replace(/\s/g, '')]),
          });  
          
          // Store position and content in marker for easy access
          marker.customData = {
            position: { lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] },
            content: `<div style="color: black; padding: 10px;"><h3 id="${index + facility.type.replace(/\s/g, '')}">${facility.name}</h3><p>(${facility.type})</p></div>`,
          };
          // Add click listener to open info window
          marker.addListener("click", () => openInfoWindow(index + facility.type.replace(/\s/g, '')) );
          
          return marker;
        });
        
        return markers;
      }else{
        return [];
      }
    }

    const createMarkersByType = (markerType,markerType2,grouping) => {
      
      if(grouping[markerType] && grouping[markerType].some(facility => facility.type === markerType2)){

        const markers = grouping[markerType].filter(facility => facility.type === markerType2).map((facility, index) => {
          const marker =  new google.maps.marker.AdvancedMarkerElement({
            position:{ lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] },
            title: index + facility.type.replace(/\s/g, ''),
            // content: pin.element, // Use the PinElement as content
            content: createMarkerIcon(markerIconsLinks[facility.type.replace(/\s/g, '')]),
          });  
          
          // Store position and content in marker for easy access
          marker.customData = {
            position: { lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] },
            content: `<div style="color: black; padding: 10px;"><h3 id="${index + facility.type.replace(/\s/g, '')}">${facility.name}</h3><p>(${facility.type})</p></div>`,
          };
          // Add click listener to open info window
          marker.addListener("click", () => openInfoWindow(index + facility.type.replace(/\s/g, '')) );
          
          return marker;
        });
        
        return markers;
      }else{
        return [];
      }
    }

    const clearMapArtifacts= () => {

      // Remove previous circles
      circlesRef.current.forEach((circle) => circle.setMap(null));
        
      // Clear the clusterer
      if (healthclustererRef.current) {
        healthclustererRef.current.clearMarkers();  // This removes clustered markers
        healthclustererRef.current = null;
      }

      if (supernmarketclustererRef.current) {
        supernmarketclustererRef.current.clearMarkers();  // This removes clustered markers
        supernmarketclustererRef.current = null;
      }

      if (educationclustererRef.current) {
        educationclustererRef.current.clearMarkers();  // This removes clustered markers
        educationclustererRef.current = null;
      }

      if (financeclustererRef.current) {
        financeclustererRef.current.clearMarkers();  // This removes clustered markers
        financeclustererRef.current = null;
      }


      if (emergencyservicesclustererRef.current) {
        emergencyservicesclustererRef.current.clearMarkers();  // This removes clustered markers
        emergencyservicesclustererRef.current = null;
      }

      if (leisureclustererRef.current) {
        leisureclustererRef.current.clearMarkers();  // This removes clustered markers
        leisureclustererRef.current = null;
      }


      if (infoWindowRef.current) {
        infoWindowRef.current.close();
        infoWindowRef.current = null
      }

      markersRef.current = [];

    }

    const selectHelper = async (newValue,newValueString,data) => {
        
      try {

        //Close any open info windows
        setSelectedFacility(null);
        
        clearMapArtifacts()


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
            
            
            // Initialize single InfoWindow
            infoWindowRef.current = new google.maps.InfoWindow({
              content: "", // Start with empty content
            });
            

            
            
            const healthMarkers = createMarkers("healthFacility", grouping)

            // Cluster them using MarkerClusterer
            healthclustererRef.current = new MarkerClusterer({ 
              map, 
              markers: healthMarkers,
              renderer: new CustomClusterRenderer("./healthCluster.svg"),
            });

            const supermarketMarkers = createMarkers("supermarket", grouping)

            // Cluster them using MarkerClusterer
            supernmarketclustererRef.current = new MarkerClusterer({ 
              map, 
              markers: supermarketMarkers,
              renderer: new CustomClusterRenderer("./groceryCluster.svg"),
            });

            const educationMarkers = createMarkers("education", grouping)

            // Cluster them using MarkerClusterer
            educationclustererRef.current = new MarkerClusterer({ 
              map, 
              markers: educationMarkers,
              renderer: new CustomClusterRenderer("./educationCluster.svg"),
            });


            const financeMarkers = createMarkers("financialServices", grouping)

            // Cluster them using MarkerClusterer
            financeclustererRef.current = new MarkerClusterer({ 
              map, 
              markers: financeMarkers,
              renderer: new CustomClusterRenderer("./financeCluster.svg"),
            });

            const emergencyservicesMarkers = createMarkers("emergencyservices", grouping)

            // Cluster them using MarkerClusterer
            emergencyservicesclustererRef.current = new MarkerClusterer({ 
              map, 
              markers: emergencyservicesMarkers,
              renderer: new CustomClusterRenderer("./emergencyCluster.svg"),
            });

            const leisureMarkers = createMarkers("leisure", grouping)

            // Cluster them using MarkerClusterer
            leisureclustererRef.current = new MarkerClusterer({ 
              map, 
              markers: leisureMarkers,
              renderer: new CustomClusterRenderer("./leisureCluster.svg"),
            });

            

            markersRef.current = [...healthMarkers, ...supermarketMarkers, ...educationMarkers, ...financeMarkers, ...emergencyservicesMarkers, ...leisureMarkers];
            

        }

      } catch (error) {
        throw error;
      }
        

    }

    const faildRequestHelper = (msg) =>{
      setPoi([]);
      setGroupedPOIs([]);
      // Remove previous circles
      clearMapArtifacts();
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
        
        
        


        {selected && poi.length > 0 ? (
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
                  moveTOInfoWindow={openInfoWindowZoom}
                  learnOpen={handleLearnOpen}
                  />
              </Box>

          ) : (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%', 
                width: '100%' 
              }}
            >
              {/* <CircularProgress /> */}
              <Box marginBottom={30} sx={{ color: 'text.secondary' }}>{dialogMsg}</Box>
            </Box>
          )
        }

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

          <Dialog
            open={learn}
            onClose={handleLearnClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Dehso Community Scorecard"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <Typography  sx={{ mb: 2 }}>{"This scorecard offers a quality-of-life assessment for communities across Jamaica (currently limited to Spanish Town and Portmore) by evaluating the availability and nearness of essential services and amenities, along with local crime statistics. Each category is assigned a letter grade to give users a quick, comprehensive view of how well a community supports everyday living and lifestyle preferences."}</Typography>
              
              <Typography  sx={{ mb: 2 }}>{"Meaning of circles on map:"}</Typography>
              <Stack direction={{ sm: 'row' }} spacing={2} alignItems="flex-start">
                  <Typography variant="body2" sx={{color: green[500], fontSize: 12}} component="div">
                      - 1 km Radius
                  </Typography>
                  <Typography variant="body2" sx={{color:yellow[700], fontSize: 12}} component="div">
                      - 5 km Radius
                  </Typography>
                  <Typography variant="body2" sx={{color:red[500], fontSize: 12}} component="div">
                      - 10 km Radius
                  </Typography>
              </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLearnClose} autoFocus>
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
  MedicalServices: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1733082642/homeHealth3Marker_tku5dn.svg",
  FastFood: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1746765063/fastFoodMarker_mrhyas.svg",
  Dining: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1746897370/diningMarker_rb0edi.svg",
  Recreation: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1746902363/recreationMarker_vdxrc6.svg"

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

// Custom renderer that accepts an icon URL as a parameter
class CustomClusterRenderer {
  constructor(iconUrl) {
    this.iconUrl = iconUrl;
  }

  render({ count, position, markers }) {
    const icon = document.createElement("div");
    icon.innerHTML = `
      <img src="${this.iconUrl}" style="width: 30px; height: 30px;" />
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 12px;">
        ${count}
      </div>
    `;

    return new google.maps.marker.AdvancedMarkerElement({
      position,
      content: icon,
      zIndex: 1000,
    });
  }
}

const createMarkerIcon = (iconUrl) => {
  return document.createElement("div").appendChild(
    Object.assign(document.createElement("img"), {
      src: iconUrl,
    })
  )
}