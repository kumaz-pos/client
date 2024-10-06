const Developer = require('../models/Developer');
const {GeneratePassword, ValidatePassword, generateSignature,GenerateSalt}= require("../utils/index")
const bcryptjs=require('bcryptjs')

const DeveloperSignup=async(req,res)=>{

try {
    const {email,phone,password,name,surname}=req.body;

     const salt= await GenerateSalt()
    
        const existingDeveloper= await Developer.findOne({email});
        const userPassword= await GeneratePassword(password,salt)
      
            if (existingDeveloper) {
                res.status(401).json({
                    message:"Email already in use"
                })
            }
            else {
                const newUser= await Developer.create({
                   name,email,password:userPassword,phone,salt,surname,role:"developer"
                });
                if (newUser) {
                  const signature=await generateSignature({
                    _id:newUser._id,
                    email:newUser.email,
                    phone:newUser.phone,
                    role:newUser.role,
        
                  })  
                  res.status(201).json({
                  signature,
                  email:newUser.email,
                  phone:newUser.phone,
                  role:newUser.role,
                  name:newUser.name,
                surname:newUser.surname,
                
                })
                   
        
                }
        
            }  
} catch (error) {
    res.status(500).json({msg:"server error"})
}


  
           
    
}
const DeveloperSignin=async(req,res)=>{
    const {email,password}= req.body;
    const existingDeveloper=await Developer.findOne({email:email});
 try {
     if (!existingDeveloper) {
         res.status(401).json({msg:"User does not exist please sign up"})
        } else {
         const response=bcryptjs.compareSync(password,existingDeveloper.password) 
         console.log(response);
         if (response===false) {
             res.status(401).json({
                 message:"Wrong email or password"
             })
                 }
                 else{
                     const signature=await generateSignature({
                         _id:existingDeveloper._id,
                         email:existingDeveloper.email,
                         phone:existingDeveloper.phone,
                         role:existingDeveloper.role,
                         name:existingDeveloper.name,
                         surname:existingDeveloper.surname,
                     })
                     res.status(201).json({
                      
                    
                         signature:signature,
                         _id:existingDeveloper._id,
                         email:existingDeveloper.email,
                         phone:existingDeveloper.phone,
                         role:existingDeveloper.role,
                         name:existingDeveloper.name,
                         surname:existingDeveloper.surname,
                     })
                 }
        }
 } catch (error) {
     res.status(500).json({msg:"Server error"})
 }
 
    
}

const EditDeveloperProfile=async(req,res)=>{
    try {
        const user=req.user;
        if (user) {
            const existingCustomer =await Developer.findByIdAndUpdate(user._id,{$set:req.body},{new:true})
            res.json(existingCustomer)
          }
          else{
              return res.json({"msg":"Customer information not found"})
          }
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
   
}
const EditDeveloperPassword=async(req,res)=>{
    try {
        const user=req.user;
        const {oldPassword,newPassword}=req.body;
       
     
        if (user) {
            const existingDeveloper =await Developer.findOne({email:user.email})
       
            let comparePasword=bcryptjs.compareSync(oldPassword,existingDeveloper.password)
       
            if (comparePasword===true) {
                let salt= await bcryptjs.genSalt()
              let hashNewPassword=await bcryptjs.hash(newPassword,salt);
              console.log(hashNewPassword);
             
                existingDeveloper.password= hashNewPassword;
              let updatedPassword=  await existingDeveloper.save();
              console.log(updatedPassword);
                res.json({
                    status:true,
                    message:"password updated successfully"
                });
            }else{
                res.json("hello there");
            }
            
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

const GetDeveloperProfile =async(req,res)=>{
    try {
        const user=req.user;
        if (user) {
          const existingManager =await Developer.findById(user._id)
          return res.json(existingManager)
        }
        else{
        return res.json({"msg":"Developer profile not found"})
        }
    } catch (error) {
        res.status(500).json({msg:"Server error"})
    }
  
}




module.exports={
   DeveloperSignin,DeveloperSignup,EditDeveloperProfile,GetDeveloperProfile,EditDeveloperPassword
}

