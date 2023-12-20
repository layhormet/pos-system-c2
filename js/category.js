let dialog_catagory = document.getElementById("category-dialog");
let table = document.querySelector("table")
let btnAddcategory = document.getElementById("btn-add");
btnAddcategory.addEventListener("click", Addcategory);
let searchCategory = document.getElementById("search");

let editIndex = null;



let productData = JSON.parse(localStorage.getItem("product"));
console.log(productData)


function saveCategory() {
    localStorage.setItem("category", JSON.stringify(CategoryData.category));

}

function loadCategory() {
    let categoryStorage = JSON.parse(localStorage.getItem("category"));
    if (categoryStorage !== null) {
        CategoryData.category = categoryStorage;
    }
}


function hid(element) {
    element.style.display = "none";

}
function show(element) {
    element.style.display = "block";

}
function renderCategory() {
    let tbody = document.querySelector("tbody");
    tbody.remove();

    let Newtbody = document.createElement("tbody");
    let datas = 0;

    for (let data of CategoryData.category) {

        let tRows = document.createElement("tr");
        tRows.dataset.index = datas

        let tdId = document.createElement("td");
        tdId.textContent = data.id;

        let tdName = document.createElement("td");
        tdName.textContent = data.name;
        let tdPrice = document.createElement("td");
        tdPrice.textContent = data.price;
        
        
        let tdAction = document.createElement("td");
        
        let Delete = document.createElement("i");
        Delete.classList.add("material-icons");
        Delete.textContent = "delete";
        Delete.addEventListener("click", DeleteCategory)

        let IEdit = document.createElement("i");
        IEdit.classList.add("material-icons");
        IEdit.textContent = "edit";
        IEdit.addEventListener("click", editCategory)

        tdAction.appendChild(Delete);
        tdAction.appendChild(IEdit);

        tRows.appendChild(tdId)
        tRows.appendChild(tdName);
        tRows.appendChild(tdPrice)
        tRows.appendChild(tdAction)

        Newtbody.appendChild(tRows);
        datas += 1;

    }

    table.appendChild(Newtbody);
}

function editCategory(event) {
    
    let index = event.target.parentElement.parentElement.dataset.index;
    let categorys = CategoryData.category[index];
    document.getElementById("name").value = categorys.name;
    document.getElementById("price").value = categorys.price;
    let editHeader = document.querySelector("header");
    editHeader.textContent = "Edit Category";
    let btnEdit = document.querySelector("menu").lastElementChild;
    btnEdit.textContent = "Edit";

    editIndex = index
    show(dialog_catagory);
}


function Addcategory() {
    show(dialog_catagory)
}

function OnCancel() {
    hid(dialog_catagory)
}

function OnAdd() {

    hid(dialog_catagory)
    let categoryId = CategoryData.lastestId;
    if (categoryId === null || CategoryData.category.length === 0) {
        categoryId = 1;

    }
    else if (editIndex === null) {
        categoryId = categoryId + 1
    }
    else {
        categoryId = categoryId
    }

    CategoryData.lastestId = categoryId;
    let categories = {};
    categories.id = categoryId;
    categories.name = document.getElementById("name").value;
    categories.price = document.getElementById("price").value;
    if (editIndex === null) {
        CategoryData.category.push(categories);
    }
    else {
        CategoryData.category[editIndex] = categories;
    }

    editIndex = null;

    let addHeader = document.querySelector("header");
    addHeader.textContent = "Create Category";
    let btnAdd = document.querySelector("menu").lastElementChild;
    btnAdd.textContent = "Add";



    saveCategory()

    renderCategory()
}

function DeleteCategory(event) {

    let index = event.target.parentElement.parentElement.dataset.index;
    CategoryData.category.splice(index, 1);
    renderCategory();
    saveCategory();
    

}

let CategoryData = {
    category: [],
    lastestId: null,
}

loadCategory()

renderCategory()



