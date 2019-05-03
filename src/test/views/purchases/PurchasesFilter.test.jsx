import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import PurchasesFilter from '../../../views/purchases/PurchasesFilter';
import expect from 'expect';
import TestUtils from 'react-dom/test-utils';
import each from 'jest-each';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Tests the functionality of the purchases/PurchasesFilter component', () => {

    let div = null;

    beforeEach(() => {
        div = document.createElement('div');
        document.body.appendChild(div);
    });
      
    afterEach(() => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        div = null;
    });
    
    it('displays the component with no properties without crashing', () => {
        ReactDOM.render(
            <PurchasesFilter />, 
            div
        );
    });

    it('does NOT call the onSubmit function when the filter has NOT been editted and the submit button is clicked', () => {
        const mockOnSubmit = jest.fn();
        ReactDOM.render(
            <PurchasesFilter onSubmit={mockOnSubmit} />, 
            div
        );
        const submitButton = div.querySelector('#filter-submit');
        expect(submitButton.disabled).toBeTruthy();

        ReactTestUtils.Simulate.click(submitButton);
        expect(submitButton.disabled).toBeTruthy();
        expect(mockOnSubmit).toHaveBeenCalledTimes(0);
    });

    it('does call the onSubmit function when the filter has been editted and the submit button is clicked', () => {
        const mockOnSubmit = jest.fn();
        ReactDOM.render(
            <PurchasesFilter onSubmit={mockOnSubmit} />, 
            div
        );
        const submitButton = div.querySelector('#filter-submit');
        const minQuantityInput = div.querySelector('#min-quantity');
        expect(minQuantityInput.value).toBe('');
        expect(submitButton.disabled).toBeTruthy();

        // TODO: Fix this
        TestUtils.Simulate.change(minQuantityInput, { target: { value: "1" } });
        expect(minQuantityInput.value).toBe('1');
        expect(submitButton.disabled).toBeFalsy();

        ReactTestUtils.Simulate.click(submitButton);
        expect(submitButton.disabled).toBeTruthy();
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

});
