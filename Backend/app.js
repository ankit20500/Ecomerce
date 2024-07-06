const express=require("express");
const app=express();
const {errorMiddleware}=require("./middleWares/errors");
const cookieParser=require("cookie-parser")
const cors=require("cors");

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

const productRoute=require("./routers/productRoute");
const userRoute=require("../Backend/routers/userRoute");
const orderRoute=require("../Backend/routers/orderRouter");
const cartRoute=require("../Backend/routers/cartRouter")

app.use("/api/v1",productRoute);

app.use("/api/v1", userRoute);
app.use("/api/v1",orderRoute);

app.use("/api/v1",cartRoute)

// use middlewares
app.use(errorMiddleware);
module.exports=app;