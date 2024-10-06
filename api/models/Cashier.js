const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const cashierSchema= new Schema({
    email: {type:String,required:true},
    password: {type:String,required:true},
    salt:{type:String,required:true},
    phone: {type:String,required:true},
    isAdmin:{
        type:Boolean,
        default:false
    },
    name:{type:String,required:true},
    surname:{type:String,required:true},
    role:{
        type:String,required:true
    }
})

const Cashier= mongoose.model("cashier",cashierSchema);

module.exports=Cashier;