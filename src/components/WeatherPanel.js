import React, {useState, useEffect} from 'react';

import ForecastPanel from './ForecastPanel';
import Clock from './Clock';
import SearchBox from '../components/SearchBox';

import '../style/main.css';
import iconPressure from '../assets/stats-pressure.png';
import iconHumidity from '../assets/stats-humidity.png';
import iconWind from '../assets/stats-wind.png';



function WeatherPanel( props ){

    useEffect( () => {  // TODO: change to setFadeIn
        console.log( 'RERENDER - fade in bg image', document.getElementById('outer-panel').classList );
        setPanelClassList( ['fadein'] );
    }, []);

    const [panelClassList, setPanelClassList] = useState([]);

    console.log( 'weather panel props: ', props );

    const currentWeather = props.data.reports[0];
    console.log( 'current weather ', currentWeather );
    const currentTemp = (currentWeather.main.temp - 273.15).toFixed(0);
    const currentIconURL = 'http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png';


    const styles = {
        panel: {
            backgroundImage: 'url(' + props.bgURL + ')',
            backgroundPosition: "center",
            backgroundSize: "cover"
        }

    }

    return(

        <div id="outer-panel" className={panelClassList}>
            <div style={styles.panel}>
                <div id="inner-panel">

                    <div className="title">
                        <div>{props.data.city.name}</div>
                        <div id="current-time">
                            <Clock></Clock>
                        </div>
                    </div>


                    <div id="current-panel">
                        <div className="item" id="main-temp">
                            <span id="plus-sign">+</span>
                            <span id="main-temp">{currentTemp}</span>
                            <span>&deg;</span>
                        </div>
                        <div className="item" id="main-icon">
                            <img src={currentIconURL}></img>
                            <div id="main-description">{currentWeather.weather[0].main}, {currentWeather.weather[0].description}</div>
                        </div>
                        <div className="item" id="main-stats">
                            <div>
                                <img className="stats-icon" src={iconPressure}></img>
                                {currentWeather.main.pressure}mm Hg
                            </div>
                            <div>
                                <img className="stats-icon" src={iconHumidity}></img>
                                {currentWeather.main.humidity}% humidity
                            </div>
                            <div>
                                <img className="stats-icon" src={iconWind}></img>
                                {currentWeather.wind.speed}m/s 
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <ForecastPanel reports={props.data.reports}></ForecastPanel>



        </div>
    
    );
}

export default WeatherPanel;