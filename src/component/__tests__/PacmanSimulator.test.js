import React from 'react';
import {shallow} from 'enzyme';
import Map from '../Map';
import Pacman from '../Pacman'
import PacmanSimulator from '../PacmanSimulator';
import '../setupTests';

let wrapped

beforeEach(()=>{
    wrapped = shallow(<PacmanSimulator />)
})

it('the Map works',()=>{
    expect(wrapped.find(Map).length).toEqual(1);
})

it('the Pacman works',()=>{
    expect(wrapped.find(Pacman).length).toEqual(1);
})