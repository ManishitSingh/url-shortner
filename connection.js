const mongoose = require('mongoose');

async function connectToMongoDB(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/url-shortner")
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);
    }
}

module.exports = connectToMongoDB;