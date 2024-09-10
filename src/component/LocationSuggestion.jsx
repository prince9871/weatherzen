// LocationSuggestion.js
import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

const LocationSuggestion = ({ value, onChange, onSelect }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Fetch location suggestions based on user input
    if (value) {
      axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=30&appid=377ab2e13fde01fbbda2e57e31df091c`)
        .then(response => {
          const data = response.data.list;
          const suggestions = data.map(place => ({
            label: `${place.name}, ${place.sys.country}`,
            id: place.id
          }));
          setOptions(suggestions);
        })
        .catch(error => {
          console.error('Error fetching location suggestions:', error);
        });
    }
  }, [value]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Enter Location" variant="outlined" />}
      onChange={(event, newValue) => {
        if (newValue) {
          onSelect(newValue.id);
        }
      }}
      onInputChange={(event, newInputValue) => {
        onChange(newInputValue);
      }}
    />
  );
};

export default LocationSuggestion;
