const mongoose =require("mongoose");

const PaymentTable = new mongoose.Schema({
   
    traineID :
    {
        type: String,
        required :true 
        
    }, 
    photo:{
        type: String,
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
  
    traineID :
    {
        type : String,
        required :true
    },
    PaymentID :
    {
        type : String
       
    },
    photo:{
        type: String,
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
    traineName :
    {
        type : String,
        required :true
    },
    course_offered :
    {
        type : String,
        required :true
    },
    fees_offered :
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
module.exports = mongoose.model ("TraineAdvance",AdvanceTable);