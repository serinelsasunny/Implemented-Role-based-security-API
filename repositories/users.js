const pool = require('../config/db')
const userQueries = require('../queries/users')
const {hashPassword}=require('../utils/passwordHelper')

const addUser=(name,username, password)=>{
    const hashedPassword = hashPassword(password)
    return new Promise((resolve,reject)=>{
        pool.query(
            userQueries.addUser,
            [name,username,hashedPassword],
            (error, result) => {
              if (error) 
                 reject(error);
              else
              {
              const userId = result.rows?result.rows[0].user_id:undefined
              resolve(userId)
              }
            }
          );
    })
}

const getUserbyUsername=(username)=>{
    return new Promise((resolve,reject)=>{
        pool.query(userQueries.getUserbyUsername,[username],(error,result)=>{
            if(error){
                reject(error)}
            else{

            resolve(result.rows)}
        })
    })

}

const getUserbyUserId=(userId)=>{
    return new Promise((resolve,reject)=>{
        pool.query(userQueries.getUserbyUserId,[userId],(error,result)=>{
            if(error){
                reject(error)}
            else{

            resolve(result.rows)}
        })
    })

}

const getUserRolesbyId=(userId)=>{
    return new Promise((resolve,reject)=>{
        
        pool.query(userQueries.getuserRolesbyId,[userId],(error,result)=>{
            if(error){
                reject(error)}
            else{

            resolve(result.rows)}
        })
    })

}

    module.exports = {
        addUser,
        getUserbyUsername,
        getUserbyUserId,
        getUserRolesbyId
    }