let formAdd = document.querySelector('#questions-dialog');
let inputName = document.getElementById('productName');
let inputId = document.getElementById('productId');
let inputPrice = document.getElementById('productPrice');
let inputQuant = document.getElementById('productQuantity');
let inputcategory = document.getElementById('categories');
let inputSold = document.getElementById('sold');
let inputStock = document.getElementById('stock');
let search = document.querySelector('.search');


let formView = document.querySelector('#main-dialog')
let nameView = document.querySelector('.name span');
let categoryView = document.querySelector('.cagegory span');
let priceView = document.querySelector('.view-price span');
let quantityview = document.querySelector('.quan span');
let stockView = document.querySelector('.view-stock span');
let soldView = document.querySelector('.view-sold span');

let formOrder = document.querySelector('.order');
let boxes = document.querySelector('.boxes');
let card = document.querySelector('.card');
let payBtn = document.querySelector('.order button');
let totalSpan = document.querySelector('.total span');


// let payBtn = d


// button 
let addBtns = document.querySelector('.add');

// tage html 
let tbodys = document.querySelector('tbody');
let tables = document.querySelector('table');

// addEventListener 

// tage 
let textForm = document.querySelector('.add-product p');
let formHeading = document.querySelector('.dialog h1')

// table
let tbody = document.querySelector('tbody');
let table = document.querySelector('table');

// button

let closeBtn = document.querySelector('.close');
let addBtn = document.querySelector('.add');
let editBtn = document.querySelector('.edit');
let editIndex = null

// addEventListener
payBtn.addEventListener('click', alertPrice);
search.addEventListener('keyup',searchName)
closeBtn.addEventListener('click', onCancel)
addBtn.addEventListener('click', addProduct);
// payBtn.addEventListener('click',getValue)

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
function onCancel() {
    hide(formView);
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
    let i = 0
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
        delete_div.addEventListener('click', deleteProduct);

        let edit_div = document.createElement('div');
        edit_div.classList.add('edit');
        let edit_icon = document.createElement('i');
        edit_icon.classList.add('material-icons');
        edit_icon.textContent = "edit";
        edit_div.appendChild(edit_icon);
        edit_div.id = i;
        edit_div.addEventListener('click', editQuestion);


        let view_div = document.createElement('div');
        view_div.classList.add('view');
        let view_icon = document.createElement('i');
        view_icon.classList.add('material-icons');
        view_icon.textContent = "visibility";
        view_div.appendChild(view_icon);
        view_div.addEventListener('click', viewInfo)

        let chart_div = document.createElement('div');
        chart_div.classList.add('chart');
        let chart_icon = document.createElement('i');
        chart_icon.classList.add('material-icons');
        chart_icon.textContent = 'shopping_cart';
        chart_div.appendChild(chart_icon);
        chart_div.addEventListener('click', rendOrder)

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
            i++
        }

        saveProducts()

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
        count:0,
    }
    if (inputName.value != '' && inputPrice.value != '' && inputQuant.value != '' && inputcategory.value != '' && inputSold.value != '' && inputStock.value != '') {
        productsData.products.push(product);
        saveProducts();
    }


    window.location.reload();

    // clear form 
    inputId = '';
    inputName.value = '';
    inputPrice.value = '';
    inputQuant.value = '';
    inputcategory.value = '';
    inputSold.value = '';
    inputStock.value = '';



}


