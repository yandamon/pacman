import React from 'react';
import Pacman from './Pacman';
import Map from './Map'

class PacmanSimulator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      xPosition:'',
      yPosition:'',
      inputValue:'',
      errorMessage:'',
      gridNumber:5,
      direction:'',
      directionValue:'',
      movement:[[-1,0],[0,1],[1,0],[0,-1]],
      result:false
    }
  }

  handleChange = (e) => {
    const inputValue = e.target.value;
    this.setState({inputValue})
  }

  //When submit the command Left and Right, change the direction 
  setDirection=(value)=>{
    if(value%4===0){
      this.setState({
        direction:'WEST',
        directionValue:0,
      })
    }
    if(value%4 === 1 || value%4 === -3){
      this.setState({
        direction:'NORTH',
        directionValue:1
      })
    }
    if(value%4 === 2 || value%4 === -2){
      this.setState({
        direction:'EAST',
        directionValue:2
      })
    }
    if(value%4 === 3 || value%4 === -1){
      this.setState({
        direction:'SOUTH',
        directionValue:3
      })
    }  
  }

  setDirectionValue = (direction) =>{
    switch(direction){
      case 'WEST': 
        this.setState({
          direction,
          directionValue:0
        });
        break;
      case 'NORTH':
        this.setState({
          direction,
          directionValue:1
        })
        break;
      case 'EAST':
        this.setState({
          direction,
          directionValue:2
        })
        break;
      case 'SOUTH':
        this.setState({
          direction,
          directionValue:3
        })
        break;
      default:
        this.setState({
          errorMessage:"invalid direction, direction can only be 'WEST', 'NORTH','EAST','SOUTH' only, please use PLACE command to set direction again",
          directionValue:''
        })

    }
    
  }

  //When submit the form, call this function.
  onSubmit = (e) =>{
    e.preventDefault();
    this.setState({
      errorMessage:'',
      result:false,
      inputValue:''
    })
    const value = this.state.inputValue.split(" ");
    if(value[0]==='PLACE' && value.length === 2){
      const xPosition = value[1].split(",")[0];
      const yPosition = value[1].split(",")[1];
      const direction = value[1].split(",")[2];
      if( xPosition >= 0 && xPosition <= 4 && yPosition >= 0 && yPosition <= 4 && xPosition%1 ===0 &&yPosition%1 ===0){
        this.setDirectionValue(direction)
        this.setState({
          xPosition,
          yPosition,

      })}else
      {
        this.setState({
          errorMessage: 'Invalid place, it must be a NUMBER between 0 and 4'
        })
      }
    }
    else if((!this.state.directionValue && this.state.directionValue !==0) || !this.state.direction){
      this.setState({
        errorMessage:'You must use PLACE command to place you pacman first'
      })
    }
    else if(value[0]==='LEFT'){
      const directionValue=this.state.directionValue - 1;
      this.setDirection(directionValue);
      this.setState({
      })
    }
    else if(value[0]==='RIGHT'){
      const directionValue=this.state.directionValue + 1;
      this.setDirection(directionValue);
      this.setState({
      })
    }
    else if(value[0]==='MOVE'){
      const value = this.state.directionValue;
      const xPosition=parseInt(this.state.xPosition) + this.state.movement[value][0];
      const yPosition=parseInt(this.state.yPosition) + this.state.movement[value][1];
      if(xPosition >= 0 && xPosition <= 4 && yPosition >= 0 && yPosition <= 4){
        this.setState({
          xPosition,
          yPosition,
          errorMessage:''
        })
      }
      else{
        this.setState({
          errorMessage:'Already reach the edge, please try another command'
        })
      }
    }
    else if(value[0]==='REPORT'){
      this.setState({
        result:true
      })
    }else{
      this.setState({
        errorMessage:'invalid command, the system accept PLACE, LEFT, RIGHT, MOVE and REPORT only'
      })
    }
  }

  render(){
    return (<React.Fragment>
      <h1>pacman</h1>
      <p>The input accept five type of commands: PLACE(in format: PLACE X,Y,Z. eg: PLACE 1,1,WEST), LEFT, RIGHT, MOVE and REPORT</p>
      <form onSubmit={this.onSubmit}>
        <input type='text' placeholder='Please enter your command' 
                onChange={this.handleChange} 
                value={this.state.inputValue}></input>
      </form>
      {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
      <p>{this.state.xPosition}.{this.state.yPosition}</p>
      {this.state.result && <p>Output: {this.state.xPosition},{this.state.yPosition},{this.state.direction}</p>}
      <Map>
      <Pacman directionValue={this.state.directionValue} 
              gridNumber={this.state.gridNumber}
              xPosition={this.state.xPosition}
              yPosition={this.state.yPosition}/>
      </Map>
    </React.Fragment>)
  }
}

export default PacmanSimulator;
