
const Admin = require("../models/Admin");


const GetAdmins=async(req,res)=>{
    try {
        const user= req.user;
        const id= user._id;
      
       
        if (user) {
            console.log("hello");
            
            const admin= await Admin.find();
        
    res.status(200).json(admin)
  
     
  
        }
       
    } catch (error) {
    res.status(500).json({error:"server error"})
    }
 
}

const GetAdmin=async(req,res)=>{
    try {
        const user= req.user;
        const userid= user._id;
      
       const id= req.params.id
        if (userid) {
            console.log("hello");
            const admin= await Admin.findById(id);

           if (admin) {
            res.status(200).json(admin)
           }else{
            res.status(200).json([])
           }
        
    
  
     
  
        }
       
    } catch (error) {
    res.status(500).json({error:"server error"})
    }
 
}

const DeleteAdmin=async(req,res)=>{
    const id= req.params.id;
    try {
        const admin= await Admin.findByIdAndDelete(id);
        if (!admin) {
           res.status(200).json({message:`Admin with ID ${id} is not found`}) 
        }
    } catch (error) {
        res.status(500).json({message:"Server error",error})
    }
}

module.exports={DeleteAdmin,GetAdmin,GetAdmins}