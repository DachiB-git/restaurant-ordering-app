import {menuArray} from "./data.js"
// console.log(menuArray)

const menu = document.getElementById('menu');
const order = document.getElementById('order');
let orderedItems = []
document.addEventListener('click', (e)=>{
    if(e.target.dataset.add){
        addItem(e.target.dataset.add);
    } else if (e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    
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