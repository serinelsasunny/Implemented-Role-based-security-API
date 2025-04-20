const pino = require("pino")
const pinologger = require("pino-http")
const logger = pinologger({
    logger:pino(),
    //generated ID with logger
//     genReqId:function (req,res){
// if(req.id) return req.id;
// let id=req.get('X-Request-Id')
// if(id) return id
// id=randomUUID()
// res.header('X-request-Id',id)
// return id
//     }
})
module.exports=logger