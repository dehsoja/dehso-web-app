//Version: 3
// Make size dynamic, limit funtionality to validating place name then returning formatted address
import React from "react";
import { useNavigate } from "react-router-dom";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";


// Component for places autocomplete
export default function PlacesAutocomplete3({coverageWarn}) {
    
    const navigate = useNavigate();

    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete({
      componentRestrictions: { country: "JM" }, // Restrict to Jamaica
    });
  
    const handleSelect = async (event, newValue) => {
      // Ensure newValue is not null before proceeding
      if (newValue) {
        setValue(newValue, false);
        clearSuggestions();
        const results = await getGeocode({ address: newValue });
        const formatedAd = results[0].formatted_address; 
  
        // Check if the selected location is within Jamaica
        if (
          results[0].address_components.some(component => component.short_name === "JM" ) 
          
        ) {

          console.log(newValue);
          const newStr = newValue.replaceAll(" ", "+");
          const newStr2 = newStr.replaceAll(",", "-");
          console.log(newStr2)
          navigate(`/${newStr2}`);
        
        } else {
          // Handle the case where the selected location is not in Jamaica
          coverageWarn("Please search for a location within Spanish Town or Portmore, Jamaica.");
          setValue(""); // Clear the input field
          // setSelected(null); // Clear the selected location
        }
      }
    };
  
    return (
      <Autocomplete
        id="places-autocomplete"
        freeSolo
        sx={{ width: { xs: "90vw", sm: "90vw", md: "40vw", lg: "40vw", xl: "40vw" } }}
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
