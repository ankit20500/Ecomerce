const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const crypto=require("crypto");

const UserModel=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please enter your name"],
            maxLength:[30, "name should not more than 30 character"],
            minLength:[3, "name should greater than 3 character"],
        },
        email:{
            type:String,
            required:[true, "please enter your email"],
            maxLength:[40, "please enter your valid email"],
            minLength:[5,"please enter your valid email"],
            unique:true,
            validate:[validator.isEmail,"please enter a valid email"],
        },
        password:{
            type:String,
            required:[true,"please enter password"],
            minLength:[5,"password is less than 6 character"],
            select:false,
        },
        number:{
            type:Number,
            minLength:[10,"phone number should be 10 digits long"],
            maxLength: [10, "phone number should be 10 digits long"],
            default:"0000000000"
        },
        avatar:
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
        role:{
            type:String,
            default:"User"
        },
     
        resetPasswordToken:String,
        resetPasswordExpire:Date,
    }
)

// this pre method is running just before the save any data and when the password field is changed then it
// bcrypt our password and stored in some random strings
UserModel.pre("save",async function(next){
    if(!this.isModified("password")) next();
    this.password=await bcrypt.hash(this.password,10);
})

//compare password if user send any password 
UserModel.methods.comparePassword=async function(Password){
    return await bcrypt.compare(Password,this.password)
}

// this method is for generating the jwt token
UserModel.methods.getJWTToken=function(){
    const token= jwt.sign({id:this._id} , process.env.JWT_SECRET_TOKEN,{
        expiresIn: process.env.JWT_EXPIRE_TOKEN
    });
    return token
};


// user reset password
UserModel.methods.getResetPasswordToken=async function(){
    //generating token
    const resetToken=crypto.randomBytes(20).toString("hex");

    // hashing and add to schema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;

    return resetToken;
}


const user=mongoose.model("user",UserModel);

module.exports=user;