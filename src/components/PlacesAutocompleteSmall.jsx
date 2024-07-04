import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


// Component for places autocomplete
export default function PlacesAutocompleteSmall({ setSelected }) {
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
          setSelected({ lat, lng },newValue);
        } else {
          // Handle the case where the selected location is not in Jamaica
          alert("Please select a location within Jamaica.");
          setValue(""); // Clear the input field
          setSelected(null,null); // Clear the selected location
        }
      }
    };
  
    return (
      <Autocomplete
        id="places-autocomplete"
        freeSolo
        sx={{ width: 200 }}
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
