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
    let mockOnSubmit = null;

    function renderPurchaseFilter(div) {
        ReactDOM.render(<PurchasesFilter onSubmit={mockOnSubmit} />, div);
    }

    beforeEach(() => {
        div = document.createElement('div');
        mockOnSubmit = jest.fn();
        document.body.appendChild(div);
    });
      
    afterEach(() => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        div = null;
    });
    
    it('displays the component with no properties without crashing', () => {
        renderPurchaseFilter(div);
    });

    describe('Tests the proper functionality of the search button', () => {

        it('does NOT call the onSubmit function when the filter has NOT been editted and the search button is clicked.', () => {
            renderPurchaseFilter(div);
            const submitButton = div.querySelector('#filter-submit');
    
            ReactTestUtils.Simulate.submit(submitButton);
            expect(mockOnSubmit).toHaveBeenCalledTimes(0);
        });

        it('remains disabled when a user tries to click the already disabled search button.', () => {
            renderPurchaseFilter(div);
            const submitButton = div.querySelector('#filter-submit');
            expect(submitButton.disabled).toBeTruthy();
    
            ReactTestUtils.Simulate.submit(submitButton);
            expect(submitButton.disabled).toBeTruthy();
        });
    
        it('does call the onSubmit function when the filter has been editted and the search button is clicked.', () => {
            renderPurchaseFilter(div);
            const submitButton = div.querySelector('#filter-submit');
            const minQuantityInput = div.querySelector('#min-quantity');
            expect(minQuantityInput.value).toBe('');
    
            TestUtils.Simulate.change(minQuantityInput, { target: { value: "1" } });
            expect(minQuantityInput.value).toBe('1');
    
            ReactTestUtils.Simulate.submit(submitButton);
            expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        });

        it('becomes enabled when a user changes any of the filter fields, and becomes disabled after the search button is clicked.', () => {
            renderPurchaseFilter(div);
            const submitButton = div.querySelector('#filter-submit');
            const minQuantityInput = div.querySelector('#min-quantity');
            expect(minQuantityInput.value).toBe('');
            expect(submitButton.disabled).toBeTruthy();
    
            TestUtils.Simulate.change(minQuantityInput, { target: { value: "1" } });
            expect(minQuantityInput.value).toBe('1');
            expect(submitButton.disabled).toBeFalsy();
    
            ReactTestUtils.Simulate.submit(submitButton);
            expect(submitButton.disabled).toBeTruthy();
        });

    });

    const purchases_list = [
        { id: 1, quantity: 18, productName: 'test 1', purchaseCost: 14.56, purchaseDate: new Date('2018-06-01 EST') },
        { id: 2, quantity: 7,  productName: 'test 2', purchaseCost: 38.43, purchaseDate: new Date('2019-01-01 EST') },
        { id: 3, quantity: 13, productName: 'test 3', purchaseCost: 52.82, purchaseDate: new Date('2019-06-01 EST') },
        { id: 4, quantity: 2,  productName: 'test 4', purchaseCost: 5.09,  purchaseDate: new Date('2018-01-01 EST') }
    ]

    describe.each([
        // ['#product', { value: 'test 1', label: 'test 1' }, [1] ],
        ['#min-date', (new Date('2019-01-01 EST')).toString(), [2,3]],
        ['#max-date', (new Date('2019-01-01 EST')).toString(), [1,2,4]],
        ['#min-quantity', '10', [1,3]],
        ['#max-quantity', '10', [2,4]],
        ['#min-cost', '20', [2,3]],
        ['#max-cost', '20', [1,4]]
    ])(
        'Tests the functionality of the filter input field "%s" with value "%s"',
        (id, value, expected_ids) => {
            test('Does properly filter the purchases during the search onSubmit callback.', () => {
                mockOnSubmit = (query) => {
                    let filtered_purchases = purchases_list.filter(purchase => {
                        var include = true;
                        query.filters.forEach(filter => include &= filter(purchase));
                        return include;
                    });
                    let actual_ids = filtered_purchases.map(purchase => purchase.id);
                    expect(actual_ids.sort()).toEqual(expected_ids.sort());
                }
                renderPurchaseFilter(div);

                const submitButton = div.querySelector('#filter-submit');
                const filterField = div.querySelector(id);
                expect(submitButton.disabled).toBeTruthy();
        
                TestUtils.Simulate.change(filterField, { target: { value } });
                expect(submitButton.disabled).toBeFalsy();
        
                ReactTestUtils.Simulate.submit(submitButton);
                expect(submitButton.disabled).toBeTruthy();
            });
        }
    );

});
