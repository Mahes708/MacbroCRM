const mongoose =require("mongoose");


const PaymentTable = new mongoose.Schema({

    photo : 
    {
        type : String        
    },
    traineName :
    {
        type: String,
        required : true
    },
    traineID :
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
module.exports = mongoose.model ("Payment",PaymentTable);