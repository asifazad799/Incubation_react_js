const express = require('express')
const user = require('../controller/userControllers')
const router = express.Router()
const jwt = require('jsonwebtoken')

const verfyJwt = (req,res,next)=>{

    const token = req.headers['token']
    console.log(req.headers)
    if(!token){
        res.status(401).json({
            message:'Session Expired'
        })
    }else{
        jwt.verify(token,'key',(err,decode)=>{
            if(err){
                res.status(401).json({
                    auth:false,
                    message:'Failed to authenticate'
                })
            }else{
                req.userId = decode.id;
                next()
            }
        })
    }

}

router.get('/',user.welcome)
router.post('/signup',user.signUp)
router.post('/login',user.login)
router.post('/submitapp',user.submitApplication)
router.get('/getStatus',verfyJwt,user.getStatus)

module.exports = router