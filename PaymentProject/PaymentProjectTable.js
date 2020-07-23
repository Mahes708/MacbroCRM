const mongoose =require("mongoose");

const PaymentProjectTable = new mongoose.Schema({
     
    client_name :
    {
        type: String,
        required : true
    },
    projectID :
    {
        type: String,
        required : true
    },
    PaymentDate :
    {
        type: String,
        required : true
    },     
    PaymentAmt :
    {
        type : Number,
        required :true
    }, 
    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("PaymentProject",PaymentProjectTable);