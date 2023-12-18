
// form
let inputName = document.getElementById('productName');
let inputId = document.getElementById('productId');
let inputPrice = document.getElementById('productPrice');
let inputQuant = document.getElementById('productQuantity');
let inputcategory = document.getElementById('categories');
let inputSold = document.getElementById('sold');
let inputStock = document.getElementById('stock');

// tage 
let textForm = document.querySelector('.add-product p');
let formHeading = document.querySelector('.dialog h1')

// table
let tbody = document.querySelector('tbody');
let table = document.querySelector('table');

// button
let addBtn = document.querySelector('.add');
let editBtn = document.querySelector('.edit');
let editIndex = null

// addEventListener
addBtn.addEventListener('click', addProduct);




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
        saveProducts()
    }
}

function hide(element) {
    element.style.display = 'none';

}
function show(element) {
    element.style.display = 'block';

}
function renderProducts() {
    // call load products 
    loadProducts();

    // remover old tbody 
    tbody.remove();

    // create new table body element as "tBody"
    let newTbody = document.createElement('tbody');

    // create all table rows depending data from product list 
    for (let product of productsData.products) {
        let tRow = document.createElement('tr');
        tRow.dataset.id = product.id - 1;

        let tdID = document.createElement('td');
        tdID.textContent = product.id;

        let tdName = document.createElement('td');
        tdName.textContent = product.name;

        let tdCategory = document.createElement('td');
        tdCategory.textContent = product.category;

        let tdPrice = document.createElement('td');
        tdPrice.textContent = product.price;

        let tdQuant = document.createElement('td');
        tdQuant.textContent = product.quantity;

        let tdSold = document.createElement('td');
        tdSold.textContent = product.sold;

        let tdStock = document.createElement('td');
        tdStock.textContent = product.stock;

        let tdAction = document.createElement('td');
        tdAction.classList.add('action');

        let delete_div = document.createElement('div');
        let delete_icon = document.createElement('i');
        delete_div.classList.add('delete');
        delete_icon.classList.add('material-icons');
        delete_icon.textContent = 'delete';
        delete_div.appendChild(delete_icon);
        // delete_div.addEventListener('click',removeQuestion)

        let edit_div = document.createElement('div');
        edit_div.classList.add('edit');
        let edit_icon = document.createElement('i');
        edit_icon.classList.add('material-icons');
        edit_icon.textContent = "edit";
        edit_div.appendChild(edit_icon);
        edit_div.addEventListener('click', editQuestion);

        let view_div = document.createElement('div');
        view_div.classList.add('view');
        let view_icon = document.createElement('i');
        view_icon.classList.add('material-icons');
        view_icon.textContent = "visibility";
        view_div.appendChild(view_icon);

        let chart_div = document.createElement('div');
        chart_div.classList.add('chart');
        let chart_icon = document.createElement('i');
        chart_icon.classList.add('material-icons');
        chart_icon.textContent = 'shopping_cart';
        chart_div.appendChild(chart_icon);

        tdAction.appendChild(delete_div);
        tdAction.appendChild(edit_div);
        tdAction.appendChild(view_div);
        tdAction.appendChild(chart_div);
        if (product.id != '' && product.name != '' && product.category != '' && product.price != '' && product.sold != '' && product.stock != '') {
            tRow.appendChild(tdID);
            tRow.appendChild(tdName);
            tRow.appendChild(tdCategory);
            tRow.appendChild(tdPrice);
            tRow.appendChild(tdQuant);
            tRow.appendChild(tdStock);
            tRow.appendChild(tdSold);
            tRow.appendChild(tdAction);

            newTbody.appendChild(tRow);
            table.appendChild(newTbody);
        }


    }
}

function addProduct() {
    // to check if product id is already set in the list 
    let proId = productsData.latestId;
    if (proId === null || productsData.products.length === 0) {
        proId = 1;
    } else {
        proId = proId + 1;
    }

    // update latest ID to the product list 
    productsData.latestId = proId;

    // create new product and add product to product list 
    let product = {
        id: proId,
        name: inputName.value,
        price: inputPrice.value,
        quantity: inputQuant.value,
        category: inputcategory.value,
        sold: inputSold.value,
        stock: inputStock.value,
    }

    // push new product to list product 
    productsData.products.push(product);

    // save data 
    saveProducts()

    // clear form 
    inputId = '';
    inputName.value = '';
    inputPrice.value = '';
    inputQuant.value = '';
    inputcategory.value = '';
    inputSold.value = '';
    inputStock.value = '';


}
function editQuestion(event) {
    let nameProduct = event.target.closest('tr').dataset.id;
    let editBtn = document.querySelector('.edit');

    
        inputName.value = productsData.products[nameProduct].name;
        inputPrice.value = productsData.products[nameProduct].price;
        inputQuant.value = productsData.products[nameProduct].quantity;
        inputcategory.value = productsData.products[nameProduct].category;
        inputSold.value = productsData.products[nameProduct].sold;
        inputStock.value = productsData.products[nameProduct].stock;

        editBtn.addEventListener('click', () => {
            onCreate(productsData.products[nameProduct]);
            saveProducts();
            window.location.reload();
        });
    

    show(editBtn);
    hide(addBtn);
    formHeading.textContent = 'Edit Product';
}

function onCreate(product) {
    product.name = inputName.value;
    product.category = inputcategory.value;
    product.price = inputPrice.value;
    product.quantity = inputQuant.value;
    product.stock = inputStock.value;
    product.sold = inputSold.value;
}

let productsData = {
    products: [],
    latestId: null
};
loadProducts()

renderProducts()









