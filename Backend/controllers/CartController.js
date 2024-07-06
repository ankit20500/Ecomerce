const CartModel = require("../models/CartModel");
const asyncErrorHandler = require("../utils/AsyncErrorHandler");
const ErrorHandler=require("../utils/errorHandler")

const Add_Items_In_Cart = asyncErrorHandler(async (req, res, next) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({
                userId,
                cartItems: [{ product: productId, quantity }],
            });
        } else {
            const existingProduct = cart.cartItems.find(
                (item) => item.product.toString() === productId
            );
            if (existingProduct) existingProduct.quantity += quantity;
            else cart.cartItems.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(200).send({ success: true, message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).send({ error: "internal server error" });
    }
});

const getCartItems = asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.query;
    try {
        const cart = await CartModel.findOne({ userId })
        if (!cart) {
            return res.status(200).json({ message: "Your cart is empty. Please add items first." });
        }
        res.status(200).json(cart.cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);  // Detailed error logging
        res.status(500).send('Error fetching cart items');
    }
});

// remove the cart items with the help of the item's id
const removeItem=asyncErrorHandler(async(req,res,next)=>{
    try {
        const { userId,Id } = req.query;
        const cart=await CartModel.findOne({userId})
        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== Id);
        if(cart.cartItems.length===0){
            await CartModel.findOneAndDelete({userId})
            res.status(200).json({message:"cart deleted successful"})
        }else{
        await cart.save();
        res.status(200).json(cart.cartItems)
        }
    } catch (error) {
        return next(new ErrorHandler("something went wrong",404))
    }
})

module.exports = { Add_Items_In_Cart, getCartItems,removeItem };
