
const mongoose =require("mongoose");

const CommandTable = new mongoose.Schema({     
  
    companyID :
    {
        type : String,
        required :true
    },
    Commanddate :
    {
        type : String,
        required :true
    },
    command :
    {
        type : String,
        required :true
    },
     
    createDate : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("CompanyCommand",CommandTable);