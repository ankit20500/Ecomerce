const express=require("express");
const app=express();
const {errorMiddleware}=require("./middleWares/errors");
const cookieParser=require("cookie-parser")
const cors=require("cors");

app.use(cors())
app.use(express.json());
app.use(cookieParser());

const productRoute=require("./routers/productRoute");
const userRoute=require("../Backend/routers/userRoute");
const orderRoute=require("../Backend/routers/orderRouter");

app.use("/api/v1",productRoute);

app.use("/api/v1", userRoute);
app.use("/api/v1",orderRoute);

// use middlewares
app.use(errorMiddleware);
module.exports=app;