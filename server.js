const dotenv = require('dotenv')
const express = require("express")
dotenv.config({path:'./config/config.env'})
const errorHandler = require('./middlewares/errorhandler')

const app=express()
app.use(express.json())

//creating logger using pino logger
/*********************************************8 */
const logger = require('./middlewares/logger')
app.use(logger)

const products=require('./routes/products')
app.use('/api/products',products)

const users = require('./routes/users')
app.use('/api/users',users)


//using(hooking) error handling middleware 

app.use(errorHandler)


const PORT=process.env.SERVER_PORT||8000
app.listen(PORT,()=>{
    console.log("listening on port:",PORT)
})

