
const Quotation = require("../models/Quotations");


const GetQuotations=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        if (user) {
            const sales= await Quotation.find().sort({_id:-1});
        
    res.status(200).json(sales)
  
     
  
        }
    } catch (error) {
     res.status(500).json({msg:"server error"})
    }
 
}


const CreateQuotation=async(req,res)=>{
    const {prospectName,prospectNumber,products,quotationNumber,bankDetails,vatRate,vatDue,totalPriceWithoutVat,currency,contactPerson,totalPriceWithVat          
    }=req.body
  


    try {

        const user= req.user;
   console.log(user);
     
        const id= user._id;
        if (user) {

            const newQuotation= await Quotation.create({
                prospectName,prospectNumber,products,quotationNumber,bankDetails,vatRate,vatDue,totalPriceWithoutVat,currency,contactPerson,totalPriceWithVat 
                
            })
         
            
                        res.status(200).json(newQuotation)
          
        
          }
      
         else {
           res.status(401).json({msg:"user not authorized"}) 
        }
    } catch (error) {
        throw error
    }
}


const GetQuotation=async(req,res)=>{
    try {
        const id= req.params.id;
const quotation= await Quotation.findById(id);
if (quotation) {
    res.status(200).json(quotation);

}else{
    res.status(200).json({msg:"quotation not found"})
}
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}

const UpdateQuotation=async(req,res)=>{

    try {
        const id = req.params.id;
    const quotation= await Quotation.findByIdAndUpdate(id,{$set:req.body},{new:true});
    if (quotation) {
        res.status(201).json(quotation)
    } else {
        res.status(201).json({msg:"quotation not found"})
    }
    
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
    }
    const DeleteQuotation=async(req,res)=>{
        try {
            const id= req.params.id;
    const quotation= await Quotation.findByIdAndDelete(id);
    res.status(200).json({msg:"quotation deleted succesfully"})
        } catch (error) {
            res.status(500).json({msg:"server error"})
        }
    
    }

    module.exports={
        GetQuotation,GetQuotations,UpdateQuotation,DeleteQuotation,CreateQuotation
    }