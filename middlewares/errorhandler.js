const errorHandler = (error,req,res,next)=>{
    res.status(error.statusCode || 500).json({message:error.message || 'server error'})
}

module.exports = errorHandler