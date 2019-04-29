import actions from '../constants/ActionTypes'

export const INITIAL_STATE = () => { return {
        products: { list: [], loading: false, error: null },
        purchases: { list: [], loading: false, error: null }
    }
}

export default (state = INITIAL_STATE(), action) => {
    var result = state;

    switch (action.type) {
        case actions.LOAD_PRODUCTS:
            result = {
                ...state,
                products: {
                    loading: true,
                    error: null,
                    list: []
                }
            };
            break;
        case actions.LOAD_PRODUCTS_SUCCESS:
            result = {
                ...state,
                products: {
                    loading: false,
                    error: null,
                    list: action.payload.products
                }
            };
            break;
        case actions.LOAD_PRODUCTS_FAILURE:
            result = {
                ...state,
                products: {
                    loading: false,
                    error: action.payload.error,
                    list: []
                }
            };
            break;
        case actions.LOAD_PURCHASES:
            result = {
                ...state,
                purchases: {
                    loading: true,
                    error: null,
                    list: []
                }
            };
            break;
        case actions.LOAD_PURCHASES_SUCCESS:
            result = {
                ...state,
                purchases: {
                    loading: false,
                    error: null,
                    list: action.payload.purchases
                }
            };
            break;
        case actions.LOAD_PURCHASES_FAILURE:
            result = {
                ...state,
                purchases: {
                    loading: false,
                    error: action.payload.error,
                    list: []
                }
            };
            break;
    }
    return result;
}