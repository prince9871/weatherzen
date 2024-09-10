import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Card, CardContent, Grid, Switch, FormControlLabel } from '@mui/material';
import AnimatedWeatherIcon from 'react-animated-weather';
import axios from 'axios';
import './WeatherApp.css'; // Add your custom CSS for animations
import { BiCloud } from 'react-icons/bi';

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
  const [backgroundClass, setBackgroundClass] = useState(''); // For setting background animation

  const API_KEY = '377ab2e13fde01fbbda2e57e31df091c';

  const fetchWeather = (unit) => {
    if (!location) return;

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${API_KEY}`;

    axios.get(URL)
      .then(response => {
        const data = response.data;
        const weatherData = {
          location: data.name,
          temperature: data.main.temp,
          conditionId: data.weather[0].id,
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        };
        setWeather(weatherData);

        // Update background class based on weather condition
        setBackgroundClass(getBackgroundClass(data.weather[0].id));
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const handleSearch = () => {
    fetchWeather(unit);
  };

  const handleUnitChange = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    fetchWeather(newUnit);
  };

  const getWeatherIcon = (conditionId) => {
    switch (true) {
      case conditionId >= 200 && conditionId < 300:
        return <AnimatedWeatherIcon icon="RAIN" color="#2196f3" size={100} animate={true} />;
      case conditionId >= 300 && conditionId < 500:
        return <AnimatedWeatherIcon icon="SLEET" color="#2196f3" size={100} animate={true} />;
      case conditionId >= 500 && conditionId < 600:
        return <AnimatedWeatherIcon icon="RAIN" color="#2196f3" size={100} animate={true} />;
      case conditionId >= 600 && conditionId < 700:
        return <AnimatedWeatherIcon icon="SNOW" color="#2196f3" size={100} animate={true} />;
      case conditionId >= 700 && conditionId < 800:
        return <AnimatedWeatherIcon icon="FOG" color="#2196f3" size={100} animate={true} />;
      case conditionId === 800:
        return <AnimatedWeatherIcon icon="CLEAR_DAY" color="#fdd835" size={100} animate={true} />;
      case conditionId > 800:
        return <AnimatedWeatherIcon icon="CLOUDY" color="#757575" size={100} animate={true} />;
      default:
        return <AnimatedWeatherIcon icon="CLOUDY" color="#757575" size={100} animate={true} />;
    }
  };

  const getBackgroundClass = (conditionId) => {
    switch (true) {
      case conditionId >= 200 && conditionId < 300:
        return 'stormy';
      case conditionId >= 300 && conditionId < 500:
        return 'rainy';
      case conditionId >= 500 && conditionId < 600:
        return 'rainy';
      case conditionId >= 600 && conditionId < 700:
        return 'snowy';
      case conditionId >= 700 && conditionId < 800:
        return 'foggy';
      case conditionId === 800:
        return 'clear';
      case conditionId > 800:
        return 'cloudy';
      default:
        return '';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`weather-app ${backgroundClass} glass-container`}>
        <StyledAppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <BiCloud style={{ marginRight: '8px', fontSize: '2rem' }} /> WeatherZen
            </Typography>
          </Toolbar>
        </StyledAppBar>
        <Container >
          <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }} >
            <Grid item xs={12} md={8}>
              <Card className="glass-container">
                <CardContent >
                  <Container>
                    <TextField
                      label="Enter Location"
                      variant="outlined"
                      fullWidth
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: '10px' }}
                      onClick={handleSearch}
                    >
                      Get Weather
                    </Button>
                  </Container>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={unit === 'imperial'}
                        onChange={handleUnitChange}
                        name="unitSwitch"
                      />
                    }
                    label={unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
                    style={{ marginTop: '10px' }}
                  />
                  {weather && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <Typography variant="h4">{weather.location}</Typography>
                      <WeatherIcon>
                        {getWeatherIcon(weather.conditionId)}
                      </WeatherIcon>
                      <Typography variant="h6">
                        {weather.temperature}° {unit === 'metric' ? 'C' : 'F'}
                      </Typography>
                      <Typography variant="subtitle1">{weather.condition}</Typography>
                      <Typography variant="subtitle2">Humidity: {weather.humidity}%</Typography>
                      <Typography variant="subtitle2">Wind Speed: {weather.windSpeed} m/s</Typography>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default WeatherApp;
