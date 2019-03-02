import React from 'react';
import Grid from './Grid';
import styled from 'styled-components';

const MapWrapper = styled.div`
    width: ${props => `${(props.gridNumber || 5)*110}px` || `500px`};
    height: ${props => `${(props.gridNumber || 5)*100}px` || `500px`};
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    position:relative;
`

export default (props) => {
    const {gridNumber =5} = props;
    const grids = [];
    for(let i = 0; i < gridNumber * gridNumber; i++){
        grids.push(<Grid key={`${i}grid`}/>)
    }

    const childrenWithProps = React.Children.map(props.children,child=>
        React.cloneElement(child,{gridNumber})
        )
    return(
        <MapWrapper>
            {grids}
            {childrenWithProps}
        </MapWrapper>
    )
}