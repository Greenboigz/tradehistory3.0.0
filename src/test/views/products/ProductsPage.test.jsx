import React from 'react';
import ReactDOM from 'react-dom';
import { ProductsPage } from '../../../views/products/ProductsPage';
import expect from 'expect';

describe('Tests the functionality of the products/ProductsPage component.\n    - This component contains table and pagination of the Product History page.', () => {
    
    it('renders with no props without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ProductsPage />, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

});
