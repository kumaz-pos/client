const mongoose= require('mongoose');


const InvoiceSchema=mongoose.Schema({
    clientName:{
        type:String,
        required:true
    },
    clientNumber:{
        type:String,
        required:true
    },
    products:[
        {
            productId:{
                type:String,
                required:true

            },
            name:{
                type:String,
                required:true

            },
            brand:{
                type:String,
                required:true
            },
            year:{
                type:String,
                
            },

             price:{
                type:Number,
                required:true

            },
            quantity:{
                type:Number,
                required:true
            },
            vat:{
                type:Boolean
            },
            grandTotal:{
                type:Number,
                required:true
            }
            
     


        }
    ],
    invoiceNumber:{
        type:String
    },
    bankDetails:[
        {
            SWIFTCode:{type:String},
            accountCurrency:{type:String},
            accountName:{type:String},

            accountNumber:{type:String},
            
            bankName:{type:String},
            
            branchCode:{type:String},
            
            country:{type:String},
            
            
            
            _id:{type:String}

        }






    ],
    vatRate:{
        type:String,
     
        required:true
    },
    vatDue:{
        type:String,
     
        required:true
    },
    totalPriceWithoutVat:{
        type:Number,
     
        required:true
    },

currency:{
    type:String,
    enum:["ZIG","USD","RANDS","PULA"],
    required:true
}
,
contactPerson:{
    type:String
 } ,
 
 
    totalPriceWithVat:{
        type:Number,
        required:true
    },
 

 
 

  

   


},
{
    timestamps:true
}
);

const Invoice= mongoose.model('invoice',InvoiceSchema);

module.exports=Invoice