import React, { useState } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function PlacesAutocomplete3() {
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    apiKey: import.meta.env.VITE_MAP_KEY, // Your API key
  });

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue); 
  };
 
  const handleOptionChange = (event, newValue) => {
    if (newValue) {
      setValue(newValue.description, false);
      clearSuggestions(); 
      // Optionally, fetch detailed place information (geocode, etc.) here
    } else {
      setValue('', false);
    }
  };

  return (
    <Autocomplete
      freeSolo
      value={value}
      onChange={handleOptionChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={status === 'OK' ? data : []}
      getOptionLabel={(option) => option.description}
      renderInput={(params) => (
        <TextField {...params} label="Search for a place..." variant="outlined" />
      )}
    />
  );
}

export default PlacesAutocomplete3;