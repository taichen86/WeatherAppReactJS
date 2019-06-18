// import React from 'react';

// class SearchBox extends React.Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             searchTerm: ''
//         };
//     }

//     render(){
//         return <div>
//             <input onKeyPress={handleClick} type="text" placeholder="search city..."></input>
//         </div>    
//     }

// }

import React, {useState, useEffect} from 'react';

function SearchBox( props ){

    const[search, setSearch] = useState(''); // needed?


    function handleClick(e){
        console.log( 'handle click: ', e );
        if( e.key == 'Enter' ){
            console.log( '=== search : ', e.target.value );
            console.log( props );
            props.search( e.target.value );
        }
    }

    return <div>
             <input onKeyPress={handleClick} type="text" placeholder="search city..."></input>
         </div>    


}

export default SearchBox;