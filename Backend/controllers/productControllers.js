const schema = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler")
const asyncErrorHandler=require("../utils/AsyncErrorHandler");
const ApiFeatures=require("../utils/Features");
const { connection } = require("mongoose");

// Create product-- admin
const createProduct = asyncErrorHandler(async (req, res) => {
    req.body.user=req.user.id;
    const product = await schema.create(req.body);
    res.status(200).json({
        success:true,
        product
    });
});


// Get all products
const getallProduct = async(req, res,next) => {
    // return next(new ErrorHandler("root not defined", 500));
    let query = schema.find();
        if (req.query.keyword) {
            const keyword = req.query.keyword.trim(); // Remove leading and trailing spaces
            query = query.find({ name: { $regex: keyword, $options: "i" } });
        }
        if (req.query.price) {
            const price = parseFloat(req.query.price); // Convert string to number
            query = query.find({ price: price });
        }

        const products=await query.exec();
        res.status(200).json({
            success: true,
            product: products
        });
};

// get product details
const ProductDetail=async(req, res,next)=>{
    const product = await schema.findById({_id:req.params.id });
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
        res.status(200).json({
            success: true,
            product 
        });
}

// update product -- for Admin
const updateProduct = async (req, res,next) => {
        let product = await schema.findById(req.params.id);
        
        if (!product) {
            return next(new ErrorHandler("product not found", 404))
        }

        product = await schema.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product 
        });
};

// delete the idems -- for Admine only
const DeleteProduct=async(req,res,next)=>{
    const product=await schema.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("prduct not found", 404))
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"product delete successful"
    })
}


// create and update review
const createReview = asyncErrorHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment:comment
    };
    const product = await schema.findById(productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.noOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(ele => {
        avg += ele.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Successfully added review",
    });
});

// get all review of a product
const GetProductReviews=asyncErrorHandler(async(req,res,next)=>{
    const product=await schema.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})


// Delete the reviews of a product
const DeleteProductReview=asyncErrorHandler(async(req,res,next)=>{
    const product=await schema.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }
    const a=req.query.id;
    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==a);
    let avg = 0;
    reviews.forEach(ele => {
        avg += ele.rating;
    });
    if(reviews.length!=0){
        const rating = avg / reviews.length;
        const noOfReviews=rating/reviews.length;
        await schema.findByIdAndUpdate(
            req.query.productId,{
            reviews,rating,noOfReviews},{
            new:true,
            runValidators:true,
            userFindAndModify:false,
        })
        res.status(200).json({
            success:true
        })
    }else{
        const rating = 0;
        const noOfReviews=0;
        await schema.findByIdAndUpdate(req.query.productId,{reviews,rating,noOfReviews},{
            new:true,
            runValidators:true,
            userFindAndModify:false,
        })
        res.status(200).json({
            success:true
        })
    }
})


module.exports = { getallProduct, createProduct, updateProduct ,DeleteProduct, ProductDetail,createReview,DeleteProductReview,GetProductReviews};