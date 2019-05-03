import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../../views/Home';
import expect from 'expect';

describe('Tests the functionality of the Home component', () => {
    
    it('renders with no props without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Home />, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

});
