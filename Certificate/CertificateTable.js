const mongoose =require("mongoose");

const CertificateTable = new mongoose.Schema({
     
    candidate_id :
    {
        type: String,
        required : true
    },
    Candidate_name :
    {
        type: String,
        required : true
    },
    type_course :
    {
        type : String,
        required :true
    },
    duration :
    {
        type : String,
        required :true
    },
    grade:{
        type : String,
        required :true
    },

    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("Certificate",CertificateTable);