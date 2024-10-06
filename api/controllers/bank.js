
const Bank = require("../models/bank");


const GetBanks=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
       console.log(user);
       
        if (user) {
            console.log("hello");
            
            const bank= await Bank.find();
        console.log(bank);
    res.status(200).json(bank)
  
     
  
        }
       
    } catch (error) {
    res.status(500).json({error:"server error"})
    }
 
}


const CreateBank=async(req,res,next)=>{
const {bankName,accountName,accountNumber,accountCurrency,country,SWIFTCode,branchCode}=req.body
    try {

        const user= req.user;
   console.log(user);
        const contactPerson=`${user.name} ${user.surname}`;
        const id= user._id;
        if (user) {

            const newBank= await Bank.create({
                bankName,accountName,accountNumber,accountCurrency,country,SWIFTCode,branchCode
                
            })
         
            
                        res.status(200).json( newBank)
          
        
          }
      
         else {
           res.status(401).json({msg:"user not authorized"}) 
        }
    } catch (error) {
        next(error)
    }
}


const GetBank=async(req,res)=>{
    try {
        const id= req.params.id;
const bank= await Bank.findById(id);
if (bank) {
    res.status(200).json(bank);

}else{
    res.status(200).json({msg:"bank not found"})
}
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}

const UpdateBank=async(req,res)=>{

    try {
        const id = req.params.id;
    const bank= await Bank.findByIdAndUpdate(id,{$set:req.body},{new:true});
    if (bank) {
        res.status(201).json(bank)
    } else {
        res.status(201).json({msg:"bank not found"})
    }
    
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
    }
    const DeleteBank=async(req,res)=>{
        try {
            const id= req.params.id;
    const bank= await Bank.findByIdAndDelete(id);
    res.status(200).json({msg:"Bank deleted succesfully"})
        } catch (error) {
            res.status(500).json({msg:"server error"})
        }
    
    }

    module.exports={
        GetBank,GetBanks,CreateBank,UpdateBank,DeleteBank    }