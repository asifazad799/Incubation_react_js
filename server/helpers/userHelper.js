let db = require('../config/connection')
let collection = require('../config/collections')
let bcrypt = require('bcryptjs')
let objectId = require('mongodb').ObjectId
const res = require('express/lib/response')

module.exports = {
    
    signUp:(data)=>{
        
        return new Promise(async(resolve,reject)=>{

            let user = await db.get().collection(collection.USERS_COLLECTIONS)
            .findOne({email:data.email})
            if(user){
                reject({user})
            }else{
                data.password = await bcrypt.hash(data.password,10)
    
                await db.get().collection(collection.USERS_COLLECTIONS)
                .insertOne(data).then(()=>{
                    resolve()
                })
            }


        })
    },

    login:(data)=>{
        return new Promise(async(resolve,reject)=>{
            // console.log(data.email)
            let user = await db.get()
            .collection(collection.USERS_COLLECTIONS)
            .findOne({email:data.email})

            console.log(user)

            if(user){
                if(user.blocked){
                    reject({userBlocked:true})
                }else{
                    bcrypt.compare(data.password,user.password).then((status)=>{
                        // console.log(status)
                        if(status){
                            resolve({logged:true,user})
                        }else{
                            reject({wrongPassword:true})
                        }
                    })
                }
            }else{
                reject({userNotFound:true})
            }

        })
    },
    submitApplication:(data)=>{
        
        return new Promise(async(resolve,reject)=>{
            // console.log(data)
            data.status='pending'
            data.userId=objectId(data.userToken.user._id)
            await db.get()
            .collection(collection.APPLICATIONS)
            .insertOne(data).then((response)=>{
                
                // console.log(response)
                if(response){

                    resolve({requestId:response.insertedId})
                }else{
                    reject()
                }

            })
        })

    },
    getStatus:(data)=>{

        return new Promise(async(resolve,reject)=>{
            let applicationStatus = await db.get()
            .collection(collection.APPLICATIONS)
            .findOne({userId:objectId(data)})

            if(applicationStatus!==''&&applicationStatus){
                let status = applicationStatus.status
                resolve({status})
            }

            if(applicationStatus==''||!applicationStatus){
                reject()
            }
        })
    }

}