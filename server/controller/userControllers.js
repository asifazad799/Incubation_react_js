const { response } = require('express');
const res = require('express/lib/response');
let userHelper = require('../helpers/userHelper');
const generateToken = require('../util/generateToken');
// const jwt = require('jsonwebtoken')

module.exports = {

    signUp: async(req,res)=>{
        let data = req.body;

        userHelper.signUp(data).then(()=>{

            res.status(201).json({
               message:'done'
            })
        
        }).catch((response)=>{
            if(response.user){
                res.status(401).json({
                    message:'User already exist'
                })
                // throw new Error('User alredy exist')
            }
        })
    },
    
    login:async(req,res)=>{

        let data = req.body;
        //console.log(data)
        userHelper.login(data).then(async(response)=>{
            if(response.logged){
                let user = response.user
                res.json({
                    user,
                    message:'User looged in',
                    token:generateToken(user._id)
                })
            }
        }).catch((response)=>{
            if(response.userBlocked){
                res.status(400).json({
                    message:'User blocked'
                })
            }

            if(response.wrongPassword){
                res.status(401).json({
                    message:"Wrogn password"
                })
            }

            if(response.userNotFound){
                res.status(404).json({
                    message:'User not found'
                })
            }
        })
    },

    submitApplication:async(req,res)=>{
        
        // console.log(req.body)
        userHelper.submitApplication(req.body).then((response)=>{
            
            res.json({
                requestId:response.requestId,
                message:'Application submited successfully'
            })

        }).catch(()=>{
            
            res.status(500).json({
                message:`Sorry application didn't submited`
            })

        })

    },
    getStatus:async(req,res)=>{

        let userId = req.query.userId
        
        userHelper.getStatus(userId).then((response)=>{
            //console.log(response.status)
            res.json({
                status:response.status
            })
        }).catch(()=>{
            res.status(401).json({
                message:'data not Found'
            })
        })

    },
    welcome:async (req,res)=>{
        
        res.json({
            message:'haai'
        })
    
    }
}
