import React from 'react';
import ReactDOM from 'react-dom';
import { PurchasesPage } from '../../../views/purchases/PurchasesPage';
import expect from 'expect';

describe('Tests the functionality of the purchases/PurchasesPage component.\n    - This component contains table and pagination of the Purchase History page.', () => {
    
    it('renders with no props without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <PurchasesPage />, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

});
