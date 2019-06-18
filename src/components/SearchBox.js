import React from 'react';

function SearchBox( props ){

    function handleClick(e){
        // console.log( 'handle click: ', e );
        if( e.key == 'Enter' ){
            console.log( '=== search : ', e.target.value );
            props.search( e.target.value );
        }
    }

    return( 
        <div>
            <input onKeyPress={handleClick} type="text" placeholder="search city..."></input>
        </div> );   


}

export default SearchBox;