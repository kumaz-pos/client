const mongoose= require('mongoose');


const PurchaseOrderSchema=mongoose.Schema({
    supplierName:{
        type:String,
        required:true
    },
    supplierAddress:[
        {
            plotNo:{
                type:String,
                required:true

            },
            street:{
                type:String,
                required:true

            },
            surburb:{
                type:String,
                required:true
            },
            city:{
                type:String,
                
            }

        
            
     


        }
    ],
    deliveryAddress:[
        {
            plotNo:{
                type:String,
                required:true

            },
            street:{
                type:String,
                required:true

            },
            surburb:{
                type:String,
                required:true
            },
            city:{
                type:String,
                
            }

        
            
     


        }
    ],
    supplierNumber:{
        type:String,
        required:true
    },
    
    purchaseOrderNumber:{
        type:String
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
 
 
 
totalPrice:{
    type:Number
},
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
        quantity:{
            type:Number,
            required:true

        },
        unitPrice:{
            type:Number,
            required:true

        },
        totalPrice:{
            type:Number,
            required:true

        },
       
        
 


    }
]

 

  

   


},
{
    timestamps:true
}
);

const PurchaseOrder= mongoose.model('purchase-order',PurchaseOrderSchema);

module.exports=PurchaseOrder