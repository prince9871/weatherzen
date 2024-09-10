import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Card, CardContent, Grid, Switch, FormControlLabel } from '@mui/material';
import { WiDaySunny, WiRain, WiSnow, WiCloudy } from 'react-icons/wi';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
}));

const WeatherIcon = styled('div')(({ theme }) => ({
  fontSize: '4rem',
  marginBottom: theme.spacing(2),
}));

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = '377ab2e13fde01fbbda2e57e31df091c';

  const handleSearch = () => {
    if (!location) return;

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${unit}`;

    axios.get(URL)
      .then(response => {
        const data = response.data;
        const weatherData = {
          location: data.name,
          temperature: data.main.temp,
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        };
        setWeather(weatherData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const handleUnitChange = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    handleSearch();
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Rain':
        return <WiRain />;
      case 'Snow':
        return <WiSnow />;
      default:
        return <WiCloudy />;
    }
  };

  const getSuggestions = (value) => {
    const URL = `https://api.teleport.org/api/cities/?search=${value}`;
    axios.get(URL)
      .then(response => {
        const citySuggestions = response.data._embedded['city:search-results'].map(city => city.matching_full_name);
        setSuggestions(citySuggestions);
      })
      .catch(error => {
        console.error('Error fetching city suggestions:', error);
      });
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setLocation(suggestionValue);
  };

  const inputProps = {
    placeholder: 'Enter location',
    value: location,
    onChange: (e, { newValue }) => setLocation(newValue)
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6">Weather App</Typography>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={(suggestion) => suggestion}
              renderSuggestion={(suggestion) => <span>{suggestion}</span>}
              inputProps={inputProps}
              onSuggestionSelected={onSuggestionSelected}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ mt: 2 }}>
              Search
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={unit === 'imperial'} onChange={handleUnitChange} />}
              label={unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
            />
          </Grid>
          {weather && (
            <Grid item xs={12}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {weather.location}
                  </Typography>
                  <WeatherIcon>{getWeatherIcon(weather.condition)}</WeatherIcon>
                  <Typography variant="h2">
                    {weather.temperature}°{unit === 'metric' ? 'C' : 'F'}
                  </Typography>
                  <Typography variant="h6">{weather.condition}</Typography>
                  <Typography variant="body1">Humidity: {weather.humidity}%</Typography>
                  <Typography variant="body1">Wind Speed: {weather.windSpeed} m/s</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default WeatherApp;
