const mongoose = require('mongoose');

const connectDB=async()=>{
  try {
    const connectionInstance=await mongoose.connect(process.env.DB_URI)
    console.log(`MongoDB will running at ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("MongoDB connection error ",error);
    process.exit(1);
  }
}




// const connectDB=()=>{
//     main().then(()=>{
//         console.log(`out server is working fine `)
//     })
    
//     async function main() {
//       await mongoose.connect(process.env.DB_URI);
//     }
// }

module.exports=connectDB;