const express=require("express");
const { getallProduct, createProduct, updateProduct, DeleteProduct, ProductDetail,createReview,DeleteProductReview,GetProductReviews} = require("../controllers/productControllers");
const {isAuthencationUser,authorizeRole}=require("../middleWares/authencation")

const router=express.Router();


router.get("/products", getallProduct); 

router.post("/admin/products/new",isAuthencationUser,authorizeRole("admin"), createProduct);

router.put("/admin/products/:id",isAuthencationUser,authorizeRole("admin"), updateProduct);

router.delete("/admin/products/:id",isAuthencationUser,authorizeRole("admin"), DeleteProduct);

router.get("/products/:id", ProductDetail);

router.put("/review", isAuthencationUser,createReview);

router.get("/reviews",GetProductReviews);
router.delete("/reviews",isAuthencationUser,DeleteProductReview);


module.exports=router;