const validateUser = (req, res, next) => {
    let reqFields = ["Username","Password"];
    let errMsg = {message: "validation error",
                invalid: []};
    let arr = errMsg.invalid;
    checkProps(reqFields, req.body, arr);
    if (arr.length) { 
        return res.status(400).json(`Message: ${errMsg.message}. Invalid entries for: ${errMsg.invalid.join(', ')}`); 
    };    
    next();
};

export { validateUser }; 