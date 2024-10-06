const mongoose = require('mongoose');

const dotenv= require("dotenv")
dotenv.config()
module.exports = async() => {

    try {
     
      
        console.log('Db Connected');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
 
};


async function connect(url) {
    try {
        await mongoose.connect(url, {
           
        });
        console.log("DB CONNECTED");
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
 
}

module.exports=connect