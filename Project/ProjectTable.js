const mongoose =require("mongoose");

const ProjectTable = new mongoose.Schema({
     
    client_name :
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
    company_name :
    {
        type : String,
        required :true
    }, 
    project_type :
    {
        type: String,
        required : true
    },
    cost :
    {
        type: Number,
        required : true
    },
    address :
    {
        type : String,
        required :true
    },
    status :
    {
        type : String,
        required :true
    },   
    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("Project",ProjectTable);