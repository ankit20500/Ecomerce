// if any function will be running then firstly it check in this below function that 
// any error occured or not if error is not there then that function will executed 
// but if error occured then it go to the original function page and then catch block
// will executed 

const asyncErrorHandler=(requestHandler)=>{
    return async(req,res,next)=>{
        try{
            await requestHandler(req,res,next);
        } catch (error){
            next(error);
        }
    };
};
module.exports=asyncErrorHandler;