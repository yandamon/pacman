import React from 'react';
import styled from 'styled-component';

const mapDirection = {
    0:'left',
    1:'top',
    2:'right',
    3:'bottom'
}

const offSet = 25;

const PacmanWrapper = styled.div`
    width:50px;
    height:50px;
    display:flex;
    background-color:darkorange;
    border-radius:50%;
    border-left:1px solid yellow;
    position: absolute;
    border-left: ${props=>mapDirection[props.directionValue] === 'left' ? '10px solid red' : '0'};
    border-top: ${props=>mapDirection[props.directionValue] === 'top' ? '10px solid red' : '0'};
    border-right: ${props=>mapDirection[props.directionValue] === 'right' ? '10px solid red' : '0'};
    border-bottom: ${props=>mapDirection[props.directionValue] === 'bottom' ? '10px solid red' : '0'};
    top: ${props => (props.gridNumber -1 - props.yPosition || 0) * 100 + offSet}px;
    left:${props => (props.xPosition || 0) * 100 + offSet}px;
`

export default (props) => {
    return (<PacmanWrapper {...props}/>)
}