import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/loadStoreActions';
import types from '../../constants/ActionTypes';
import fetchMock from 'fetch-mock';
import expect from 'expect';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Tests the functionality of the actions in loadStoreActions.js', () => {

    afterEach(() => {
        fetchMock.restore()
    });

    it('creates LOAD_PRODUCTS_SUCCESS when loading products has been done', () => {
        // Describe the expected results
        const expectedProducts = [ { 
            id: 1, name: "Product 1", 
            createDate: JSON.stringify(new Date("01-01-2019")), 
            description: "Thing", 
            value: 10 
        } ];
        const expectedActions = [
            { type: types.LOAD_PRODUCTS },
            { 
                type: types.LOAD_PRODUCTS_SUCCESS, 
                payload: {
                    products: expect.any(Array)
                }
            }
        ];

        // Mock out the endpoint and the store
        fetchMock.getOnce('http://localhost:5000/products', {
            body: { products: [...expectedProducts] },
            headers: { 'content-type': 'application/json' }
        });
        const store = mockStore({ 
            products: { list: [], error: null, loading: false }
        });

        // Run our test and check compare the results
        return store.dispatch(actions.LoadProductsDispatcher()).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(expectedActions.length);
            expect(actions).toEqual(expect.arrayContaining(expectedActions));
            
            const success_action = actions.find(action => action.type === types.LOAD_PRODUCTS_SUCCESS);
            expect(success_action).toBeDefined();
            let products = success_action.payload.products;
            expect(products.length).toBe(expectedProducts.length);
            expectedProducts.forEach(product=> expect(products).toContainEqual(product));
        });
    });

    it('creates LOAD_PRODUCTS_FAILURE when loading products has completed with error', () => {
        // Describe the expected results
        const expectedPayload = { error: new Error("Negative test case.") };
        const expectedActions = [
            { type: types.LOAD_PRODUCTS },
            { 
                type: types.LOAD_PRODUCTS_FAILURE, 
                payload: expectedPayload
            }
        ];

        // Mock out the endpoint and the store
        fetchMock.getOnce('http://localhost:5000/products', { throws: new Error('Negative test case.') });
        const store = mockStore({ 
            products: { list: [], error: null, loading: false }
        });

        // Run our test and check compare the results
        return store.dispatch(actions.LoadProductsDispatcher()).then(() => {
            // return of async actions
            const actions = store.getActions();
            expect(actions.length).toBe(expectedActions.length);
            expect(actions).toEqual(expect.arrayContaining(expectedActions));
        });
    });

    it('creates LOAD_PURCHASES_SUCCESS when loading purchases has been done', () => {
        // Describe the expected results
        const expectedPurchases = [ { 
            id: 1,
            purchaseId: 1,
            quantity: 1,
            purchaseDate: JSON.stringify(new Date("01-01-2019"))
        } ];
        const expectedActions = [
            { type: types.LOAD_PURCHASES },
            { 
                type: types.LOAD_PURCHASES_SUCCESS, 
                payload: {
                    purchases: expect.any(Array)
                }
            }
        ];

        // Mock out the endpoint and the store
        fetchMock.getOnce('http://localhost:5000/purchases', {
            body: { purchases: [...expectedPurchases] },
            headers: { 'content-type': 'application/json' }
        });
        const store = mockStore({ 
            purchases: { list: [], error: null, loading: false }
        });

        // Run our test and check compare the results
        return store.dispatch(actions.LoadPurchasesDispatcher()).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(expectedActions.length);
            expect(actions).toEqual(expect.arrayContaining(expectedActions));
            
            const success_action = actions.find(action => action.type === types.LOAD_PURCHASES_SUCCESS);
            expect(success_action).toBeDefined();
            let purchases = success_action.payload.purchases;
            expect(purchases.length).toBe(expectedPurchases.length);
            expectedPurchases.forEach(purchase=> expect(purchases).toContainEqual(purchase));
        });
    });

    it('creates LOAD_PURCHASES_FAILURE when loading purchases has completed with error', () => {
        // Describe the expected results
        const expectedPayload = { error: new Error("Negative test case.") };
        const expectedActions = [
            { type: types.LOAD_PURCHASES },
            { 
                type: types.LOAD_PURCHASES_FAILURE, 
                payload: expectedPayload
            }
        ];

        // Mock out the endpoint and the store
        fetchMock.getOnce('http://localhost:5000/purchases', { throws: new Error('Negative test case.') });
        const store = mockStore({ 
            purchases: { list: [], error: null, loading: false }
        });
        
        // Run our test and check compare the results
        return store.dispatch(actions.LoadPurchasesDispatcher()).then(() => {
            const actions = store.getActions();
            expect(actions.length).toBe(expectedActions.length);
            expect(actions).toEqual(expect.arrayContaining(expectedActions));
        });
    });
});