import React from 'react';
import DayCard from './DayCard';
import '../style/forecast.css';

function ForecastPanel( props ){

        // console.log( 'ForecastPanel props ==> ', props );

        /*
        props.reports is array of 3 hourly reports over 5 days
        keep report with highest temperature for each date to show on DayCard
        */
        const days = [];
        props.reports.forEach( item => {
            const date = item.dt_txt.slice(0,10);
            const samedate = days.find( day => day.dt_txt.includes( date ) );
            
            if( samedate === undefined ){
                days.push( item );
            }else{
                if( item.main.temp > samedate.main.temp ){
                    days.pop();
                    days.push( item )
                }
            }
        });
        // console.log( days );
    
        const daysPanel = days.map( (item, index) => {
            return <DayCard key={index} data={item}></DayCard>
        });
        // console.log( daysPanel );

    return(
        <div id="forecast-panel">
            {daysPanel}
        </div>
    );

}

export default ForecastPanel;