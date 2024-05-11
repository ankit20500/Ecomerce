const mongoose = require('mongoose');

const connectDB=()=>{
    main().then(()=>{
        console.log(`out server is working fine `)
    })
    
    async function main() {
      await mongoose.connect(process.env.DB_URI);
    }
}

module.exports=connectDB;