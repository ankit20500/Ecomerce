const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./dataBase");
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        process.on("uncaughtException", err => {
            console.log(`error: ${err.message}`);
            console.log("Shutting down the server due to uncaught Exception");
            process.exit(1);
        });

        app.listen(PORT, () => {
            console.log(`server is starting on https://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.log("Mongodb connection failed ", error);
    });

process.on("unhandledRejection", err => {
    console.log(`error: ${err.message}`);
    console.log("Shutting down the server due to some unhandled Rejection");
    process.exit(1);
});




// app.listen(PORT, ()=>{
   
//     console.log(`server is starting on http://localhost:${PORT}`);
// })


