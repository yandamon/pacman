import React from 'react';
import styled from 'styled-component';

const GridWrapper = styled.div`
    width:100px;
    height:100px;
    display:flex;
    border: 1px solid black;
    margin-right: -1px;
    margin-bottom: -1px;
`

export default () =>{
    return(
        <GridWrapper />
    )
}