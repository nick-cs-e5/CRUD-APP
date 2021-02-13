const mongoose=require("mongoose");
const Schema = mongoose.Schema;

var branchSchema=new mongoose.Schema({
    branchName:{
        type:String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    headquarter : {
        type: String,
    },
    branch: {
        type: String,
    },
    contactPerson : {
        type: String,
    }
});

module.exports=mongoose.model("Branch",branchSchema);