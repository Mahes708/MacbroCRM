const mongoose =require("mongoose");

const TrainingTable = new mongoose.Schema({
     
    name :
    {
        type: String,
        required : true
    },
    mobile :
    {
        type: String,
        required : true
    },
    email :
    {
        type : String,
        required :true
    },
    dob :
    {
        type : String,
        required :true
    }, 
    college :
    {
        type: String,
        required : true
    },
    Student_Graduate :
    {
        type: String,
        required : true
    },
    passing :
    {
        type : String,
        required :true
    },
    experience :
    {
        type : String,
        required :true
    },
    course_offered :
    {
        type: String,
        required : true
    },
    fees_offered :
    {
        type: Number,
        required : true
    },
    status :
    {
        type : String,
        required :true
    },
    address :
    {
        type : String,
        required :true
    },
    remarks :
    {
        type : String 
        
    },
    exceledBy :
    {
        type : String 
        
    },
     
    createdTime : {
        type : Date,
         default : Date.now
    }    
})
module.exports = mongoose.model ("Training",TrainingTable);