import React, {useState, useEffect} from 'react';
import './App.css';
import allcities from './assets/city.list.json';

import SearchBox from './components/SearchBox';
import WeatherPanel from './components/WeatherPanel';



function App() {

  const url = 'https://api.openweathermap.org/data/2.5/forecast?';
  const apiKey = '21e9711869d651b73195343d41b52a78';
  const [forecast, setForecast] = useState(null);
  const [cityID, setCityID] = useState('6359304');  // initialize to Madrid
  

  // this callback runs once after first render
  useEffect( () => {
    // TODO: find current location
    // console.log( '=== process cities list ===');
    // const city = allcities.find( city => city.name == 'Madrid' );
    // console.log( city );
  }, []);

  // this callback runs 
  useEffect( () => {
    console.log( 'fetch data effect' );
    async function fetchMyAPI( ) {
      let config = {};
      const path = url + 'id=' + cityID + '&appid=' + apiKey;
      console.log( path );
      const response = await fetch( path );
      const data = await response.json();
      setForecast( { city: data.city, reports: data.list } );
      console.log( 'forecast', forecast );
    }  
    fetchMyAPI();
  }, [cityID] );

  function getForecastFor( cityname ){
    console.log( 'getForecastFor... ', cityname );
    const match = allcities.find( item => item.name == cityname );
    if( match != undefined ){
      console.log( 'match found ', match );
      setCityID( match.id );
    }
  }



  const styles = {
    blurred: {
      backgroundImage: "url(city-madrid.jpg)",
      filter: "blur(12px)",
      height: "500px",
      backgroundPosition: "center",
      backgroundSize: "cover",
    }
  }


  return (
    <div className="App">
      <div style={styles.blurred}></div>

      <div style={styles.outterPanel}></div>


      {/* { cityID && <div> {cityID} </div>} */}

      { forecast && <WeatherPanel data={forecast}></WeatherPanel> }
      <SearchBox search={getForecastFor}></SearchBox>


    </div>
  );
}

export default App;
