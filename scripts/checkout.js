import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-oop.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

async function loadPage(){
  try {
   //throw 'error';
   await loadProductsFetch();

   await new Promise((resolve,reject) => {
        //throw 'error';
        loadCart(() => {
        //reject('error');
         resolve();
      });
  });

  } catch(error){
    console.log('Unexpected error. please try again later.')
  }
   
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(() => {
   renderOrderSummary();
   renderPaymentSummary();
});
*/
/*
new Promise((resolve) => {
  loadProducts(() => {
     resolve();
  });
}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
   renderOrderSummary();
   renderPaymentSummary();
});
*/
/*loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/ 
