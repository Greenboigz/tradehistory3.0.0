import { initialize_product, initialize_purchase, EXPERIMENT_START_DATE, A_DAY } from '../helpers/helper';


const FRUITS = [
    "apple",
    "apricot",
    "avocado",
    "banana",
    "bell pepper",
    "bilberry",
    "blackberry",
    "blackcurrant",
    "blood orange",
    "blueberry",
    "boysenberry",
    "breadfruit",
    "canary melon",
    "cantaloupe",
    "cherimoya",
    "cherry",
    "chili pepper",
    "clementine",
    "cloudberry",
    "coconut",
    "cranberry",
    "cucumber",
    "currant",
    "damson",
    "date",
    "dragonfruit",
    "durian",
    "eggplant",
    "elderberry",
    "feijoa",
    "fig",
    "goji berry",
    "gooseberry",
    "grape",
    "grapefruit",
    "guava",
    "honeydew",
    "huckleberry",
    "jackfruit",
    "jambul",
    "jujube",
    "kiwi fruit",
    "kumquat",
    "lemon",
    "lime",
    "loquat",
    "lychee",
    "mandarine",
    "mango",
    "mulberry",
    "nectarine",
    "nut",
    "olive",
    "orange",
    "pamelo",
    "papaya",
    "passionfruit",
    "peach",
    "pear",
    "persimmon",
    "physalis",
    "pineapple",
    "plum",
    "pomegranate",
    "pomelo",
    "purple mangosteen",
    "quince",
    "raisin",
    "rambutan",
    "raspberry",
    "redcurrant",
    "rock melon",
    "salal berry",
    "satsuma",
    "star fruit",
    "strawberry",
    "tamarillo",
    "tangerine",
    "tomato",
    "ugli fruit",
    "watermelon"
];

function load_products() {
    return FRUITS.map((item, index) => initialize_product(index, item));
}

/**
 * Randomly choose an item out of a list
 * @param {[Object]} aList 
 * @return {Object}
 */
function choose_random(aList) {
    return aList[Math.floor(Math.random() * aList.length)];
}

function add_daily_purchases(day) {
    var purchases = [];
    for (var p = 0; p < 5000; p++) {
        var product = choose_random(PRODUCTS);
        if (product.createdDate < day) {
            var purchase = initialize_purchase(
                product, 
                new Date(day + Math.random() * A_DAY)
            );
            purchases.push(purchase);
        }
    }
    return purchases;
}

function load_purchases() {
    var purchases = [];
    var today = EXPERIMENT_START_DATE;
    while (today < Date.now()) {
        var todays_purchases = add_daily_purchases(today);
        todays_purchases.forEach(purchase => purchases.push(purchase));
        today += A_DAY;
    }
    return purchases;
}

const PRODUCTS = load_products();
const PURCHASES = load_purchases();

/**
 * Dispatches loading products from the products_file
 * @param {function(action)} dispatch
 * @param {[]} products
 */
export function LoadProductsDispatcher(dispatch) {
    const action = {
        type: 'LOAD_PRODUCTS',
        payload: {}
    };
    setTimeout(() => {
        const error = false;
        if (error) {
            dispatch(LoadProductsFailure(error));
        } else {
            dispatch(LoadProductsSuccess(PRODUCTS));
        }
    }, 2000);

    return dispatch(action);
}

function LoadProductsSuccess(products) {
    return {
        type: 'LOAD_PRODUCTS_SUCCESS',
        payload: { products }
    }
}

function LoadProductsFailure(error) {
    return {
        type: 'LOAD_PRODUCTS_FAILURE',
        payload: { error }
    }
}

/**
 * Dispatches loading purchases from the purchases_file
 * @param {function(action)} dispatch
 */
export function LoadPurchasesDispatcher(dispatch) {
    const action = {
        type: 'LOAD_PURCHASES',
        payload: {}
    };
    setTimeout(() => {
        const error = false;
        if (error) {
            dispatch(LoadPurchasesFailure(error));
        } else {
            dispatch(LoadPurchasesSuccess(PURCHASES));
        }
    }, 2500);
    return dispatch(action);
}

function LoadPurchasesSuccess(purchases) {
    return {
        type: 'LOAD_PURCHASES_SUCCESS',
        payload: { purchases }
    }
}

function LoadPurchasesFailure(error) {
    return {
        type: 'LOAD_PURCHASES_FAILURE',
        payload: { error }
    }
}

function UpdatePurchases(purchases) {
    return {
        type: 'UPDATE_PURCHASES',
        payload: { purchases }
    }
}