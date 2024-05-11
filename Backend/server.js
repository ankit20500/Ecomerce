const app = require("./app");

const dotenv=require("dotenv");

const connectDB=require("./dataBase");
dotenv.config();


const PORT=process.env.PORT;
connectDB();

process.on("uncaughtException", err=>{
    console.log(`error: ${err.message}`);
    console.log("Shut downing the server due to uncaught Exception");
        process.exit(1);
})

app.listen(PORT, ()=>{
    console.log(`server is starting on http://localhost:${PORT}`);
})

process.on("unhandledRejection",err=>{
    console.log(`error: ${err.message}`);
    console.log("Shut downing the server due to some unhandle Rejection");
        process.exit(1);
})

