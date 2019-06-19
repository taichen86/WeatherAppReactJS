import React, {useState, useEffect} from 'react';

import '../style/WeatherPanel.css';

import DayForecastCard from './DayForecastCard';
import { isProperty } from '@babel/types';


function WeatherPanel( props ){

    // const [isFading, setIsFading] = useState(true); // fade in panel upon render
    useEffect( () => { 
        console.log( 'RERENDER - fade in bg image' );
        document.getElementById( "outterPanel" ).classList = [];
    });

    console.log( 'weather panel props: ', props );

    // group data by date - show highest temperature 
    const days = [];
    props.data.reports.forEach( item => {
        // console.log( 'doing ... ', item );
         const date = item.dt_txt.slice(0,10);
        // console.log( date );
        const samedate = days.find( day => day.dt_txt.includes( date ) );
        // new day
        if( samedate == undefined ){
            days.push( item );
        }else{
            if( item.main.temp > samedate.main.temp ){
                // console.log( 'replace with', item.main.temp );
                days.pop();
                days.push( item )
            }
        }
    });
    // console.log( days );

    const daysPanel = days.map( item => {
        // console.log( item );
        return <DayForecastCard data={item}></DayForecastCard>
    });
    // console.log( daysPanel );

    const currentWeather = props.data.reports[0];
    console.log( 'current weather ', currentWeather );
    const currentDate = new Date( currentWeather.dt_txt ).getDay() + ', ' + currentWeather.dt_txt;
    const currentTemp = (currentWeather.main.temp - 273.15).toFixed(0);
    const currentIconURL = 'http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png';

    const styles = {
        panel: {
            backgroundImage: 'url(' + props.bgURL + ')',
            backgroundPosition: "center"
           
        },
        innerPanel: { // TODO: move this to stylesheet
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
        }
  

    }

    return(

        <div id="outterPanel" className="hidden">
            <div style={styles.panel}>
                <div style={styles.innerPanel}>

                    <div className="title">
                        <h3>{props.data.city.name}</h3>
                        <h6> 

                        </h6>
                    </div>
                    <div className="current-panel">
                        <div className="item temp"><span>+</span><span className="text-large">{currentTemp}</span><span>&deg;</span></div>
                        <div className="item icon">
                            <img src={currentIconURL}></img>
                            <div className="main">{currentWeather.weather[0].main}, {currentWeather.weather[0].description}</div>
                        </div>
                        <div className="item">
                            <div>{currentWeather.main.pressure}mm Hg</div>
                            <div>{currentWeather.main.humidity}% humidity</div>
                            <div>{currentWeather.wind.speed}m/s </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="days-panel">
                {daysPanel}
            </div> 



        </div>
    



    );


}

export default WeatherPanel;