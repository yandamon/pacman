import React from 'react';
import Pacman from './Pacman';
import Map from './Map';


const mapDirections = {
	NORTH: 'top',
	EAST: 'right',
	WEST: 'left',
	SOUTH: 'bottom',
};

const getDirectionByNumber = (number) => {
	switch (number) {
		case 1:
			return 'NORTH';
		case 2:
			return 'EAST';
		case 3:
			return 'SOUTH';
		case 4:
			return 'WEST';
		default:
			return '';
	}
};

const getNumberByDirection = (direction) => {
	switch (direction) {
		case 'NORTH':
			return 1;
		case 'EAST':
			return 2;
		case 'SOUTH':
			return 3;
		case 'WEST':
			return 4;
		default:
			return 0;
	}
}

class PacmanSimulator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      gridNumber:5,
      currentPosition:{x:0, y:0},
      direction:'',
      inputValue:'',
      result:false
    }
  }

  handleChange = (e) => {
    const inputValue = e.target.value;
    this.setState({inputValue})
  }

  rotateDirection = (direction, number) => {
		const directionNumber = getNumberByDirection(direction)
		const newDirectionNumber = Math.abs(directionNumber + number) % 5 || (number > 0 ? 1 : 4);
		const newDirection = getDirectionByNumber(newDirectionNumber);
		this.setState({
			direction: newDirection
		})
  };
  
  left = () => {
		this.rotateDirection(this.state.direction, -1)
  };
  

  right = () => {
		this.rotateDirection(this.state.direction, +1)
  };
  

  place = (x, y ,f) => {
		this.setState({
			currentPosition: {x, y},
			direction: f,
    })
  }
  
  move = () => {
		const towards = mapDirections[this.state.direction];
		let xTowards = 0;
		let yTowards = 0;
		switch (towards) {
			case 'top':
				yTowards = 1;
				break;
			case 'left':
				xTowards = -1;
				break;
			case 'right':
				xTowards = 1;
				break;
			case 'bottom':
				yTowards = -1;
				break;
			default:
				break;
    }
    const xPosition = parseInt(this.state.currentPosition.x) + xTowards;
    const yPosition = parseInt(this.state.currentPosition.y) + yTowards;
    if(xPosition>=0 && xPosition < this.state.gridNumber && yPosition>=0 && yPosition< this.state.gridNumber){
      this.setState({
        currentPosition:{x:xPosition,y:yPosition}
      })
    }
    else{
      this.setState({
        errorMessage:'Already reach the edge, please try another command'
      })
    }
  };
  
  report = () => {
		this.setState({
      result:true
    })
	}


  onSubmit =(e) => {
    e.preventDefault();
    this.setState({
      inputValue:'',
      errorMessage:'',
      result:false
    })
    const value = this.state.inputValue.split(" ");
    if(value[0]==='PLACE' && value.length === 2){
      const xPosition = value[1].split(",")[0];
      const yPosition = value[1].split(",")[1];
      const direction = value[1].split(",")[2];
      const number = getNumberByDirection(direction);
      if(xPosition.match(/[0-4]\d*$/) && yPosition.match(/[0-4]\d*$/) && number !== 0){
        this.place(xPosition,yPosition,direction)
        }else
      {
        this.setState({
          errorMessage: 'Invalid place, it must be  NUMBER between 0 - 4 and a direction'
        })
      }
    }
    else if(!this.state.direction){
      this.setState({
        errorMessage:'You must use PLACE command to place you pacman first'
      })
    }
    else if(value[0]==='LEFT'){
      this.left();
    }
    else if(value[0]==='RIGHT'){
      this.right();
    }
    else if(value[0]==='MOVE'){
      this.move()
    }
    else if(value[0]==='REPORT'){
      this.report();
    }
    else{
      this.setState({
        errorMessage:'invalid command, the system accept PLACE, LEFT, RIGHT, MOVE and REPORT only'
      })
    }
  }


  render(){
    return (<React.Fragment>
      <h1 style={{textAlign:'center'}}>PACMAN</h1>
      <Map>
      <Pacman directionValue={this.state.direction} 
              gridNumber={this.state.gridNumber}
              xPosition={this.state.currentPosition.x}
              yPosition={this.state.currentPosition.y}/>
      </Map>
      <p>The input accept five type of commands: PLACE(in format: PLACE X,Y,Z. eg: PLACE 1,1,WEST), LEFT, RIGHT, MOVE and REPORT</p>
      <form onSubmit={this.onSubmit}>
        <input type='text' placeholder='Please enter your command' 
                onChange={this.handleChange} 
                value={this.state.inputValue}></input>
      </form>
      {this.state.errorMessage && <p style={{color:'red',fontStyle:'italic'}}>{this.state.errorMessage}</p>}
      {this.state.result && <p>Output is: {this.state.currentPosition.x}, {this.state.currentPosition.y}, {this.state.direction}</p>}
    </React.Fragment>)
  }
}

export default PacmanSimulator;
