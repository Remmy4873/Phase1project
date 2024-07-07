document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const clearListButton = document.getElementById('clearListButton');
    const shoppingList = document.getElementById('shoppingList');
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
    function renderList() {
    shoppingList.innerHTML = '';
    items.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = item.name;
    listItem.classList.toggle('purchased', item.purchased);
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editItem(index));
    const markButton = document.createElement('button');
    markButton.textContent = 'Mark Purchased';
    markButton.addEventListener('click', () => togglePurchased(index));
    listItem.appendChild(editButton);
    listItem.appendChild(markButton);
    shoppingList.appendChild(listItem);
    });
    }
    function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
    items.push({ name: itemName, purchased: false });
    itemInput.value = '';
    saveAndRender();
    }
    }
    function togglePurchased(index) {
    items[index].purchased = !items[index].purchased;
    saveAndRender();
    }
    function clearList() {
    items = [];
    saveAndRender();
    }
    function editItem(index) {
    const newItemName = prompt('Edit item name:', items[index].name);
    if (newItemName) {
    items[index].name = newItemName;
    saveAndRender();
    }
    }
    function saveAndRender() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
    renderList();
    }
    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', clearList);
    renderList();
    });
    