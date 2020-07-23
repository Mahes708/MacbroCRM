const mongoose =require("mongoose");

const EmployeeTable = new mongoose.Schema({
    photo : 
    {
        type : String        
    },
    Employee_name :
    {
        type: String,
        required : true
    },
    mobile :
    {
        type: Number,
        required : true
    },
    email :
    {
        type : String,
        required :true
    },
    password :
    {
        type : String,
        required :true
    },
    dob :
    {
        type: String,
        required : true
    },
    department :
    {
        type: String
         
    },
    experience :
    {
        type : String,
        required :true
    },
    doj :
    {
        type : String,
        required :true
    },
    address :
    {
        type : String,
        required :true
    },
    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("Employee",EmployeeTable);