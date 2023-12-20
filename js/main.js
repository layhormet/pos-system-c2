function saveProducts() {
    // save data to localStorage 
    localStorage.setItem('productsData', JSON.stringify(productsData));
}

function loadProducts() {
    // load data from localStorage 
    let loadProducts = JSON.parse(localStorage.getItem('productsData'));
    if (loadProducts != undefined) {
        productsData = loadProducts
    }
    else {
        saveProducts();
    }
}
let productsData = {
    products: [],
    latestId: null
};
loadProducts()

renderProducts()

