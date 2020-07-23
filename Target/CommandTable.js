const mongoose =require("mongoose");

const CommandTable = new mongoose.Schema({     
  
    TargetID :
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
module.exports = mongoose.model ("TargetCommand",CommandTable);