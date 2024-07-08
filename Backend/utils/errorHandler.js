class ErrorHandler extends Error{
    constructor(
        message="something went wrong",
        statusCode,
        error=[]
    ){
        super(message)
        this.statusCode=statusCode
        this.message=message
    }
}

module.exports = ErrorHandler;
