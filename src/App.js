import React, {useState, useEffect} from 'react';
import './App.css';
import allOWMCities from './assets/city.list.json';

import WeatherPanel from './components/WeatherPanel';
import { isTSEnumMember } from '@babel/types';
import SearchBox from './components/SearchBox';



function App() {

  const url = 'https://api.openweathermap.org/data/2.5/forecast?';
  const apiKey = '21e9711869d651b73195343d41b52a78';
  const [forecast, setForecast] = useState(null);
  const [cityID, setCityID] = useState('6359304');  // initialize openweathermap location to Madrid
  
  const [cityImages, setCityImages] = useState(null); // json array of all available cities with images
  const [bgImageCity, setBGImageCity] = useState('madrid'); // lowercase only, used to search teleport json for bg image
  const [bgImageURL, setBGImageURL] = useState('weather-default.jpg');

  // const [searchMsg, setSearchMsg] = useState(''); // show msg if no city matched in openweathermap
 

  // run this callback once as ComponentDidMount. Get json data from teleport for available city images
  useEffect( () => {
    // TODO: find current location?
    async function fetchMyAPI( ) {
      console.log( 'initial useEffect, get cities images list')
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
      console.log( 'forecast', data );
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
    // setSearchMsg('');
    
    const weathermatch = allOWMCities.find( item => 
      item.name.toLowerCase() == cityname.toLowerCase() ); // TODO: insert autocomplete?
    
    if( weathermatch != undefined ){

      // do not refresh same city search - same cityID will not trigger cityID & bgImageCity effects, resulting in blank screen
      if( weathermatch.id == cityID ){
        console.log( 'same city , do not refresh' );
        return;
      }

      // set forecast and img url to null to 'fade out' weather panel
      setForecast( null );
      setBGImageURL( null );

      console.log( 'set null owm match found ', weathermatch );
      setCityID( weathermatch.id );

      // search for bg image from teleport json list
      const imagematch = cityImages.find( item =>
        item.name.toLowerCase() == weathermatch.name.toLowerCase() );
      // console.log( imagematch );
      if( imagematch != undefined ){
        setBGImageCity( imagematch.name.replace(' ', '-').toLowerCase() ); // teleport data hyphenates city names
      }else{
        // use default city bg
        setBGImageURL('weather-default.jpg');
      }

    }else{
      // TODO: show error message - city not found
      console.log( "NOT FOUND - SHOW ERROR");
      // setSearchMsg( '*city not found' );
    }
  }


  const styles = {
    blurred: {
      backgroundImage: 'url(' + bgImageURL + ')',
      filter: "blur(12px)",
      height: "800px",
      backgroundPosition: "center",
      backgroundSize: "cover",
    }
  }


  return (

    <div className="App">

      <div style={styles.blurred} className="bg-blurred"></div>

      { forecast && bgImageURL &&
      <WeatherPanel data={forecast} bgURL={bgImageURL} search={getForecastFor}></WeatherPanel> }
      
      <SearchBox search={getForecastFor}></SearchBox>

    </div>
  );
}

export default App;
