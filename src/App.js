import React, {useState, useEffect} from 'react';
import axios from 'axios';
import allOWMCities from './assets/city.list.json'; // list of all cities from open weather map

import './App.css';
import WeatherPanel from './components/WeatherPanel';
import SearchBox from './components/SearchBox';



function App() {

  // Open Weather Map (OWM) API - get 5 day forecast by city
  const url = 'https://api.openweathermap.org/data/2.5/forecast?';
  // const url = 'https://api.openweathermap.org/data/2.5/forecastxxx?';

  const apiKey = '21e9711869d651b73195343d41b52a78';
  const [forecast, setForecast] = useState( null );
  const [cityID, setCityID] = useState( '6359304' ); // initialize OWM location to Madrid
  
  // Teleport API - get image for city
  const teleportURL = 'https://api.teleport.org/api/urban_areas/';
  // const teleportURL = 'https://api.teleport.org/api/urban_areasxxx/';

  const [cityImages, setCityImages] = useState([]); // all available cities with images, initialised to prevent null ref
  const [bgImageCity, setBGImageCity] = useState( 'madrid' ); // lowercase only, used to search teleport json for bg image
  const [bgImageURL, setBGImageURL] = useState( null ); // if no teleport match, show default
  const [bgClassList, setBGClassList ] = useState([]); // animate alpha for 'fade out' effect
  const bgDefaultURL = 'weather-default.jpg';

  const [msg, setMsg] = useState('');
  const [error, setError] = useState( null );
 

  /*
  run this callback once only similar to ComponentDidMount 
  get json data from teleport for list of available city images
  */
  useEffect( () => {
    async function fetchMyAPI( ) {
      try{
        const result = await axios( teleportURL );
        // console.log( 'teleport result ', result );
        setCityImages( result.data._links["ua:item"] );
      }catch(error){
        setError( error );
      }
    }
    fetchMyAPI() 
  }, []);


  /*
  search OWM
  called once upon initial render and every time cityID changes
  */
  useEffect( () => {
    async function fetchMyAPI( ) {
      try{
        
        const path = url + 'id=' + cityID + '&appid=' + apiKey;
        const result = await axios( path );
        setForecast( { city: result.data.city, reports: result.data.list } );
        // console.log( 'OWM results ==> ', result.data );

      }catch( error ){
        setError( error );
      }
    }  
    fetchMyAPI();
  }, [cityID] );


  /* 
  search teleport
  called once upon initial render and then every time bgImageCity changes
  */
  useEffect( () => {
    async function fetchMyAPI( ) {
      const path = teleportURL + 'slug:' + bgImageCity + '/images/';
      try{
          const result = await axios( path );
          // update bg url
          if( result.data.photos[0].image.web !== undefined ){
            setBGImageURL( result.data.photos[0].image.web );
          }else{
            setBGImageURL( bgDefaultURL );
          }
      }catch(error){
        setError( error );
      }

    }  
    if( bgImageCity != null ){
      fetchMyAPI();
    }
  }, [bgImageCity] );


  /*
  bg images begin with 0 opacity
  play fade in animation on rerender
  */
  useEffect( () => {
    setBGClassList( ['fadein'] );
  }, [bgImageURL]);


  function getForecastFor( cityname ){
    console.log( 'getForecastFor... ', cityname );
    setMsg('');
    
    const weathermatch = allOWMCities.find( item => 
      item.name.toLowerCase() === cityname.toLowerCase() );
    
    if( weathermatch !== undefined ){

      /*
      do not refresh same city search - 
      same cityID will not trigger cityID & bgImageCity effects, 
      resulting in blank screen
      */
      if( weathermatch.id === cityID ){ return; }

      // need this reset to simulate fade in animation
      setForecast( null );
      setBGImageURL( null );


      setCityID( weathermatch.id ); // this triggers search OWM useEffect 

      // see if we have image for this city in teleport cities list
      setBGImageCity( null );
      const teleportmatch = cityImages.find( item =>
        item.name.toLowerCase() === weathermatch.name.toLowerCase() );
      if( teleportmatch !== undefined ){
        /*
        this triggers teleport image search
        teleport data hyphenates city names with multiple words
        */
        setBGImageCity( teleportmatch.name.replace(' ', '-').toLowerCase() ); 
      }else{
        setBGImageURL( bgDefaultURL );
      }
    }else{
      setMsg( '* no city with this name found' );
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

      <div style={styles.blurred} id="blurred-bg" className={bgClassList}></div>
      
      { forecast && bgImageURL &&
      <WeatherPanel data={forecast} bgURL={bgImageURL} search={getForecastFor}></WeatherPanel> }

      <SearchBox search={getForecastFor} msg={msg}></SearchBox>

      <div id="error">
          { error && error.message}
      </div>

    </div>
  );
}

export default App;