function deleteProduct(event) {
    let index = event.target.closest('tr');
    let confirmed = confirm("Are you sure you want to delete this product");
    if (confirmed === true) {
        index.remove();
        productsData.products.splice(index, 1);
    }
    saveProducts();


}
function editQuestion(index) {

    let editBtn = document.querySelector('.edit');
    inputName.value = productsData.products[index].name;
    inputPrice.value = productsData.products[index].price;
    inputQuant.value = productsData.products[index].quantity;
    inputcategory.value = productsData.products[index].category;
    inputSold.value = productsData.products[index].sold;
    inputStock.value = productsData.products[index].stock;

    editBtn.addEventListener('click', () => {
        // onCreate(productsData.products[nameProduct]);

        productsData.products[index].name = inputName.value;
        productsData.products[index].price = inputPrice.value;
        productsData.products[index].quantity = inputQuant.value;
        productsData.products[index].category = inputcategory.value;
        productsData.products[index].sold = inputSold.value;
        productsData.products[index].stock = inputStock.value;

        saveProducts();
        window.location.reload();
    });

}

function viewInfo(event) {
    loadProducts()
    let index = event.target.closest('tr').dataset.id;

    let productIndex = productsData.products[index];
    show(formView);

    nameView.textContent = productIndex.name;
    categoryView.textContent = productIndex.category;
    quantityview.textContent = productIndex.quantity;
    priceView.textContent = productIndex.price;
    stockView.textContent = productIndex.stock;
    soldView.textContent = productIndex.sold;

    // saveProducts()

}
let productsData = {
    products: [],
    latestId: null
};
loadProducts()

renderProducts()
let editBnt = document.querySelectorAll("tbody tr td .edit");

for (let btn of editBnt) {
    btn.addEventListener("click", () => {
        show(editBtn);
        hide(addBtn);
        formHeading.textContent = 'Edit Product';
        editQuestion(btn.id)
        saveProducts()
    })
}
function rendOrder(event) {
    loadProducts();
    show(formOrder);
    hide(formAdd)
    let index = event.target.closest('tr').dataset.id;

    card.remove();
    let newCard = document.createElement('div');
    newCard.classList.add('card')
    let deleteIcon = document.createElement('div');
    deleteIcon.classList.add('deleteIcon');

    let icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.textContent = 'delete';

    deleteIcon.appendChild(icon);

    let namePd = document.createElement('div');
    namePd.classList.add('namePd');

    let spanPd = document.createElement('span');
    spanPd.textContent = productsData.products[index].name;

    namePd.appendChild(spanPd);

    let qtyPd = document.createElement('div');
    qtyPd.classList.add('qty');

    let inputQty = document.createElement('input');
    inputQty.setAttribute('type', 'number');
    inputQty.setAttribute('class', 'nbProduct');
    inputQty.value = productsData.products[index].quantity;

    qtyPd.appendChild(inputQty);

    let pricePd = document.createElement('div');
    pricePd.classList.add('pricePd');


    let spanPrice = document.createElement('span');
    spanPrice.classList.add('pdPrice');
    spanPrice.textContent = productsData.products[index].price + "$";

    pricePd.appendChild(spanPrice);

    newCard.appendChild(deleteIcon);
    newCard.appendChild(namePd);
    newCard.appendChild(qtyPd);
    newCard.appendChild(pricePd);

    boxes.appendChild(newCard);
    productsData.products[index].count +=1
    saveProducts();
    let priceValue = document.querySelectorAll('.pdPrice');
    let nbProduct = document.querySelectorAll('.nbProduct')
    let total = 0;
    let newSold = {};
    for (let i = 0; i < priceValue.length; i++) {
        let sum = 0;
        sum += parseInt(priceValue[i].textContent.replace('$', '')) * parseInt(nbProduct[i].value);
        total += sum;
        saveProducts();
        

    }
    totalSpan.textContent = total + ' $';

    saveProducts();

}

function alertPrice() {
    loadProducts();
    let alert = confirm('You want to pay it now?')
    if (alert === true) {
        hide(formOrder);
        show(formAdd)
    }

}



function searchName(e) {
    loadProducts()
    let text = e.target.value;
    let trs = document.querySelectorAll('tbody tr');

    for (let tr of trs) {
        let proName = tr.firstElementChild.nextElementSibling.textContent;
        // console.log(proName)
        if (proName.indexOf(text) !== -1) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    }

}
function closeWindow(){
    window.close();
}