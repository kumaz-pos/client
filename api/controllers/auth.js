


const {GeneratePassword, ValidatePassword, generateSignature,GenerateSalt}= require("../utils/index");
const Admin = require('../models/Admin');
const Customer = require("../models/Customer");
const bcryptjs=require("bcryptjs")

const AdminSignup=async(req,res)=>{

  
    const {email,phone,password,name,surname}=req.body;

 const salt= await GenerateSalt()

    const existingAdmin= await Admin.findOne({email});
    const userPassword= await GeneratePassword(password,salt)
  
        if (existingAdmin) {
            res.status(401).json({
                msg:"Email already in use"
            })
        }
        else if(!existingAdmin){
            const newUser= await Admin.create({
               name,surname,email,password:userPassword,phone,salt,role:"admin"
            });
            if (newUser) {
              const signature=await generateSignature({
                _id:newUser._id,
                email:newUser.email,
                phone:newUser.phone,
                isAdmin:newUser.isAdmin,
    
              })  
              res.status(201).json({
             signature,email:newUser.email,phone:newUser.phone,isAdmin:newUser.isAdmin,name:newUser.name,surname:newUser.surname})
               
    
            }
    
        }
        else{
    
            res.status(500).json({msg:"server error"})
    
        }

    

}
const AdminLogin=async(req,res)=>{
   const {email,password}= req.body;
   const existingAdmin=await Admin.findOne({email:email});
try {
    if (!existingAdmin) {
        res.status(401).json({msg:"User does not exist please sign up"})
       } else {
        const response=await ValidatePassword(password,existingAdmin.password,existingAdmin)
        if (response==="wrong details") {
            res.status(401).json({
                msg:"Wrong email or password"
            })
                }
                else{
                    const signature=await generateSignature({
                        _id:existingAdmin._id,
                        email:existingAdmin.email,
                        phone:existingAdmin.phone,
                        role:existingAdmin.role,
                    })
                    res.status(201).json({
                     
                   
                        signature:signature,
                        _id:existingAdmin._id,
                        email:existingAdmin.email,
                        phone:existingAdmin.phone,
                        role:existingAdmin.role,
                    })
                }
       }
} catch (error) {
    res.status(500).json({msg:"Server error"})
}

   
  
}

const EditAdminProfile=async(req,res)=>{
    const user=req.user;
    let id= req.params.id;
    if (user) {
        const existingAdmin =await Admin.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.json({
          email:existingAdmin.email,
          phone:existingAdmin.phone,
          isAdmin:existingAdmin.isAdmin,
          name:existingAdmin.name,
          surname:existingAdmin.surname
        })
      }
      else{
          return res.json({"msg":"Admin information not found"})
      }
}
const GetAdminProfile =async(req,res)=>{
    const user=req.user;
    if (user) {
      const existingAdmin =await Admin.findById(user._id)
      return res.json({
       
        _id:existingAdmin._id,
        email:existingAdmin.email,
        name:existingAdmin.name,
        surname:existingAdmin.surname,
        phone:existingAdmin.phone,
        isAdmin:existingAdmin.isAdmin,
      })
    }
    else{
    return res.json({"msg":"Admin profile not found"})
    }
}
const CustomerSignup=async(req,res)=>{

  
    const {email,phone,password,name}=req.body;

 const salt= await GenerateSalt()

    const existingAdmin= await Customer.findOne({email});
    const userPassword= await GeneratePassword(password,salt)
  
        if (existingAdmin) {
            res.status(401).json({
                msg:"Email already in use"
            })
        }
        else if(!existingAdmin){
            const newUser= await Customer.create({
               name,email,password:userPassword,phone,salt
            });
            if (newUser) {
              const signature=await generateSignature({
                _id:newUser._id,
                email:newUser.email,
                phone:newUser.phone,
                isAdmin:newUser.isAdmin,
    
              })  
              res.status(201).json({
             signature,email:newUser.email,phone:newUser.phone,isAdmin:newUser.isAdmin,name:newUser.name})
               
    
            }
    
        }
        else{
    
            res.status(500).json({msg:"server error"})
    
        }

    

}
const CustomerLogin=async(req,res)=>{
    const {email,password}= req.body;
    const existingAdmin=await Customer.findOne({email:email});
 try {
     if (!existingAdmin) {
         res.status(401).json({msg:"User does not exist please sign up"})
        } else {
         const response=await ValidatePassword(password,existingAdmin.password,existingAdmin)
         if (response==="wrong details") {
             res.status(401).json({
                 msg:"Wrong email or password"
             })
                 }
                 else{
                     const signature=await generateSignature({
                         _id:existingAdmin._id,
                         email:existingAdmin.email,
                         phone:existingAdmin.phone,
                         isAdmin:existingAdmin.isAdmin,
                     })
                     res.status(201).json({
                      
                    
                         signature:signature,
                         _id:existingAdmin._id,
                         email:existingAdmin.email,
                         phone:existingAdmin.phone,
                         isAdmin:existingAdmin.isAdmin,
                     })
                 }
        }
 } catch (error) {
     res.status(500).json({msg:"Server error"})
 }
 
    
   
}
const EditCustomerProfile=async(req,res)=>{
    const user=req.user;
    if (user) {
        const existingAdmin =await Customer.findByIdAndUpdate(user._id,{$set:req.body},{new:true})
        res.json({
           
            _id:existingAdmin._id,
            email:existingAdmin.email,
            phone:existingAdmin.phone,
            isAdmin:existingAdmin.isAdmin,
        })
      }
      else{
          return res.json({"msg":"Customer information not found"})
      }
}
const GetCustomerProfile =async(req,res)=>{
    const user=req.user;
    if (user) {
      const existingManager =await Customer.findById(user._id)
      return res.json({
        
        _id:existingManager._id,
        email:existingManager.email,
        phone:existingManager.phone,
        isAdmin:existingManager.isAdmin,
      })
    }
    else{
    return res.json({"msg":"Manager profile not found"})
    }
  
}
const EditAdminPassword=async(req,res)=>{
    try {
        const user=req.user;
        const {email,newPassword}=req.body;
       
     
        if (user) {
            const existingAdmin =await Admin.findOne({email})
            
       
          if (existingAdmin) {
            let salt= await bcryptjs.genSalt()
            let hashNewPassword=await bcryptjs.hash(newPassword,salt);
            console.log(hashNewPassword);
           
            existingAdmin.password= hashNewPassword;
            let updatedPassword=  await existingAdmin.save();
           
              res.json({
                  status:true,
                  message:"password updated successfully"
              });
         
          }else{
            res.status(401).json({message:"user does not exist"})
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




module.exports={
   EditAdminPassword, AdminLogin,AdminSignup,EditAdminProfile,GetAdminProfile,CustomerSignup,CustomerLogin,EditAdminProfile,EditCustomerProfile,GetCustomerProfile

}