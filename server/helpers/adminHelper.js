let db = require('../config/connection')
let collection = require('../config/collections')
let objectId = require('mongodb').ObjectId

module.exports = {
    
    getApplications:()=>{

        return new Promise(async(resolve,reject)=>{
            let data = await db.get().collection(collection.APPLICATIONS)
            .find().toArray()

            
            if(data){
                resolve({data})
                console.log(data)
            }else{
                reject()
            }
        })

    },
    approveApp:(appId)=>{
        return new Promise(async(resolve,reject)=>{

            console.log(appId)
            await db.get()
            .collection(collection.APPLICATIONS).updateOne({_id:objectId(appId.appId)},{$set:{status:"approved"}})
            .then((resposne)=>{
                if(resposne){

                    resolve({updated:true})
                }else{
                    reject({notUpdated:true})
                }
            })

            
        })
    },
    slotAlocation:(data)=>{

        return new Promise(async(resolve,reject)=>{

            console.log(data)
            await db.get()
            .collection(collection.APPLICATIONS)
            .updateOne({_id:objectId(data.appId) },{$set:{slotNumber:data.slotNumber}})
            .then((response)=>{
                if(response){

                    resolve({updated:true})
                }else{
                    reject()
                }
            })

        })
    }

}