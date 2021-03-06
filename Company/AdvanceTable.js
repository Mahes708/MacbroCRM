const mongoose =require("mongoose"); 
const PaymentTable = new mongoose.Schema({
    companyID :
    {
        type: String,
        required :true         
    }, 
    PaymentDate :
    {
        type: String,
        required :true        
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
const AdvanceTable = new mongoose.Schema({     
  
    companyID :
    {
        type : String,
        required :true
    },
    advanceDate :
    {
        type : String,
        required :true
    },
    advanceAmt :
    {
        type : Number,
        required :true
    },
    client_name :
    {
        type : String,
        required :true
    },
    company_name :
    {
        type : String,
        required :true
    },
    cost :
    {
        type : Number,
        required :true
    },
    payment :   [PaymentTable],
     
    createDate : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("CompanyAdvance",AdvanceTable);