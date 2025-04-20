const express=require("express")
const router = express.Router()

const{addUser,loginUser}=require('../controllers/users')

router.post('/login',loginUser)
router.post('/',addUser)
//router.get('/',addUser)
//router.get('/login',loginUser)
//router.post('/',addUser)
//router.post('/',addUser)
//use all the routes together using one router
//router.route('/:id').get(getProductsbyId).put(updateProductDetails).delete(removeProduct)


module.exports = router