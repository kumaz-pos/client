
const Expense = require("../models/Expense");


const GetExpenses=async(req,res,next)=>{
    try {
        const user= req.user;
        const id= user._id;
        if (user) {
            const expense= await Expense.find().sort({_id:-1});
        
    res.status(200).json(expense)
  
     
  
        }
    } catch (error) {
    next(error)
    }
 
}


const CreateExpense=async(req,res,next)=>{
const {products,currency,paymentMethod,totalPrice,companyBought,buyer,companyContact}=req.body
    try {

        const user= req.user;
   console.log(user);
        const contactPerson=`${user.name} ${user.surname}`;
        const id= user._id;
        if (user) {

            const newExpense= await Expense.create({
                products,currency,paymentMethod,totalPrice,companyBought,buyer,companyContact
                
            })
         
            
                        res.status(200).json( newExpense)
          
        
          }
      
         else {
           res.status(401).json({msg:"user not authorized"}) 
        }
    } catch (error) {
        next(error)
    }
}


const GetExpense=async(req,res)=>{
    try {
        const id= req.params.id;
const expense= await Expense.findById(id);
if (expense) {
    res.status(200).json(expense);

}else{
    res.status(200).json({msg:"expense not found"})
}
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }

}

const UpdateExpense=async(req,res)=>{

    try {
        const id = req.params.id;
    const expense= await Expense.findByIdAndUpdate(id,{$set:req.body},{new:true});
    if (expense) {
        res.status(201).json(expense)
    } else {
        res.status(201).json({msg:"expense not found"})
    }
    
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
    }
    const DeleteExpense=async(req,res)=>{
        try {
            const id= req.params.id;
    const expense= await Expense.findByIdAndDelete(id);
    res.status(200).json({msg:"Expense deleted succesfully"})
        } catch (error) {
            res.status(500).json({msg:"server error"})
        }
    
    }

    module.exports={
        GetExpense,GetExpenses,CreateExpense,UpdateExpense,DeleteExpense    }