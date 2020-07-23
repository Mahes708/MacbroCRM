const mongoose =require("mongoose");

const PaymentTable = new mongoose.Schema({
     
    client_name :
    {
        type: String,
        required : true
    },
    companyID :
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
module.exports = mongoose.model ("PaymentCompany",PaymentTable);