const express=require("express");
const router=express.Router();

const {isAuthencationUser,authorizeRole}=require("../middleWares/authencation")
const {createOrder,GetSingleOrder,myAllOrders,GetAllOrders,UpdateOrderStatus,DeleteOrder}=require("../controllers/orderController");

router.post("/order/new",isAuthencationUser,createOrder);
router.get("/orders/:id",isAuthencationUser,GetSingleOrder);
router.get("/myorders",isAuthencationUser,myAllOrders);
router.get("/admin/orders",isAuthencationUser,authorizeRole("admin"),GetAllOrders);
router.put("/admin/update/:id",isAuthencationUser,authorizeRole("admin"),UpdateOrderStatus);
router.delete("/admin/delete/:id",isAuthencationUser,authorizeRole("admin"),DeleteOrder)


module.exports=router;