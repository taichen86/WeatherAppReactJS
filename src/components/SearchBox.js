import React from 'react';
import '../style/main.css';


function SearchBox( props ){


    console.log( 'SearchBox props: ', props );
    function handleClick( e ){
        if( e.key == "Enter" ){
            console.log( '=== search : ', e.target.value );
            props.search( e.target.value );
        }
    }

    return( 
        <div id="search-panel">
            <input id="search-input" onKeyPress={handleClick} type="text" placeholder="search city..."></input>
        </div>
    );   


}

export default SearchBox;