import React, {useState} from 'react';

function Clock(){

    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false  };

    const [time, setTime] = useState( new Date() );
    function tick(){
        setTime( new Date() );
    }

    setInterval( tick, 1000);
    return(
        <div>{time.toLocaleDateString( "en-US", options )}</div>
    );
}

// class Clock extends React.Component {

//     constructor(props) {
//       super(props);
//       this.state = {
//           date: new Date(),
//           timerID: null
//         };
//     }

//     componentDidMount() {
//         this.timerID = setInterval(
//           () => this.tick(),
//           1000
//         );
//       }

//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }

//     tick() {
//     this.setState({
//         date: new Date()
//     });
//     }
  
//     render() {
//       return (
//         <div>
//           {this.state.date.toLocaleTimeString()}
//         </div>
//       );
//     }
//   }

export default Clock;