import React from 'react';
import '../style/DayForecastCard.css';

function DayForecastCard( props ){

    // console.log( 'day forecast card props: ', props );
    const iconURL = 'http://openweathermap.org/img/w/' + props.data.weather[0].icon + '.png';
    const tempC = (props.data.main.temp - 273.15).toFixed(2);
    const daysText = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = new Date( props.data.dt_txt.slice(0,10) ).getDay();
    return(
        <div className="day-panel">
        <h3>{daysText[day]}</h3>
        <img src={iconURL}></img>
        <h3>+{tempC}&deg;</h3>




        </div>

    );


}

export default DayForecastCard;