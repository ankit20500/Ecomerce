const mongoose=require("mongoose");

const productModel=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please enter the name"],
            trim:true,
        },
        description:{
            type:String,
            required:[true, "please enter the discription"],
        },
        price:{
            type:Number,
            required:[true, "please enter price"],
            maxLength:[8,"price not exceed by 8 character"],
        },
        image:[
            {
            public_id:{
                type: String,
                required: true,
            },
            url:{
                type:String,
                required: true,
            },
        },
    ],
    category:{
        type:String,
        required:[true,"enter product category"],
    },
    stock:{
        type:Number,
        required:[true,"enter product stock"],
        maxLength:[4,"not exceed 4 numbers"],
        default:1,
    },
    ratings:{
        type: Number,
        default:0,
    },
    noOfReviews:{
        type:Number,
        default:0,
    },
    reviews: {
        type: [{
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }],
        default: []
    },
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     required:true
    // },
    createrAt:{
        type:Date,
        default: Date.now,
    },

    },
)


const schema=mongoose.model("schema", productModel);
module.exports=schema;