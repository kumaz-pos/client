const Manager = require('../models/Manager');
const {GeneratePassword, ValidatePassword, generateSignature,GenerateSalt}= require("../utils/index")
const bcryptjs=require("bcryptjs")
const ManagerSignup=async(req,res)=>{
    const {name,email,password,phone,surname}=req.body;

     const salt= await GenerateSalt()
    
        const existingCustomer= await Manager.findOne({email});
        const userPassword= await GeneratePassword(password,salt)
      if(typeof(name)!=='string'){
            res.status(400).json({message:"You have entered a wrong data type"})
          } 
          else if(typeof(surname)!=='string'){
            res.status(400).json({message:"You have entered a wrong data type"})
          } 
          else if(typeof(phone)!=='string'){
            res.status(400).json({message:"You have entered a wrong data type"})
          } 
          else if(typeof(password)!=='string'){
            res.status(400).json({message:"You have entered a wrong data type"})
          } 
         
            if (existingCustomer) {
                res.status(401).json({
                    msg:"Email already in use"
                })
            }
            else if(!existingCustomer){
                const newUser= await Manager.create({
                   name,email,password:userPassword,phone,salt,surname,role:"manager"
                });
                if (newUser) {
                  const signature=await generateSignature({
                    _id:newUser._id,
                    email:newUser.email,
                    phone:newUser.phone,
                    role:newUser.role,
                    
        
                  })  
                  res.status(201).json({
                  signature,email:newUser.email,phone:newUser.phone,name:newUser.name,
                surname:newUser.surname,role:newUser.role
                })
                   
        
                }
        
            }
            else{
        
                res.status(500).json({msg:"server error"})
        
            }
    
}
const ManagerSignin=async(req,res)=>{
    const {email,password}= req.body;
    
 try {
    const existingManager=await Manager.findOne({email:email});
   
     if (!existingManager) {
         res.status(401).json({message:"User does not exist please sign up"})
        }
         else {
         const response= bcryptjs.compareSync(password,existingManager.password);
         console.log(response);
         if (response===false) {
             res.status(401).json({
                 msg:"Wrong email or password"
             })
                 }
                 else{
                     const signature=await generateSignature({
                        _id:existingManager._id,
                        email:existingManager.email,
                        phone:existingManager.phone,
                        role:existingManager.role,
                        name:existingManager.name,
                        surname:existingManager.surname,
                     })
                   
                     res.status(201).json({
                      
                    
                        signature:signature,
                        _id:existingManager._id,
                        email:existingManager.email,
                        phone:existingManager.phone,
                        role:existingManager.role,
                        name:existingManager.name,
                        surname:existingManager.surname,
                     })
                 }
        }
 } catch (error) {
     res.status(500).json({msg:"Server error"})
 }
 
    
}

const EditManagerProfile=async(req,res)=>{
    const user=req.user;
    const id= req.params.id
    if (user) {
        const existingCustomer =await Manager.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.json(existingCustomer)
      }
      else{
          return res.json({"msg":"Customer information not found"})
      }
}
const GetManagerProfile =async(req,res)=>{
    const user=req.user;
    console.log(user);
    if (user) {
      const existingManager =await Manager.findById(user._id)
      return res.json(existingManager)
    }
    else{
    return res.json({"msg":"Manager profile not found"})
    }
}
const EditManagerPassword=async(req,res)=>{
    try {
        const user=req.user;
        const {email,newPassword}=req.body;
       
     
        if (user) {
            const existingManager =await Manager.findOne({email})
       console.log(existingManager);
        
           
            
                let salt= await bcryptjs.genSalt()
              let hashNewPassword=await bcryptjs.hash(newPassword,salt);
              console.log(hashNewPassword);
             
              existingManager.password= hashNewPassword;
              let updatedPassword=  await existingManager.save();
              console.log(updatedPassword);
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
const GetManagers=async(req,res)=>{
    try {
        const user=req.user;

        if (user) {
            const managers= await Manager.find();

            res.status(200).json(managers)
        }else{
            res.status(401).json({message:"User not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Server error...."})
    }
}
const GetManager=async(req,res)=>{
    try {
        const user=req.user;
        const id= req.params.id;


        if (user) {
            const manager= await Manager.findById(id);
if (!manager) {
    res.status(200).json({message:"User not found"})
}else{
    res.status(200).json(manager)
}
            

        }else{
            res.status(401).json({message:"User not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Server error...."})
    }
}
const DeleteManager=async(req,res)=>{
    try {
        const user=req.user;
        const id= req.params.id;


        if (user) {
            const manager= await Manager.findByIdAndDelete(id);
if (!manager) {
    res.status(200).json({message:"User not found"})
}else{
    res.status(200).json(manager)
}
            

        }else{
            res.status(401).json({message:"User not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Server error...."})
    }
}
module.exports={
   DeleteManager,ManagerSignin,ManagerSignup,EditManagerProfile,GetManagerProfile,EditManagerPassword,GetManager,GetManagers
}

