const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('BD 3.4 - Assignment');
});

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Endpoint 1: Add an Item to the Cart
function addNewItem(cart, productId, name, price, quantity) {
  cart.push({ productId, name, price, quantity });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = req.query.productId;
  let name = req.query.name;
  let price = req.query.price;
  let quantity = req.query.quantity;
  let cartItems = addNewItem(cart, productId, name, price, quantity);
  res.json({ cartItems });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
function editItem(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = req.query.quantity;
  let cartItems = editItem(productId, quantity);
  res.json({ cartItems });
});

// Endpoint 3: Delete an Item from the Cart
function deleteItemById(cart, productId) {
  return cart.productId != productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let cartItems = cart.filter((cart) => deleteItemById(cart, productId));
  res.json({ cartItems });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  let cartItems = cart;
  res.json({ cartItems });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
function calculateTotalQuantity() {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].quantity;
  }
  return sum;
}

app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = calculateTotalQuantity();
  res.json({ totalQuantity });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
function calculateTotalPrice() {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum = sum + cart[i].price;
  }
  return sum;
}

app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateTotalPrice();
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
