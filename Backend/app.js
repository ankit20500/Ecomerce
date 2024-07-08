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
app.use(express.json({limit:"20kb"}));
// app.use(express.urlencoded()) // in this line it gets easily accepted the date from url
                              // also like from any other url's website
                              // it is commenting bcz in the running time it shows me
                              // that body-parser deprecated like that

app.use(express.static("Public"))  // it allow the static file (like public file)                              
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