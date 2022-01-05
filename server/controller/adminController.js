const { response } = require('express');
const res = require('express/lib/response');
const adminHelper = require('../helpers/adminHelper');
const generateToken = require('../util/generateToken');

module.exports={
    
    Login:(req,res)=>{

        console.log(req.body)
        let admin= "asif@mail.com"
        let password = "123"
        if(req.body.email==admin&&req.body.password){
            res.json({
                token:generateToken(admin)
            })
        }else{
            res.status(401).json({
                message:'Invalid user name or passwors'
            })
        }

    },
    getApplications:async(req,res)=>{

        adminHelper.getApplications().then((response)=>{
            res.json({
                data:response.data
            })
        }).catch(()=>{
            res.status(401).json({
                message:'Data not found'
            })
        })

    },
    approveApplication:(req,res)=>{
        // console.log(req.body)
        
        adminHelper.approveApp(req.body).then((response)=>{

            res.json({
                message:"updated"
            })

        }).catch((error)=>{
            res.status(401).json({
                messgae:"not updated"
            })
        })
    },
    slotAlocation:(req,res)=>{

        // console.log(req.body)
        adminHelper.slotAlocation(req.body).then((response)=>{

            res.json({
                message:"Slot Alocated"
            })
        }).catch((error)=>{
            res.status(401).json({
                message:"Slot Not Alocated"
            })
        })

    }

}