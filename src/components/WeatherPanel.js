import React from 'react';
import '../style/WeatherPanel.css';

import DayForecastCard from './DayForecastCard';
import SearchBox from './SearchBox';


function WeatherPanel( props ){

    console.log( 'weather panel props: ', props );

    // group data by day - show highest temperature 
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
            // console.log( 'same day found: ', sameday );
            // replace if temperature higher
            // console.log( 'existing ', samedate.main.temp );
            if( item.main.temp > samedate.main.temp ){
                // console.log( 'replace with', item.main.temp );
                days.pop();
                days.push( item )
            }
        }
    });
    console.log( days );

    const daysPanel = days.map( item => {
        console.log( item );
        return <DayForecastCard data={item}></DayForecastCard>
    });
    console.log( daysPanel );

    const currentWeather = props.data.reports[0];
    const currentTemp = (currentWeather.main.temp - 273.15).toFixed(0);
    const currentIconURL = 'http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png';


    const styles = {
        panel: {
            backgroundImage: 'url(' + props.bgURL + ')',
            backgroundPosition: "center",
            // backgroundSize: "cover",
        },
        innerPanel: {
            backgroundColor: 'rgba(50, 50, 50, 0.5)',
        },
        outterPanel: {
            position: "absolute",
            width: "96%",
            left: "2%",
            top: "30px"
        } // TODO: move this to stylesheet


    }

    return(

        <div style={styles.outterPanel}>

            <div style={styles.panel}>
                <div style={styles.innerPanel}>

                    <h3>{props.data.city.name}</h3>
                    <h6> current time </h6>
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