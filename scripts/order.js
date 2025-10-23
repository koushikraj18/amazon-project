import {loadProductsFetch,getProduct} from '../data/products.js';
import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {formatMoney} from './utils/money.js';
import {cart,saveToStorage} from '../data/cart.js';

function renderOrders(){

  let orderItemHTML ='';

  orders.forEach((orderItem) => {
    const orderId = orderItem.id; 

    const total = orderItem.totalCostCents;

    const orderPlaced = orderItem.orderTime;

    const date = new Date(orderPlaced);
    const orderDate = date.toLocaleDateString('en-US',{month:'long', day:'numeric'});

    orderItemHTML += `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatMoney(total)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>
          
        <div class="order-details-grid js-order-details">
          ${orderProducts(orderId)}
        </div>
      </div>
      `;
  });

function orderProducts(orderId){
  let productHTML='';
  
  const order = orders.find(item => item.id === orderId);
  if(!order) return '';

  order.products.forEach((items) => {

      const productId = items.productId;
      
      const matchingProduct = getProduct(productId);
      
      const quantity = items.quantity;

      const arriving = items.estimatedDeliveryTime;

      const ate = new Date(arriving);
      const arrivingDate = ate.toLocaleDateString('en-US',
        {month:'long',day:'numeric'}) ;  

      productHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${arrivingDate}
          </div>
          <div class="product-quantity">
            Quantity: ${quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
      });
 
  return productHTML;
 }


 document.querySelector('.js-orders-grid').innerHTML = orderItemHTML;
 saveToStorage();
}
loadProductsFetch().then(() =>{
  renderOrders();
});
function updateCart(){
  
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}
updateCart();
