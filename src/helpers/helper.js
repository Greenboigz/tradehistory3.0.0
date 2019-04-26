export const MS_PER_SEC = 1000;
export const SEC_PER_MIN = 60;
export const MIN_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
export const NUMBER_OF_DAYS = 120;
export const EXPERIMENT_DURATION = MS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOURS_PER_DAY * NUMBER_OF_DAYS;
export const EXPERIMENT_START_DATE = Date.now() - EXPERIMENT_DURATION;
export const A_DAY = MS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOURS_PER_DAY;

var transaction_id = 0;

/**
 * Initializes a product
 * @param {Number} id 
 * @param {String} name 
 */
function initialize_product(id, name) {
    const initial_date = new Date(EXPERIMENT_START_DATE + (Math.random() * EXPERIMENT_DURATION));
    return {
        id,
        createdDate: initial_date,
        name,
        description: "This is an example of a product.",
        value: Math.random() * 20
    }
}

/**
 * Initializes a Purchase
 * @param {{id: Number, name: String, createDate: Date, description: String, value: Number}} product 
 * @param {Date} purchaseDate 
 */
function initialize_purchase(product, purchaseDate) {
    return {
        id: transaction_id++,
        productId: product.id,
        quantity: Math.ceil(Math.random() * 20),
        purchaseDate
    }
}

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

export function load_products() {
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

function add_daily_purchases(day, products) {
    var purchases = [];
    for (var p = 0; p < 5000; p++) {
        var product = choose_random(products);
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

export function load_purchases(products) {
    var purchases = [];
    var today = EXPERIMENT_START_DATE;
    while (today < Date.now()) {
        var todays_purchases = add_daily_purchases(today, products);
        todays_purchases.forEach(purchase => purchases.push(purchase));
        today += A_DAY;
    }
    return purchases;
}