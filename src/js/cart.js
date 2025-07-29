import { showToast } from './common';
import { sendCartDataToBackEnd } from './backend-api';

// ===== КОРЗИНА =====
const CART_KEY = 'cart-items';

const cartBtn = document.querySelector('.header-cart .button-secondary');
const cartCount = document.querySelector('.cart-count');
const cartModalBackdrop = document.querySelector('.modal-cart-backdrop');
const cartModal = document.querySelector('.modal-cart');
const cartList = document.querySelector('.modal-cart-list');
const cartTotalSum = document.querySelector('.cart-total-sum');
const cartOrderBtn = document.querySelector('.modal-cart-order');
const cartClearBtn = document.querySelector('.modal-cart-clear');
const cartCloseBtn = document.querySelector('.modal-cart-close');

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}
function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}
function updateCartCount() {
  const items = getCart();
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;
  cartCount.style.display = count > 0 ? 'inline-block' : 'none';
}
function updateCartModal() {
  const items = getCart();
  cartList.innerHTML = '';
  let total = 0;
  if (items.length === 0) {
    cartList.innerHTML =
      '<li style="text-align:center;">The cart is empty</li>';
  } else {
    items.forEach(item => {
      total += item.price * item.qty;
      const li = document.createElement('li');
      li.className = 'modal-cart-item';
      li.innerHTML = `
        <span class="modal-cart-item-title">${item.title}</span>
        <span class="modal-cart-item-qty">  ${item.qty} ${
        item.qty > 1 ? 'items' : 'item'
      }</span>
        <span class="modal-cart-item-price">${item.price} $</span>
        <span><button class="modal-cart-item-remove" data-id="${
          item.id
        }" title="Remove">Remove</button></span>
      `;
      cartList.appendChild(li);
    });
  }
  cartTotalSum.textContent = total + ' $';
}
function openCartModal() {
  cartModalBackdrop.classList.add('show');
  document.body.classList.add('modal-open');
  updateCartModal();
}
function closeCartModal() {
  cartModalBackdrop.classList.remove('show');
  document.body.classList.remove('modal-open');
}
function addToCart({ id, title, price, qty = 1 }) {
  const items = getCart();
  const idx = items.findIndex(i => i.id === id);
  if (idx > -1) {
    items[idx].qty += qty;
  } else {
    items.push({ id, title, price, qty });
  }
  setCart(items);
  updateCartCount();
}
function removeFromCart(id) {
  let items = getCart();
  items = items.filter(i => i.id !== id);
  setCart(items);
  updateCartCount();
  updateCartModal();
}
function clearCart() {
  setCart([]);
  updateCartCount();
  updateCartModal();
}
async function orderCart() {
  const cartItems = getCart();
  await sendCartDataToBackEnd(cartItems);
  clearCart();
  updateCartModal();
  closeCartModal();
  showToast('Order is complete, thank you!', 'success');
}
// ====== EVENTS ======
cartBtn.addEventListener('click', openCartModal);
cartCloseBtn.addEventListener('click', closeCartModal);
cartModalBackdrop.addEventListener('click', e => {
  if (e.target === cartModalBackdrop) closeCartModal();
});
cartList.addEventListener('click', e => {
  if (e.target.classList.contains('modal-cart-item-remove')) {
    removeFromCart(e.target.dataset.id);
  }
});
cartClearBtn.addEventListener('click', clearCart);
cartOrderBtn.addEventListener('click', orderCart);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && cartModalBackdrop.classList.contains('show'))
    closeCartModal();
});
// ===== INIT =====
updateCartCount();

// ===== Додавання до корзини з інших модулів =====
window.addToCart = addToCart;

///

// Додаємо обробник на кнопки "До корзини"
document.querySelectorAll('.modal-books-add').forEach(btn => {
  btn.addEventListener('click', e => {
    const { id, title, price, qty } = btn.dataset;
    console.log(qty);
    window.addToCart({ id, title, price: Number(price), qty: Number(qty) });
    showToast(`"${title}" added to cart!`, 'success');
  });
});
