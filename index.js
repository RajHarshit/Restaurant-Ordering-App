import { menuArray } from '/data.js'

const itemList = document.getElementById('item-list')
const cartList = document.getElementById('render-cart-items')
const hidden = document.getElementById('hidden')
const totalPrice = document.getElementById('total-price')
const cardDetails = document.getElementById('card-details')
const orderMessage = document.getElementById('order-coming-message')
let addedToCartItems = []


// Event listener for button clicks
document.addEventListener("click", function (e) {
    const buyButton = e.target.dataset.buy
    const removeButton = e.target.dataset.remove

    if (buyButton) {
        addItemsToShoppingCart(buyButton)
    }

    if (removeButton) {
        removeItemFromCart(removeButton)
    }

    if (e.target.id === 'complete-btn') { // Complete Button
        toggleVisibility(cardDetails, true) // Show card details
        toggleVisibility(hidden, false) // Hide cart section
    }

    if (e.target.id === 'back-btn') { // Back Button
        toggleVisibility(cardDetails, false) // Show order section
        toggleVisibility(hidden, true) // Show hidden section
    }
})


// Event Listener for Pay Button after form filling
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const cardName = formData.get('card-name')

    toggleVisibility(cardDetails, false) // Hide card details
    orderMessage.innerHTML = `<p class="order-message">Thanks, ${cardName}! 
        your order is on its way!</p>`

    orderMessage.classList.remove('hidden')
    addedToCartItems = []   // Clear cart
    renderCart()
    clearFormData()

    // Set timeout to hide the message and clear form data after 3 seconds
    setTimeout(() => {
        hideOrderMessage()
    }, 3000)
})


// Function to hide the order message
function hideOrderMessage() {
    orderMessage.classList.add('hidden')
}


// Function to clear form data
function clearFormData() {
    form.reset()
}


// Render Menu
function renderMenu() {
    itemList.innerHTML = menuArray.map(item => `
        <div class="shop-item-line">
            <div class="shop-item">
                <img src="${item.emoji}" alt="${item.name}" class="emoji">
                <div class="item-info">
                    <p class="item-name">${item.name}</p>
                    <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            <button data-buy="${item.id}" class="add-btn">+</button>
        </div>
    `).join("")
}


// Add item to cart
function addItemsToShoppingCart(itemId) {
    const addItem = menuArray.find(item => item.id == itemId)
    addedToCartItems.push(addItem)
    toggleVisibility(hidden, true)
    hideOrderMessage()   // Hide the order message when adding a new item
    renderCart()
}


// Remove item from cart
function removeItemFromCart(itemId) {
    addedToCartItems.splice(itemId, 1)

    if (addedToCartItems.length === 0) {
        toggleVisibility(hidden, false) // Hide cart if empty
    }
    renderCart()
}


// Calculate total price
function calculateTotalPrice() {
    const total = addedToCartItems.reduce((sum, currentItem) =>
        sum + currentItem.price, 0)
    totalPrice.textContent = `$${total}`
}


// Toggle visibility of an element
function toggleVisibility(element, show) {
    if (element) {
        if (show) {
            element.classList.remove('hidden')
        } else {
            element.classList.add('hidden')
        }
    }
}


// Render shopping cart
function renderCart() {
    cartList.innerHTML = addedToCartItems.map((item, index) => `
        <div class="cart-items">
            <div class="item-and-remove">
                <p class="cart-item-name">${item.name}</p>
                <button data-remove="${index}" class="remove-btn">remove</button>
            </div>
            <p class="cart-item-price">$${item.price}</p>
        </div>
    `).join("")
    calculateTotalPrice()
}


// Render Menu
renderMenu()
