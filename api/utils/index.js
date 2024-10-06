const bcryptjs = require('bcryptjs');
const jwt= require('jsonwebtoken');

 const GenerateSalt=async()=>{
    return await bcryptjs.genSalt()
}

 const GeneratePassword=async(password,salt)=>{
    return  bcryptjs.hash(password,salt)
}

const generateSignature=async(payload)=>{
    const signature=jwt.sign(payload,process.env.APP_SECRET,{
    expiresIn:'30d'
    })
    
    return signature
    }
   


const validateSignature=async(req)=>{
const signature= req.get('Authorization')


if (signature) {
    const payload=  jwt.verify(signature.split(' ')[1],process.env.APP_SECRET);
    if (payload) {
        req.user= payload
        return true
    }else{
        return res.status(403).json({message: 'Invalid token'})
        
    }
   
   
}else{
    return false
}

    
}
const ValidatePassword=async(enteredPassword,savedPassword,newUser)=>{
  
 if (bcryptjs.compareSync(enteredPassword,savedPassword)) {
 const signature=await generateSignature({
  _id:newUser._id,
  email:newUser.email,
  phone:newUser.phone,
  isAdmin:newUser.isAdmin,
 })

return  signature
 }
 else{
    let err="wrong details"
return  err
 }
  
    
}





module.exports={
    GeneratePassword,
    GenerateSalt,
    ValidatePassword,
    generateSignature,
    validateSignature
}