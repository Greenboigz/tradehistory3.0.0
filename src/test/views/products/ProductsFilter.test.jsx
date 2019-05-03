import React from 'react';
import ReactDOM from 'react-dom';
import ProductsFilter from '../../../views/products/ProductsFilter';
import expect from 'expect';

describe('Tests the functionality of the products/ProductsFilter component', () => {
    
    it('renders with no props without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ProductsFilter />, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

});
