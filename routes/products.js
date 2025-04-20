const express=require("express")
const router = express.Router();
const{getProducts,getProductsbyId,addProduct,updateProductDetails,removeProduct}=require('../controllers/products')
const {jwtHandler, verifyRoles} = require('../middlewares/jwtHandler')


//jwthandler verifies the jwt token before giving permission to access products(resources)
//router.get('/',[jwtHandler],getProducts)
//router.post('/',[jwtHandler,verifyRoles(['admin'])],addProduct)

//use all the routes together using one router
//router.route('/:id').get(getProductsbyId).put(updateProductDetails).delete(removeProduct)

router.get('/',getProducts)
router.get('/:id',getProductsbyId)
router.post('/',[jwtHandler,verifyRoles(['admin'])],addProduct)
router.put('/:id',[jwtHandler,verifyRoles(['admin'])],updateProductDetails)
router.delete('/:id',[jwtHandler,verifyRoles(['admin'])],removeProduct)
module.exports = router
