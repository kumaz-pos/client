const Cashier = require("../models/Cashier");
const bcryptjs=require("bcryptjs")
const { GenerateSalt, GeneratePassword, ValidatePassword, generateSignature } = require("../utils");

const CashierSignUp=async(req,res)=>{
    const {email,phone,password,name,surname}=req.body;
try {
    const salt= await GenerateSalt()
   
    const existingCashier= await Cashier.findOne({email});
    const userPassword= await GeneratePassword(password,salt)

        if (existingCashier) {
            res.status(401).json({
                message:"Email already in use"
            })
        }
        else if(!existingCashier){
            const newCashier= await Cashier.create({
               name,email,password:userPassword,phone,salt,surname,role:"cashier"
            });
            console.log(newCashier);
            if (newCashier) {
              const signature=await generateSignature({
                _id:newCashier._id,
                email:newCashier.email,
                phone:newCashier.phone,
                role:newCashier.role,
                surname:newCashier.surname,
                name:newCashier.name,
    
              })  
              res.status(201).json({
              
                _id:newCashier._id,
                email:newCashier.email,
                phone:newCashier.phone,
                role:newCashier.role,
                surname:newCashier.surname, 
                name:newCashier.name, 
            signature:signature
            })
               
    
            }
    
        }
} catch (error) {
    res.status(500).json({message:"server error"})
}
   
  

  
           
           
                   
        
              
          
}
const CashierSignIn=async(req,res)=>{
    const {email,password}= req.body;
    
   
 try {
//console.log("hello");
    const existingCashier=await Cashier.findOne({email});
     if (!existingCashier) {
         res.status(401).json({message:"User does not exist please sign up"})
        } else {
            
         const response= bcryptjs.compareSync(password,existingCashier.password) 
         console.log(response);

         if (response===false) {
             res.status(401).json({
                 message:"Wrong email or password"
             })
                 }
                 else{
                     const signature=await generateSignature({
                         _id:existingCashier._id,
                         email:existingCashier.email,
                         phone:existingCashier.phone,
                         isAdmin:existingCashier.isAdmin,
                         name:existingCashier.name,
                         surname:existingCashier.surname,
                     })
                     res.status(201).json({
                      
                    
                         signature:signature,
                         _id:existingCashier._id,
                         email:existingCashier.email,
                         phone:existingCashier.phone,
                         isAdmin:existingCashier.isAdmin,
                         name:existingCashier.name,
                         surname:existingCashier.surname,
                         role:existingCashier.role,
                     })
                 } 
        }
 } catch (error) {
     res.status(500).json({message:"Server error"})
 }
  
  
}

const EditCashierPassword=async(req,res)=>{
    try {
        const user=req.user;
        const {newPassword,cashierEmail}=req.body;
       console.log(user);
     
        if (user) {
            const existingCashier =await Cashier.findOne({email:cashierEmail})
       console.log(existingCashier);
            
            
                let salt= await bcryptjs.genSalt()
              let hashNewPassword=await bcryptjs.hash(newPassword,salt);
              console.log(hashNewPassword);
             
              existingCashier.password= hashNewPassword;
              let updatedPassword=  await existingCashier.save();
           
                res.json({
                    status:true,
                    message:"password updated successfully"
                });
            
            
         // console.log(existingCustomer);
         ///   res.json(existingDeveloper)
          }
          else{
              return res.json({"msg":"Customer information not found"})
          }
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
   
}

const GetCashiers=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        if (user) {
            const cashiers= await Cashier.find();
        
    res.status(200).json(cashiers)
  
     
  
        }
    } catch (error) {
     res.status(500).json({msg:"server error"})
    }
 
}
const DeleteCashier=async(req,res)=>{
    try {
        const user= req.user;
        const id= req.params.id;
        if (user) {
            const cashiers= await Cashier.findByIdAndDelete(id);
        if (cashiers) {
            res.status(200).json({message:"Cashier has been delete"})
        }else{
res.status(200).json({message:"Cashier is not found "})
        }
   
  
     
  
        }
    } catch (error) {
     res.status(500).json({msg:"server error"})
    }
 
}
const GetCashier=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
        let cashierId=req.params.id
        if (user) {
            const cashier= await Cashier.findById(cashierId);
        if (cashier) {
            res.status(200).json(cashier)
        }else{
            res.status(200).json({message:"User not found"})
        }
    
  
     
  
        }
    } catch (error) {
     res.status(500).json({msg:"server error"})
    }
 
}
const EditCashierProfile=async(req,res)=>{
    const user=req.user;
    const id= req.params.id
    if (user) {
        const existingCustomer =await Cashier.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.json(existingCustomer)
      }
      else{
          return res.json({"msg":"Customer information not found"})
      }
}

module.exports={
    CashierSignUp,CashierSignIn, EditCashierPassword,GetCashiers,EditCashierProfile,GetCashier,DeleteCashier
}