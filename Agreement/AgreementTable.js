const mongoose =require("mongoose");

const AgreementTable = new mongoose.Schema({
     
    Trainee_id :
    {
        type: String,
        required : true
    },
    Name :
    {
        type: String,
        required : true
    },
    Type_course :
    {
        type : String,
        required :true
    },
    Duration :
    {
        type : String,
        required :true
    },
    Comments:{
        type : String,
        required :true
    },

    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("Agreement",AgreementTable);