const getProducts = "select * from products"
const getProductsbyId = "select * from products where product_id=$1"
const addProduct = "insert into products(product_title,product_image,price,offerprice)values($1,$2,$3,$4)"
const updateProductDetails = "update products set product_title=$1,product_image=$2,price=$3,offerprice=$4 where product_id=$5"
const removeProduct = "delete from products where product_id=$1"
module.exports ={ 
    getProducts,
getProductsbyId,
addProduct,
updateProductDetails,
removeProduct
}