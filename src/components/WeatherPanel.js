import React, {useState, useEffect} from 'react';
import DayForecastCard from './DayForecastCard';
import '../style/WeatherPanel.css';
import Clock from './Clock';



function WeatherPanel( props ){

    useEffect( () => {  // TODO: change to setFadeIn
        console.log( 'RERENDER - fade in bg image' );
        document.getElementById( "outterPanel" ).classList = [];
    });

    console.log( 'weather panel props: ', props );

    // group data by date - keep highest temperature 
    const days = [];
    props.data.reports.forEach( item => {
        const date = item.dt_txt.slice(0,10);
        const samedate = days.find( day => day.dt_txt.includes( date ) );
        
        if( samedate == undefined ){
            days.push( item );
        }else{
            if( item.main.temp > samedate.main.temp ){
                days.pop();
                days.push( item )
            }
        }
    });
    // console.log( days );

    const daysPanel = days.map( item => {
        return <DayForecastCard data={item}></DayForecastCard>
    });
    // console.log( daysPanel );


    const currentWeather = props.data.reports[0];
    console.log( 'current weather ', currentWeather );
    const dayNum = new Date( currentWeather.dt_txt ).getDay();
    const daysText = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = daysText[dayNum] + ', ' + currentWeather.dt_txt.slice( 0, 10 );
    const currentTemp = (currentWeather.main.temp - 273.15).toFixed(0);
    const currentIconURL = 'http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png';

    const [currentTime, setCurrentTime] = useState(new Date());

    function timer(){
        // setCurrentTime( new Date() );
    }
    setInterval( timer, 1000);

    const styles = {
        panel: {
            backgroundImage: 'url(' + props.bgURL + ')',
            backgroundPosition: "center",
            backgroundSize: "cover"
        }

    }

    return(

        <div id="outterPanel" className="hidden">
            <div style={styles.panel}>
                <div id="innerPanel">

                    <div className="title">
                        <h3>{props.data.city.name}</h3>
                        <div id="current-time">
                            <Clock></Clock>
                        </div>
                    </div>
                    <div id="current-panel">
                        <div className="item temp">
                            <span id="plus-sign">+</span>
                            <span id="main-temp">{currentTemp}</span>
                            <span>&deg;</span>
                        </div>
                        <div className="item">
                            <img id="main-icon" src={currentIconURL}></img>
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