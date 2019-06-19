import React, {useState, useEffect} from 'react';
import './App.css';
import allcities from './assets/city.list.json';

import SearchBox from './components/SearchBox';
import WeatherPanel from './components/WeatherPanel';



function App() {

  const url = 'https://api.openweathermap.org/data/2.5/forecast?';
  const apiKey = '21e9711869d651b73195343d41b52a78';
  const [forecast, setForecast] = useState(null);
  const [cityID, setCityID] = useState('6359304');  // initialize location to Madrid
  
  const [cityImages, setCityImages] = useState(null); // list of all available cities with images for background
  const [bgImageCity, setBGImageCity] = useState('Madrid'); // initialize location to Madrid
  const [bgImageURL, setBGImageURL] = useState('city-madrid.jpg');

  // this callback runs only once after first render, similar to componentDidMount
  useEffect( () => {
    // TODO: find current location?
    async function fetchMyAPI( ) {
      console.log( 'initial useEffect, get cities list')
      const path = 'https://api.teleport.org/api/urban_areas/';
      console.log( path );
      const response = await fetch( path );
      const data = await response.json();
      setCityImages( data._links["ua:item"] );
    }
    fetchMyAPI();
  }, []);

  // this callback runs 
  useEffect( () => {
    console.log( 'fetch data effect' );
    async function fetchMyAPI( ) {
      const path = url + 'id=' + cityID + '&appid=' + apiKey;
      console.log( path );
      const response = await fetch( path );
      const data = await response.json();
      setForecast( { city: data.city, reports: data.list } );
      console.log( 'forecast', forecast );
    }  
    fetchMyAPI();
  }, [cityID] );


  useEffect( () => {
    console.log( '=== UPDATE IMAGE BG ===' );
    async function fetchMyAPI( ) {
      const path = 'https://api.teleport.org/api/urban_areas/slug:' + bgImageCity + '/images/';
      console.log( bgImageCity );
      const response = await fetch( path );
      const data = await response.json();
      console.log( 'BG IMG', data );
      console.log( data.photos[0].image.web );
      // change bg image url link
      if( data.photos[0].image.web != undefined ){
        setBGImageURL( data.photos[0].image.web );
      }

    }  
    fetchMyAPI();
  }, [bgImageCity] );



  function getForecastFor( cityname ){
    console.log( 'getForecastFor... ', cityname );
    const weathermatch = allcities.find( item => item.name.toLowerCase() == cityname.toLowerCase() ); // TODO: insert autocomplete
    if( weathermatch != undefined ){
      console.log( 'match found ', weathermatch );
      setCityID( weathermatch.id );

      // update bg image
      const imagematch = cityImages.find( item => item.name.toLowerCase() == weathermatch.name.toLowerCase() );
      console.log( 'CITY IMAGES MATCH ', imagematch.name );
      setBGImageCity( imagematch.name.replace(' ', '-').toLowerCase() );

    }
  }


  const styles = {
    blurred: {
      backgroundImage: 'url(' + bgImageURL + ')',
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

      { forecast && <WeatherPanel data={forecast} bgURL={bgImageURL}></WeatherPanel> }
      <SearchBox search={getForecastFor}></SearchBox>


    </div>
  );
}

export default App;
