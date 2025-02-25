//Version: 3
// Make size dynamic, limit funtionality to validating place name then returning formatted address
import React from "react";
import { useNavigate } from "react-router-dom";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";


// Component for places autocomplete
export default function PlacesAutocomplete3({coverageWarn, cusWidth = false}) {
    
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
        const { lat, lng } = await getLatLng(results[0]);
  
        
          try {
          
            // Check if the selected location is within Jamaica
            if (!(results[0].address_components.some(component => component.short_name === "JM" )) ) throw new Error("404");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/pois/scoreable/${lat}/${lng}`); // Include lat/lng in query
            
            if (!response.ok) throw new Error(response.status);

            
            const newStr = newValue.replaceAll(" ", "+");
            const newStr2 = newStr.replaceAll(",", "-");
    
            
            navigate(`/${newStr2}`);
            
          } catch (error) {

            // Handle the case where the selected location is not in Jamaica
            if (error.message == "404"){
              coverageWarn("Please search for a location within Spanish Town or Portmore, Jamaica.");
            }else{
              coverageWarn("There was an error please try again later.");
            }
            
            setValue(""); // Clear the input field
            
          }

        
      }
    };
  
    return (
      <Autocomplete
        id="places-autocomplete"
        freeSolo
        sx={{ width: cusWidth ? cusWidth : { xs: "90vw", sm: "90vw", md: "40vw", lg: "40vw", xl: "40vw" } }}
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
