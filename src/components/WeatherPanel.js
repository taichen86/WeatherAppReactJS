import React, {useState, useEffect} from 'react';

import ForecastPanel from './ForecastPanel';
import Clock from './Clock';

import '../style/main.css';
import iconPressure from '../assets/stats-pressure.png';
import iconHumidity from '../assets/stats-humidity.png';
import iconWind from '../assets/stats-wind.png';



function WeatherPanel( props ){
    // console.log( 'weather panel props: ', props );

    /* 
    weather panel starts with 0 opacity.
    add 'fadein' class upon initial render to trigger css fade in animation.
    */
    const [panelClassList, setPanelClassList] = useState([]);
    useEffect( () => { 
        setPanelClassList( ['fadein'] );
    }, []);

    
    const currentWeather = props.data.reports[0];
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

                    <div id="title">
                        <div>{props.data.city.name}</div>
                        <div id="time-now">
                            <Clock></Clock>
                        </div>
                    </div>


                    <div id="current-panel">
                        <div className="item" id="main-temp">
                            <span id="plus-sign">+</span>
                            <span id="main-temp">{currentTemp}</span>
                            <span>&deg;</span>
                        </div>
                        <div className="item" id="main-condition">
                            <img id="main-icon" src={currentIconURL} alt="icon"></img>
                            <div id="main-description">{currentWeather.weather[0].main}, {currentWeather.weather[0].description}</div>
                        </div>
                        <div className="item" id="main-stats">
                            <div className="stat-row">
                                <img className="stats-icon" src={iconPressure} alt="pressure"></img>
                                {currentWeather.main.pressure}mm Hg
                            </div>
                            <div className="stat-row">
                                <img className="stats-icon" src={iconHumidity} alt="humidity"></img>
                                {currentWeather.main.humidity}% humidity
                            </div>
                            <div className="stat-row">
                                <img className="stats-icon" src={iconWind} alt="wind"></img>
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