import { useRef, useState } from 'react';
import { GoogleMap, Circle,useJsApiLoader, Marker, Data, Polygon } from '@react-google-maps/api';

const libraries = ["geometry"];
const r = [5000, 10000, 15000]
const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 10,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
};



export default function MapFiddle() {
  const circleRef = useRef(null);

  const greenAcre = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Green Acres (Approximate)"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-76.964941, 17.988159],
              [-76.964941, 17.990159],
              [-76.962941, 17.990159],
              [-76.962941, 17.988159],
              [-76.964941, 17.988159]
            ]
          ]
        }
      }
    ]
  }

  const { isLoaded } = useJsApiLoader({
    id: "d821845d72367a05",
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries,
  });

  const [center, setCenter] = useState({ lat: 17.99505850985258, lng: -76.97601318207117  }); // Initial location (Spanish Town)
  const [radius] = useState(5 * 1609.34); // 5 miles in meters
  const circlesRef = useRef([]); // Ref to store circle instances
  const mapRef = useRef(null);


  const handleMove = () => {
    // Remove previous circles
    circlesRef.current.forEach((circle) => circle.setMap(null));

    const newCenter = google.maps.geometry.spherical.computeOffset(
      center,
      radius,
      90 
    );
    setCenter(newCenter);

    // Add new circle
    const map = mapRef.current;
    if (map) {
        r.forEach((radius)=>{
            const newCircle = new google.maps.Circle({
                center: newCenter,
                radius,
                options: defaultOptions,
                map,
            });
            circlesRef.current.push(newCircle);
        })
        
        const dataLayer = new google.maps.Data({ map });
        dataLayer.addGeoJson(greenAcre);
        dataLayer.setStyle({
          fillColor: 'blue',
          fillOpacity: 0.2,
          strokeColor: 'blue',
          strokeWeight: 2
        });

        // ... (your existing circle creation logic) ...

        // Add the data layer to the map
        dataLayer.setMap(map);
       
    } else {
      console.error("Map not loaded yet.");
    }
  };

  const removeCircle = () => {
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }
  };

  return isLoaded ? (
    <div style={{height: "50vh", width: "100vw"}}>

        <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={center}
        zoom={14}
        onLoad={map => mapRef.current = map} // Store map instance
      >
        <Marker position={center} />
          <Polygon
            paths={jacarandBound}
            options={polygonOptions}
          />
        
        {/* {circleRef.current && (
            <>
                <Circle center={center} radius={1000} />
                <Circle center={center} radius={10000} />
            </>
        )} */}
      </GoogleMap>
      <button onClick={handleMove}>Move East 5 Miles</button>
    </div>
  ) : (
    <div>Loading...</div> // Or a loading indicator
  );

}

const containerStyle = {
    height: "100%",
};

const HomesteadBoundary = [
  {lat: 17.9947684472217, lng: -76.9773492828666},
  {lat: 17.9939965049119, lng: -76.9770147456987},
  {lat: 17.9933619025611, lng: -76.9767635223069},
  {lat: 17.9925405859155, lng: -76.9766174615971},
  {lat: 17.9919425434499, lng: -76.976482438679},
  {lat: 17.9911786283466, lng: -76.9764068116805},
  {lat: 17.9913509280115, lng: -76.9748846412594},
  {lat: 17.9915020377607, lng: -76.9740128678495},
  {lat: 17.9919205438653, lng: -76.9731938207679},
  {lat: 17.992273975038, lng: -76.9723145985452},
  {lat: 17.9925407920337, lng: -76.9713205674857},
  {lat: 17.9926997239807, lng: -76.9707037863533},
  {lat: 17.9951705006864, lng: -76.9714597514123},
  {lat: 17.9951700874543, lng: -76.9722554940415},
  {lat: 17.9955175586933, lng: -76.9728756192101},
  {lat: 17.9952731166931, lng: -76.9735500909125},
  {lat: 17.9950249500285, lng: -76.9740770191399},
  {lat: 17.9949310393425, lng: -76.9746834308876},
  {lat: 17.9947870240305, lng: -76.9752674302861},
  {lat: 17.9946956506124, lng: -76.9759299289916},
  {lat: 17.9948689976497, lng: -76.976961508175},
  {lat: 17.9947684472217, lng: -76.9773492828666},
  // ... more coordinates as needed
];

const jacarandBound = [
  {lat: 17.9840872244711, lng: -76.9987802642642},
  {lat: 17.9771700335384, lng: -76.9997296221852},
  {lat: 17.9772595136313, lng: -76.9988925348412},
  {lat: 17.9774841414448, lng: -76.9978615489038},
  {lat: 17.9777982493512, lng: -76.9959934756224},
  {lat: 17.9792732601948, lng: -76.9960055241885},
  {lat: 17.9803019088812, lng: -76.9955160689248},
  {lat: 17.981027337052, lng: -76.9956754294059},
  {lat: 17.9817149885125, lng: -76.996011446098},
  {lat: 17.9823425238096, lng: -76.9965125167776},
  {lat: 17.9834819669951, lng: -76.9961888428917},
  {lat: 17.9850688831464, lng: -76.9965869014772},
  {lat: 17.9840872244711, lng: -76.9987802642642},
]

const polygonOptions = {
  fillColor: "blue",
  fillOpacity: 0,
  strokeColor: "black",
  strokeOpacity: 1,
  strokeWeight: 2,
};