
const Invoice = require("../models/Invoice");
const Product=require("../models/Products")

const GetInvoices=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        if (user) {
            const invoice= await Invoice.find().sort({_id:-1});
        
    res.status(200).json(invoice)
  
     
  
        }
    } catch (error) {
     res.status(500).json({msg:"server error"})
    }
 
}

const CreateInvoice=async(req,res)=>{
    const {clientName,clientNumber,products,invoiceNumber,bankDetails,vatRate,vatDue,totalPriceWithoutVat,currency,contactPerson,totalPriceWithVat          
    }=req.body
  


    try {

        const user= req.user;
   console.log(user);
     
        const id= user._id;
        if (user) {

            const newInvoice= await Invoice.create({
                clientName,clientNumber,products,invoiceNumber,bankDetails,vatRate,vatDue,totalPriceWithoutVat,currency,contactPerson,totalPriceWithVat 
                
            })
         
            for (let i = 0; i < products.length; i++) {
                const element = products[i];
                
                const {productId,quantity}= element;
            
                let findMatch=await  Product.findOne({_id:productId});
               
                findMatch.quantitySold= +quantity;
                findMatch.quantityRemaining=findMatch.quantityBought-quantity;
    
                await findMatch.save();
                console.log(findMatch);
              
              }
                        res.status(200).json(newInvoice)
          
        
          }
      
         else {
           res.status(401).json({msg:"user not authorized"}) 
        }
    } catch (error) {
        throw error
    }
}



const GetInvoice=async(req,res)=>{
    try {
        const id= req.params.id;
const invoice= await Invoice.findById(id);
if (invoice) {
    res.status(200).json(invoice);

}else{
    res.status(200).json({msg:"invoice not found"})
}
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}

const UpdateInvoice=async(req,res)=>{

    try {
        const id = req.params.id;
    const invoice= await Invoice.findByIdAndUpdate(id,{$set:req.body},{new:true});
    if (invoice) {
        res.status(201).json(invoice)
    } else {
        res.status(201).json({msg:"invoice not found"})
    }
    
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
    }
    const DeleteInvoice=async(req,res)=>{
        try {
            const id= req.params.id;
    const invoice= await Invoice.findByIdAndDelete(id);
    res.status(200).json({msg:"Invoice deleted succesfully"})
        } catch (error) {
            res.status(500).json({msg:"server error"})
        }
    
    }

    module.exports={
        GetInvoice,GetInvoices,CreateInvoice,UpdateInvoice,DeleteInvoice
    }