import React from 'react';
import '../style/forecast.css';

function DayCard( props ){

    // console.log( 'day forecast card props: ', props );
    const iconURL = 'http://openweathermap.org/img/w/' + props.data.weather[0].icon + '.png';
    const tempC = (props.data.main.temp - 273.15).toFixed(2);
    const daysText = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const day = new Date( props.data.dt_txt.slice(0,10) ).getDay();


    // TODO: change to switch statement
    function getPanelColor(){
        const id = props.data.weather[0].id.toString();
        if( id == '800' ) return ['clear']
        else if( id.startsWith( '8') ) return ['clouds']
        else return ['other']
    }
    
    // TODO: put days panel outter div here
    return(
        <div id="day-panel" className={getPanelColor()}>
            <div>{daysText[day]}</div>
            <div id="icon" className="day-icon">
                <img src={iconURL}></img>
            </div>
            <div>+{tempC}&deg;</div>
        </div>

    );


}

export default DayCard;