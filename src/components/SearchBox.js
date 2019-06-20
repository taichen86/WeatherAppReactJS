import React, {useState} from 'react';
import '../style/main.css';


function SearchBox( props ){

    // console.log( 'SearchBox props: ', props );
    const [showMsg, setShowMsg] = useState( true );

    function handleClick( e ){
        setShowMsg( false ); // hide message when typing
        if( e.key === "Enter" ){
            setShowMsg( true );
            // console.log( '=== search : ', e.target.value );
            props.search( e.target.value );
        }
    }

    return( 

        <div id="search-panel">

            <input id="search-input" onKeyPress={handleClick} type="text" placeholder="search city..."></input>
        
            <div id="error-msg">
                { showMsg && props.msg }
            </div>

        </div>
            
    );   


}

export default SearchBox;