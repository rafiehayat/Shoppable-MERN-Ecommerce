const Cart = require("../models/Cart")

async function getRecord(req,res){
    try{
        let data = await Cart.find({userid:req.params.userid}).sort({_id:-1})
        res.send({status:200,result:"Done",count:data.length,data:data})
    } catch(error) {
        res.send({status:500,result:"failed",message:"Internal Server Error"})
    }
}

async function createRecord(req,res){
     try{
        const data = new Cart(req.body)
        await data.save()
       res.send({status:200,result:"Done",data:data})
     } catch (error){
         if(error.errors.userid)
        res.send({status:400,result:"failed",message:error.errors.userid.message})
        else if(error.errors.productid)
        res.send({status:400,result:"failed",message:error.errors.productid.message})
        else if(error.errors.name)
        res.send({status:400,result:"failed",message:error.errors.name.message})
        else if(error.errors.brand)
        res.send({status:400,result:"failed",message:error.errors.brand.message})
        else if(error.errors.color)
        res.send({status:400,result:"failed",message:error.errors.color.message})
        else if(error.errors.size)
        res.send({status:400,result:"failed",message:error.errors.size.message})
        else if(error.errors.price)
        res.send({status:400,result:"failed",message:error.errors.price.message})
        else if(error.errors.qty)
        res.send({status:400,result:"failed",message:error.errors.qty.message})
        else if(error.errors.total)
        res.send({status:400,result:"failed",message:error.errors.total.message})
        else if(error.errors.pic)
        res.send({status:400,result:"failed",message:error.errors.pic.message})
        else
        res.send({status:500,result:"failed",message:"Internal Server Error"})
     }
}

// async function getSingleRecord(req,res){
//     try{
//         let data = await Cart.findOne({_id:req.params._id})
//         if(data)
//         res.send({status:200,result:"Done",data:data})
//         else
//         res.send({status:404,result:"Result",message:"Record not Found"})
//     } catch(error) {
//         res.send({status:500,result:"failed",message:"Internal Server Error"})
//     }
// }

async function updateRecord(req,res){
    try{
        let data = await Cart.findOne({_id:req.params._id})
        if(data){
        data.qty = req.body.qty??data.qty
        data.total = req.body.total??data.total
        await data.save()
        res.send({status:200,result:"Done",message:"Record Updated"})
       } 
        else
        res.send({status:404,result:"Result",message:"Record Not Found"})
    } catch(error) {
        res.send({status:500,result:"failed",message:"Internal Server Error"})
    }
}
async function deleteRecord(req,res){
    try{
        let data = await Cart.findOne({_id:req.params._id})
        if(data){
        await data.deleteOne()
        res.send({status:200,result:"Done",message:"Record Deleted"})
        }
        else
        res.send({status:404,result:"Result",message:"Record not Found"})
    } catch(error) {
        res.send({status:500,result:"failed",message:"Internal Server Error"})
    }
}


module.exports = {
    getRecord:getRecord,
    createRecord:createRecord,
   // getSingleRecord:getSingleRecord,
    updateRecord:updateRecord,
    deleteRecord:deleteRecord,
}