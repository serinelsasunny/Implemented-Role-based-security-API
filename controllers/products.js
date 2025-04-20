const productRep = require("../repositories/products");
const errorResponse = require('../utils/errorResponse')
const asyncHandler=require('../middlewares/asynchandler')
//@desc Get the details of a product
//@route GET api/products
//access public
//used async await to handle the ppromise returned from the repository methods along with try catch to handle errors
//finally send this whole function to asyncHandler method in the asynchandler.js in the middlewares
//and then try and catch need not has to be mentioned seperately beacuse that will catch in the asyncHandler
const getProducts = asyncHandler(async (req, res, next) => {
  
  const products =await productRep.getProducts();
  res.status(200).json({success:true,data:products});
  }
 );

//@desc Get the details of a product by ID
//@route GET api/products/id
//access public
//used .then()(error) method to handle promise return from repository methods...
const getProductsbyId = (req, res, next) => {
  const id = req.params.id;
  productRep.getProductsbyId(id).then(
    (product) => {
      if (product.rows.length > 0) res.status(200).json(product.rows);
      else
      next(new errorResponse(`the record with id ${id} doesn't exist`,404))

    },
    (error) => {
      next(error)
    }
  );
};
//@desc POST(add/create) the details of a product 
//@route POST api/products/
//access public
const addProduct = (req, res, next) => {
  const newProduct = req.body;
  const {product_title, product_image, price, offerprice } =
    newProduct;
  productRep.addProduct(product_title, product_image, price, offerprice)
    .then(
      (data) => {
        res
          .status(200)
          .json({ message: "a new record is succesfully created" });
      },
      (error) => {
next(error)      }
    );
};

const updateProductDetails = async (req, res, next) => {
  const updatedProduct = req.body;
  const { product_title, product_image, price, offerprice } = updatedProduct;
  const id = req.params.id;
  const recordExist = await productRep.checkProductExistsbyId(id)
  if(recordExist)
  {
    productRep.updateProductDetails(product_title, product_image, price, offerprice,id).then(
      (productUpdated)=>{res.status(200).json({message:"successfully updated...."})},
      (error)=>{next(error)}
    )

  }
  else
  {
    next(new errorResponse(`the record with id ${id} doesn't exist`,404))
  }
 
  
};
const removeProduct = async(req, res, next) => {
  const id = req.params.id;
  const recordExist = await productRep.checkProductExistsbyId(id)
  if(recordExist)
  {
productRep.removeProduct(id).then(
  (data)=>{res.status(200).json({message:"a record is deleted successfully"})},
  (error)=>{next(error)})
  }
  else
  {
    next(new errorResponse(`the record with id ${id} doesn't exist`,404))

  }
  
};

module.exports = {
  getProducts,
  getProductsbyId,
  addProduct,
  updateProductDetails,
  removeProduct
};
