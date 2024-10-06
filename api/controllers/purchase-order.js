
const PurchaseOrder = require("../models/purchase-order");

const GetPurchaseOrders=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        if (user) {
            const purchaseOrder= await  PurchaseOrder.find().sort({_id:-1});
        
    res.status(200).json(purchaseOrder)
  
     
  
        }
    } catch (error) {
     res.status(500).json({msg:"server error"})
    }
 
}

const CreatePurchaseOrder=async(req,res)=>{
    const {supplierName,supplierAddress,deliveryAddress,supplierNumber,purchaseOrderNumber,currency,contactPerson,totalPrice,products}=req.body
  


    try {

        const user= req.user;
   console.log(user);
     
        const id= user._id;
        if (user) {

            const newPurchaseOrder= await PurchaseOrder.create({
                supplierName,supplierAddress,deliveryAddress,supplierNumber,purchaseOrderNumber,currency,contactPerson,totalPrice,products
            })
         
           
                        res.status(200).json(newPurchaseOrder)
          
        
          }
      
         else {
           res.status(401).json({msg:"user not authorized"}) 
        }
    } catch (error) {
        throw error
    }
}



const GetPurchaseOrder=async(req,res)=>{
    try {
        const id= req.params.id;
const purchaseOrder= await PurchaseOrder.findById(id);
if (purchaseOrder) {
    res.status(200).json(purchaseOrder);

}else{
    res.status(200).json({msg:"purchase order not found"})
}
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}

const UpdatePurchaseOrder=async(req,res)=>{

    try {
        const id = req.params.id;
    const purchaseOrder= await PurchaseOrder.findByIdAndUpdate(id,{$set:req.body},{new:true});
    if (purchaseOrder) {
        res.status(201).json(purchaseOrder)
    } else {
        res.status(201).json({msg:"purchase order not found"})
    }
    
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
    }
    const DeletePurchaseOrder=async(req,res)=>{
        try {
            const id= req.params.id;
    const purchaseOrder= await PurchaseOrder.findByIdAndDelete(id);
    res.status(200).json({msg:"Purchase Order deleted succesfully"})
        } catch (error) {
            res.status(500).json({msg:"server error"})
        }
    
    }

    module.exports={
        GetPurchaseOrder,GetPurchaseOrders,CreatePurchaseOrder,UpdatePurchaseOrder,DeletePurchaseOrder
    }