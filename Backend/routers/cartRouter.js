const express =require("express")
const router=express.Router()

const {isAuthencationUser}=require("../middleWares/authencation")
const {Add_Items_In_Cart,getCartItems,removeItem}=require("../controllers/CartController")


router.post("/new/cart-Items",isAuthencationUser,Add_Items_In_Cart)
router.get("/cart-Items",isAuthencationUser,getCartItems)
router.get("/delete-product-from-cart",removeItem)

module.exports= router