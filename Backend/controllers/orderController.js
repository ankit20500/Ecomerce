const userModel=require("../models/OrderModel");
const ErrorHandler = require("../utils/errorHandler")
const asyncErrorHandler=require("../utils/AsyncErrorHandler");
const orderModel = require("../models/OrderModel");

// create new order
const createOrder=asyncErrorHandler(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice}=req.body;

    const order=await userModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        user:req.user._id,
        paidAt:Date.now()
    })

    res.status(200).json({
        success:true,
        order
    })
})


// View the single order by user
const GetSingleOrder=asyncErrorHandler(async(req,res,next)=>{
    const order=await orderModel.findById(req.params.id).populate("user");
    if(!order){
        return next(new ErrorHandler("order not found with this id",404))
    }

    res.status(200).json({
        success:true,
        order,
    })
})


//  loggin user seen their orders
const myAllOrders=asyncErrorHandler(async(req,res,next)=>{
    const orders=await orderModel.find({user:req.user.id})
    res.status(200).json({
        success:true,
        orders,
    })
})


// get all order details ----> Admin
const GetAllOrders=asyncErrorHandler(async(req,res,next)=>{
    const orders=await orderModel.find()
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })
    
    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})

// update order status ----> Admin
const UpdateOrderStatus=asyncErrorHandler(async(req,res,next)=>{
    const order=await orderModel.findById(req.params.id)
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400))
    }

    if(!order){
        return next(new ErrorHandler("order not found"));
    }
    order.orderItems.forEach(async(items)=>{
        await updateStock(items.product, items.quantity)
    })
    order.orderStatus=req.body.Status;
    if(req.body.Status==="Delivared"){
        order.delivaredAt=Date.now();
    }
    
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,   
})
});

async function updateStock(productId, quantity){
    const findItem=await orderModel.findById(productId);
        findItem.quantity-=quantity;
        await findItem.save({validateBeforeSave:false})
}

// delete order ---->Admin
const DeleteOrder=asyncErrorHandler(async(req,res,next)=>{
    const order=await orderModel.findById(req.params.id);
    
    if(!order){
        return next(new ErrorHandler("order not found",404));
    }
    await order.Delete()
    res.status(200).json({
        success:true
    })
})

module.exports = {createOrder,GetSingleOrder,myAllOrders,GetAllOrders,UpdateOrderStatus,DeleteOrder};
