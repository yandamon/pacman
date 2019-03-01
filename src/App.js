import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      xPosition:'',
      yPosition:'',
      inputValue:'',
      errorMessage:'',
      direction:'',
      directionValue:'',
      movement:[[-1,0],[0,-1],[1,0],[0,1]],
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
    if(direction==='WEST'){
      this.setState({
        direction,
        directionValue:0
      })
    }else
    if(direction==='NORTH'){
      this.setState({
        direction,
        directionValue:1
      })
    }else
    if(direction==='EAST'){
      this.setState({
        direction,
        directionValue:2
      })
    }else
    if(direction==='SOUTH'){
      this.setState({
        direction,
        directionValue:3
      })
    }else{
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
      result:false
    })
    const value = this.state.inputValue.split(" ");
    if(value[0]==='PLACE' && value.length === 2){
      const xPosition = value[1].split(",")[0];
      const yPosition = value[1].split(",")[1];
      const direction = value[1].split(",")[2];
      if(xPosition < 0 || xPosition > 5 || yPosition < 0 ||yPosition > 5){
        this.setState({
          errorMessage: 'Invalid place, it must be a NUMBER between 0 and 5',
          inputValue:''
        })
      }else
      {this.setDirectionValue(direction)
       this.setState({
        xPosition,
        yPosition,
        inputValue:''
      })}
    }
    else if(!this.state.xPosition || !this.state.yPosition || !this.state.direction || !this.state.directionValue){
      this.setState({
        errorMessage:'You must use PLACE command to place you pacman first',
        inputValue:''
      })
    }
    else if(value[0]==='LEFT'){
      const directionValue=this.state.directionValue - 1;
      this.setDirection(directionValue);
      this.setState({
        inputValue:''
      })
    }
    else if(value[0]==='RIGHT'){
      const directionValue=this.state.directionValue + 1;
      this.setDirection(directionValue);
      this.setState({
        inputValue:''
      })
    }
    else if(value[0]==='MOVE'){
      const value = this.state.directionValue;
      const xPosition=parseInt(this.state.xPosition) + this.state.movement[value][0];
      const yPosition=parseInt(this.state.yPosition) + this.state.movement[value][1];
      if(xPosition >= 0 && xPosition <= 5 && yPosition >= 0 && yPosition <= 5){
        this.setState({
          xPosition,
          yPosition,
          inputValue:'',
          errorMessage:''
        })
      }
      else{
        this.setState({
          errorMessage:'Already reach the edge, please try another command',
          inputValue:''
        })
      }
    }
    else if(value[0]==='REPORT'){
      this.setState({
        result:true,
        inputValue:''
      })
    }else{
      this.setState({
        errorMessage:'invalid command, the system accept PLACE, LEFT, RIGHT, MOVE and REPORT only',
        inputValue:''
      })
    }
  }

  render(){
    return (<div>
      <h1>pacman</h1>
      <p>The input accept four type of commands: PLACE, LEFT, RIGHT, MOVE and REPORT</p>
      <p>You can input anything you like, but some of then may does not work</p>
      <form onSubmit={this.onSubmit}>
        <input type='text' placeholder='Please enter your command' 
                onChange={this.handleChange} 
                value={this.state.inputValue}></input>
      </form>
      {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
      {this.state.result && <p>Output: {this.state.xPosition},{this.state.yPosition},{this.state.direction}</p>}
    </div>)
  }
}

export default App;
