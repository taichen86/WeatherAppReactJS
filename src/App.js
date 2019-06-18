import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { async } from 'q';
import SearchBox from './components/SearchBox';


function App() {

  const url = 'https://api.openweathermap.org/data/2.5/forecast?id=1851632';
  const url2 = 'https://api.openweathermap.org/data/2.5/weather?id=2172797';
  const apiKey = '21e9711869d651b73195343d41b52a78';
  const [forecast, setForecast] = useState(null);
  
  // userEffect called after page re-renders, putting [] limits to first time, like component did mount
  useEffect( async () => {
    console.log( 'useEffect' );
    const response = await fetch( url + '&appid=' + apiKey ); // TODO: generic fetch function
    const data = await response.json();
    console.log( data );  
    const city = data.city;
    console.log( 'city', city );
    const reports = data.list;
    console.log( 'reports ', reports );

    setForecast( { city: city, reports: reports } );
  }, [] );

  function getForecastFor( city ){
    console.log( 'getForecastFor... ', city );

  }

  return (
    <div className="App">



      { forecast && <div> {forecast.city.name} </div>}
      <SearchBox search={getForecastFor}></SearchBox>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

    </div>
  );
}

export default App;
