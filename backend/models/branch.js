const mongoose=require("mongoose");
const Schema = mongoose.Schema;

var branchSchema=new mongoose.Schema({
    branchName:{
        type:String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true,
        unique: true
    },
    addressLine2: {
        type: String,
        required: true,
        unique: true
    },
    city : {
        type: String,
        required: true,
        unique: true
    },
    state : {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type: String,
        required: true,
        unique: true
    },
    type : {
        type: String,
    },
    contactPerson : {
        type: String,
    }
});

module.exports=mongoose.model("Branch",branchSchema);