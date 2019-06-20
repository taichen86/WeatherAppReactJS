import React from 'react';
import '../style/forecast.css';

function DayCard( props ){
    // console.log( 'day forecast card props: ', props );

    const iconURL = 'http://openweathermap.org/img/w/' + props.data.weather[0].icon + '.png';
    const tempC = (props.data.main.temp - 273.15).toFixed(2);
    const daysText = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const day = new Date( props.data.dt_txt.slice(0,10) ).getDay();


    function getPanelColor(){
        const id = props.data.weather[0].id.toString();
        if( id === '800' ){ return 'clear'; } 
        else if( id.startsWith( '8') ){ return 'clouds'; } 
        else { return 'other'; } 
    }
    
    return(
        <div id="day-panel" className={getPanelColor()}>
            <div>{daysText[day]}</div>
            <div className="day-icon">
                <img className="icon" src={iconURL} alt="icon"></img>
            </div>
            <div>+{tempC}&deg;</div>
        </div>

    );


}

export default DayCard;