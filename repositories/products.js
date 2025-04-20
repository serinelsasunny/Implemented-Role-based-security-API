const pool = require("../config/db");
const productQueries = require("../queries/products");

const getProducts=()=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.getProducts, (error, result) => {
            if (error) 
                reject(error)
            else 
        resolve(result.rows)        
        });
    })
    
}

const getProductsbyId=(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.getProductsbyId,[id],(error,result)=>{
            if(error){
                reject(error)}
            else{
            resolve(result)}
        })
    })

}

const addProduct=( product_title, product_image, price, offerprice)=>{
    return new Promise((resolve,reject)=>{
        pool.query(
            productQueries.addProduct,
            [product_title, product_image, price, offerprice],
            (error, result) => {
              if (error) throw reject(error);
              else
              resolve(true)
            }
          );
    })
}

const checkProductExistsbyId=(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.getProductsbyId,[id],(error,result)=>{
            if(error){
                resolve(false)}
            else
            {
                if(result.rows.length>0)
                resolve(true)
                else
                resolve(false)
            }
        })
    })

}
const updateProductDetails = (product_title, product_image, price, offerprice,id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.updateProductDetails,[product_title, product_image, price, offerprice,id],(error,result)=>{
            if(error)
                reject(error)
            else
            resolve(result.rows)
        })
    })
}
const removeProduct = (id)=>{
    return new Promise((resolve,reject)=>{
pool.query(productQueries.removeProduct,[id],(error,result)=>{
    if(error)
        reject(error)
    else
    resolve(result.rows)
})
    })
}

module.exports = {
    getProducts,
    getProductsbyId,
    addProduct,
    checkProductExistsbyId,
    updateProductDetails,
    removeProduct
}