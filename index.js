import {menuArray} from "./data.js"
// console.log(menuArray)

const menu = document.getElementById('menu');
const order = document.getElementById('order');
const paymentForm = document.querySelector('.payment-form');
let orderedItems = []
document.addEventListener('click', (e)=>{
    if(e.target.dataset.add){
         document.getElementById('order-complete').classList.add("hidden")
        addItem(e.target.dataset.add);
    } else if (e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    } else if(e.target.id === 'complete-order-btn') {
         document.querySelector('.payment-modal').classList.toggle('hidden')
    } 
    
})
document.addEventListener('submit', (e)=>{
        e.preventDefault();
        const paymentFormData = new FormData (paymentForm);
        document.getElementById('payer-name').textContent = paymentFormData.get('name')
        document.querySelector('.payment-modal').classList.toggle('hidden');
        document.getElementById('order').classList.toggle("hidden");
        document.getElementById('order-complete').classList.remove("hidden")
        orderedItems = []
})
function addItem(itemId) {
    const chosenItem = menuArray.filter(item => {
        return item.id == itemId
    })[0]
    // order.classList.toggle('hidden')
    orderedItems.push(chosenItem);
    render();
}
function removeItem(itemId) {
     const chosenItem = menuArray.filter(item => {
        return item.id == itemId
    })[0]
    // order.classList.toggle('hidden')
    const index = orderedItems.indexOf(chosenItem);
    orderedItems.splice(index,1);
    render()
}
function getMenuHTML() {
    let menuHTML = '';
    menuArray.forEach(item => {
        menuHTML += `
              <div class="menu-item">
                <div class="menu-item-inner">
                    <p class="item-img">${item.emoji}</p>
                     <div>
                        <div class="item-details">
                            <p class="item-name">${item.name}</p>
                            <p class="item-ingredients">${item.ingredients}</p>
                            <p class="item-price">$${item.price}</p>
                        </div>
                     </div>
                     <button class="add-item-btn" data-add="${item.id}">+</button>
                </div>
              </div>
        `
    })
    return menuHTML;
}
function getOrderHTML() {
    let orderHTML = '';
    let totalPrice = 0;
    if (orderedItems.length){
       document.getElementById('order').classList.remove('hidden');
       orderedItems.forEach(item =>{
        orderHTML +=  `<li>${item.name} <button class="remove-btn" data-remove="${item.id}">remove</button> <span>$${item.price}</span></li>`
        totalPrice += item.price
    })
    
    
    document.getElementById('order-total-price').textContent = `$${totalPrice}`;
    return orderHTML;
    } else {
        document.getElementById('order').classList.add('hidden');
    }
  
}
   
function render() {
    menu.innerHTML = getMenuHTML();
    document.getElementById('order-list').innerHTML = getOrderHTML();
}
render();