const mongoose = require('mongoose');

const CartModel = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
});

const Cart = mongoose.model('Cart', CartModel);

module.exports = Cart;
