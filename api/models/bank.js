const mongoose= require('mongoose');


const BankSchema=mongoose.Schema({
   
    bankName:{
        type:String,
       
        required:true
    }
    ,
accountName:{
    type:String,
   
    required:true
},
accountNumber:{
    type:String,
   
    required:true
},
accountCurrency:{
    type:String,
   
    required:true
},
country:{
    type:String,
    required:true,
  
}
,
company:{
    type:String
 } ,
SWIFTCode:{
    type:String
 } ,
branchCode:{
    type:String
 } ,
 
 
 
  

   


},
{
    timestamps:true
}
);

const Bank= mongoose.model('bank',BankSchema);

module.exports=Bank