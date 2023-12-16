let tbody = document.querySelector('tbody');
let dialog = document.querySelector('#questions-dialog');
let addBtn = document.querySelector('.add-product');
// addBtn.addEventListener('click',onAddQuestion)
let editIndex = null;
// DATA  ---------------------------------------------------------
let products = [
    {
        id: 1,
        names: "Blouse",
        category: "men",
        price: 10,
        quantity: 1,
        stock: 10,
        sold: 5,
    },
    {
        id: 2,
        names: "Shirt",
        category: "woman",
        price: 10,
        quantity: 1,
        stock: 10,
        sold: 5,
    },
    {
        id: 3,
        names: "Intimates",
        category: "woman",
        price: 10,
        quantity: 1,
        stock: 10,
        sold: 5,
    }

]

// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "block";
}

//  LOCAL STORAGE ---------------------------------------------------------
function saveProduct() {
    localStorage.setItem("products", JSON.stringify(products));
}

function laodProduct() {
    let questionsStorage = JSON.parse(localStorage.getItem("products"));
    if (questionsStorage !== null) {
        products = questionsStorage;
    }
}



function randerProduct() {


    tbody.textContent = '';

    for (let i = 0; i < products.length; i++) {
        let trbody = document.createElement('tr');
        trbody.dataset.id = i;

        let tdId = document.createElement('td');
        tdId.textContent = products[i].id;
        tdId.style.background = 'teal'

        let tdnames = document.createElement('td');
        tdnames.textContent = products[i].names;

        let tdCategory = document.createElement('td');
        tdCategory.textContent = products[i].category;
        tdCategory.style.background = 'teal';

        let tdPrice = document.createElement('td');
        tdPrice.textContent = products[i].price;
        console.log(tdPrice)

        let tdQuantity = document.createElement('td');
        tdQuantity.textContent = products[i].quantity;

        let tdStock = document.createElement('td');
        tdStock.textContent = products[i].stock;

        let tdSold = document.createElement('td');
        tdSold.textContent = products[i].sold;

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
        edit_icon.classList.add('material-icons')
        edit_icon.textContent = "edit";
        edit_div.appendChild(edit_icon);
        // edit_div.addEventListener('click', editQuestion);

        let view_div = document.createElement('div');
        view_div.classList.add('view');
        let view_icon = document.createElement('i');
        view_icon.classList.add('material-icons');
        view_icon.textContent = "visibility";
        view_div.appendChild(view_icon)

        let chart_div = document.createElement('div');
        chart_div.classList.add('chart');
        let chart_icon = document.createElement('i');
        chart_icon.classList.add('material-icons')
        chart_icon.textContent = 'shopping_cart';
        chart_div.appendChild(chart_icon)

        tdAction.appendChild(delete_div);
        tdAction.appendChild(edit_div);
        tdAction.appendChild(view_div);
        tdAction.appendChild(chart_div);

        trbody.appendChild(tdId);
        trbody.appendChild(tdnames);
        trbody.appendChild(tdCategory);
        trbody.appendChild(tdPrice);
        trbody.appendChild(tdQuantity);

        trbody.appendChild(tdStock);
        trbody.appendChild(tdSold);
        trbody.appendChild(tdAction)

        tbody.appendChild(trbody);
    }
    saveProduct()
}

laodProduct();

randerProduct();
let product = document.getElementById("search");
let trs = document.querySelector("tbody")
function renderProduct() {
    for (let tr of trs.children) {
        let productsName = tr.children[1].textContent;
        if (productsName.includes(product.value)) {
            tr.style.display="table-row"
        }else{
            tr.style.display="none"
        }
    }
}
product.addEventListener("keyup",renderProduct)
