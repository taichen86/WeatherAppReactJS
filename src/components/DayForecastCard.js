import React from 'react';
import '../style/DayForecastCard.css';

function DayForecastCard( props ){

    console.log( 'day forecast card props: ', props );
    const iconURL = 'http://openweathermap.org/img/w/' + props.data.weather[0].icon + '.png';
    const tempC = (props.data.main.temp - 273.15).toFixed(2);
    const daysText = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = new Date( props.data.dt_txt.slice(0,10) ).getDay();


    function getPanelColor(){
        const id = props.data.weather[0].id.toString();
        if( id == '800' ) return ['clear']
        else if( id.startsWith( '8') ) return ['clouds']
        else return ['other']
    }
    
    return(
        <div id="day-panel" className={getPanelColor()}>
            <h3>{daysText[day]}</h3>
            <div id="icon" >
                <img src={iconURL}></img>
            </div>
            <h3>+{tempC}&deg;</h3>
        </div>

    );


}

export default DayForecastCard;