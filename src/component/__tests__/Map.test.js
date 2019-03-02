import React from 'react';
import {shallow} from 'enzyme';
import Map from '../Map';
import Grid from '../Grid';
import '../setupTests'


it('shows the map of pacman', ()=>{
    const wrapped = shallow(<Map />);
    expect(wrapped.find(Grid).length).toEqual(25);

})