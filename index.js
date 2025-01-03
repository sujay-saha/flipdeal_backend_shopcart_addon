const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addItemToCart(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
}

function editItemInCart(cart, productId, quantity) {
  cart.forEach((product) => {
    if (product.productId === productId) {
      product.quantity = quantity;
    }
  });
}

function deleteItemFromCart(cart, productId) {
  return cart.filter((product) => {
    return product.productId != productId;
  });
}

function getTotalPriceOfCart(cart) {
  let totalPrice = 0;
  cart.forEach((product) => {
    totalPrice += product.price;
  });
  return totalPrice;
}

function getTotalQuantityOfCart(cart) {
  let totalQuantity = 0;
  cart.forEach((product) => {
    totalQuantity += product.quantity;
  });
  return totalQuantity;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  addItemToCart(cart, productId, name, price, quantity);
  res.json({ cartItems: cart });
});

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  editItemInCart(cart, productId, quantity);
  res.json({ cartItems: cart });
});

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = deleteItemFromCart(cart, productId);
  res.json({ cartItems: cart });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

app.get('/cart/total-quantity', (req, res) => {
  let result = getTotalQuantityOfCart(cart);
  res.json({ totalQuantity: result });
});

app.get('/cart/total-price', (req, res) => {
  let result = getTotalPriceOfCart(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
