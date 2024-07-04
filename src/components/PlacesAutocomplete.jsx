import React, { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import TextField from "@mui/material/TextField";

function PlacesAutocomplete({ onPlaceSelected }) {
  const [searchInput, setSearchInput] = useState("");

  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"], // Make sure the Places library is loaded
  });

  const onPlaceChanged = (_, place) => {
    if (place) {
      onPlaceSelected(place); // Call the callback when a place is selected
    }
  };

  return isLoaded ? (
    <Autocomplete
      onLoad={(autocomplete) => autocomplete.setFields(["geometry"])} // Load necessary fields
      onPlaceChanged={onPlaceChanged}
      inputValue={searchInput}
      onInputChange={(_, newInputValue) => setSearchInput(newInputValue)}
      renderInput={(params) => (
        <TextField {...params} label="Search for places..." fullWidth />
      )}
    />
  ) : (
    <div>Loading Autocomplete...</div> // Show a loading message while the API loads
  );
}

export default PlacesAutocomplete;
