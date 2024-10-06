const mongoose= require('mongoose');


const ExpenseSchema=mongoose.Schema({
   
    products:[
        { 
            id:{
            type:String,
            required:true

        },
           
            name:{
                type:String,
                required:true

            },
           

             unitPrice:{
                type:Number,
                required:true

            },
            quantity:{
                type:Number,
                required:true
            }
            
     


        }
    ],
currency:{
    type:String,
    enum:["ZIG","USD","RANDS","PULA"],
    required:true
},
paymentMethod:{
    type:String,
    required:true,
    enum:["Ecocash","Swipe","Cash"]
}
,
companyBought:{
    type:String
 } ,
companyContact:{
    type:String
 } ,
 
 
    totalPrice:{
        type:Number,
        required:true
    },
   buyer:{
        type:String,
        required:true
    }

  

  

   


},
{
    timestamps:true
}
);

const Expense= mongoose.model('expense',ExpenseSchema);

module.exports=Expense