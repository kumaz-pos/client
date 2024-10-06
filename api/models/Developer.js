const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    email: {type:String,required:true},
    password: {type:String,required:true},
    name:{type:String,required:true},
    surname:{type:String,required:true},
    salt: {type:String,required:true},
    phone:{type: String,required:true},
    role:{
        type:String,
        default:true
    }

},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
        }
    },
    timestamps: true
});

const Developer =  mongoose.model('developer', DeveloperSchema);

module.exports=Developer