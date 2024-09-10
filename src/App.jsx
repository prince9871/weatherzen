import Loader from "./component/Loader";
import WeatherApp from "./component/WeatherApp"
import React, { useEffect, useState } from 'react'


function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader /> // Ab yeh Loader component use ho raha hai
      ) : (

      <WeatherApp/>
      
    )}
    </>
  )
}

export default App
