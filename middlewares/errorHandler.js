const { constants } = require('../constants');


const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; 
    console.log(statusCode);
    
    if (statusCode === constants.VALIDATION_ERROR) 
        res.json({ title: "Validation Failed!", message: err.message, stackTrace: err.stack });
    else if (statusCode === constants.UNAUTHORIZED)
        res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
    else if (statusCode === constants.NOT_FOUND)
        res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
    else if (statusCode === constants.SERVER_ERROR)
        res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
    else {
        console.log(`The status code is ${statusCode} // No error found on error handler `); 
        next();
    }

        
        

    
}

module.exports = errorHandler;