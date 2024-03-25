const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    originalUrl:{
        type:String,
        required:true
    },
    visitedHistory:[{timestamps:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true});

const Url = mongoose.model('Url',urlSchema);
module.exports = Url;