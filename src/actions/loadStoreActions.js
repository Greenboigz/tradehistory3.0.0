// import fetch from 'node-fetch';
import * as request from '../helpers/fetch';
import actions from '../constants/ActionTypes';

/**
 * Dispatches loading products from the products_file
 * @returns {function(dispatch)}
 */
export function LoadProductsDispatcher() {
    return dispatch => {
        dispatch(LoadProducts());
        return request.getData('http://localhost:5000/products')
            .then(body => { 
                dispatch(LoadProductsSuccess(body.products))
            })
            .catch(error => dispatch(LoadProductsFailure({ error })));
    }
}

function LoadProducts() {
    return {
        type: actions.LOAD_PRODUCTS
    };
}

function LoadProductsSuccess(products) {
    return {
        type: actions.LOAD_PRODUCTS_SUCCESS,
        payload: { products }
    }
}

function LoadProductsFailure(error) {
    return {
        type: actions.LOAD_PRODUCTS_FAILURE,
        payload: error
    }
}

/**
 * Dispatches loading purchases from the purchases_file
 * @returns {function(dispatch)}
 */
export function LoadPurchasesDispatcher() {
    return dispatch => {
        dispatch(LoadPurchases());
        return request.getData('http://localhost:5000/purchases')
            .then(body => dispatch(LoadPurchasesSuccess(body.purchases)))
            .catch(error => dispatch(LoadPurchasesFailure({ error })));
    }
}

function LoadPurchases() {
    return {
        type: actions.LOAD_PURCHASES
    };
}

function LoadPurchasesSuccess(purchases) {
    return {
        type: actions.LOAD_PURCHASES_SUCCESS,
        payload: { purchases }
    }
}

function LoadPurchasesFailure(error) {
    return {
        type: actions.LOAD_PURCHASES_FAILURE,
        payload: error
    }
}

// function UpdatePurchases(purchases) {
//     return {
//         type: actions.UPDATE_PURCHASES,
//         payload: { purchases }
//     }
// }