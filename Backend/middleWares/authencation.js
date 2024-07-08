// Authencation section
const jwt=require("jsonwebtoken");
const User=require("../models/UserModel");
const asyncErrorHandler=require("../utils/AsyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

const isAuthencationUser = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (token==undefined) {
        return next(new ErrorHandler("Please login to access these resources", 401));
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        const user = await User.findById(decodedData.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHandler("Please login again.", 401));
    }
});


// authorize the role 
// const authorizeRole =async(req,res,next) => {
//     const { token } = req.cookies;
//     if (!token) {
//         return res.status(401).json("Please login");
//     } else {
//         try {
//             const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//             const id = decodedData.id;
//             const user = await User.findById(id);
//             if (!user) {
//                 return res.status(401).json("User not found");
//             }
//             if (user.role === "admin") {
//                 next();
//             } else {
//                 return res.status(401).json("Unauthorized: Not an admin");
//             }
//         } catch (error) {
//             return res.status(401).json("you are Unauthorized to process this");
//         }
//     }     
// };


//2nd method is to authorize
const authorizeRole = (...roles) => {
    return async (req, res, next) => {
            if (roles[0]!=req.user.role) {
                return next(new ErrorHandler("You are not authorized to access this", 403));
            }
            next();
    };
};


module.exports={isAuthencationUser,authorizeRole};