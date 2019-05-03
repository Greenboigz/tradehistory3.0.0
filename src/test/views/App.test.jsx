import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../../views/App';
import expect from 'expect';

describe('Tests the functionality of the App component', () => {
    
    it('renders with no props without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <App />, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('calls the initStore function when it renders if the initStore function is provided in the props', () => {
        const testFunction = jest.fn();
        const div = document.createElement('div');
        ReactDOM.render(
            <App initStore={ testFunction } />, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
        expect(testFunction).toHaveBeenCalledTimes(1);
    });

    it('calls the does not call the initStore function when the initStore function is not provided in the props', () => {
        const testFunction = jest.fn();
        const div = document.createElement('div');
        ReactDOM.render(
            <App />, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
        expect(testFunction).toHaveBeenCalledTimes(0);
    });

});
