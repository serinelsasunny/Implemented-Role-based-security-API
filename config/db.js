const {Pool}=require('pg')

const pool = new Pool({
    user: 'productsdb_user',
    password:'productsdb_test',
    host:'localhost',
    port:5432,
    database:'e-commdb',
})
module.exports=pool