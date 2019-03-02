import React from 'react';
import PacmanSimulator from './component/PacmanSimulator';

class App extends React.Component{
    render(){
        return (<div style={{position:'relative'}}>
            <PacmanSimulator /> 
        </div>)
    }
}

export default App;