import reducer, { INITIAL_STATE } from '../../reducers/loadStoreReducer'
import actions from '../../constants/ActionTypes'

var state = {};

describe('load store reducer', () => {

    beforeEach(() => {
        state = INITIAL_STATE();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state)
    });

    it('should handle LOAD_PRODUCTS', () => {
        expect(
            reducer(state, {
            type: actions.LOAD_PRODUCTS
            })
        ).toEqual({
            products: { list: [], loading: true, error: null },
            purchases: { list: [], loading: false, error: null }
        });
    });

    it('should handle LOAD_PRODUCTS_SUCCESS', () => {
        const product_list = [ "test_products" ];
        state.products.loading = true;
        expect(
            reducer(state, {
                type: actions.LOAD_PRODUCTS_SUCCESS,
                payload: { products: product_list }
            })
        ).toEqual({
            products: { list: product_list, loading: false, error: null },
            purchases: { list: [], loading: false, error: null }
        });
    });
    
    it('should handle LOAD_PRODUCTS_FAILURE', () => {
        state.products.loading = true;
        expect(
            reducer(state, {
                type: actions.LOAD_PRODUCTS_FAILURE,
                payload: { error: new Error("Negative test case") }
            })
        ).toEqual({
            products: { list: [], loading: false, error: new Error("Negative test case") },
            purchases: { list: [], loading: false, error: null }
        });
    });

    it('should handle LOAD_PURCHASES', () => {
        expect(
            reducer(state, {
                type: actions.LOAD_PURCHASES
            })
        ).toEqual({
            products: { list: [], loading: false, error: null },
            purchases: { list: [], loading: true, error: null }
        });
    });

    it('should handle LOAD_PURCHASES_SUCCESS', () => {
        const purchase_list = [ "test_purchases" ];
        state.purchases.loading = true;
        expect(
            reducer(state, {
                type: actions.LOAD_PURCHASES_SUCCESS,
                payload: { purchases: purchase_list }
            })
        ).toEqual({
            products: { list: [], loading: false, error: null },
            purchases: { list: purchase_list, loading: false, error: null }
        });
    });
    
    it('should handle LOAD_PURCHASES_FAILURE', () => {
        state.purchases.loading = true;
        expect(
            reducer(state, {
                type: actions.LOAD_PURCHASES_FAILURE,
                payload: { error: new Error("Negative test case") }
            })
        ).toEqual({
            products: { list: [], loading: false, error: null },
            purchases: { list: [], loading: false, error: new Error("Negative test case") }
        });
    });
});