module.exports = (err, req, res, next) =>{
    console.log("Error", err.message);

    res.statud(err.statusCode || 500).json({
        status:"error",
        message: err.message|| "Internal server error",
    });
};