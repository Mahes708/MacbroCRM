const mongoose =require("mongoose");

const TargetTable = new mongoose.Schema({
     
    User_id :
    {
        type: String,
        required : true
    },
    UserName :
    {
        type: String,
        required : true
    },
    From_date :
    {
        type : String,
        required :true
    },
    To_date :
    {
        type : String,
        required :true
    },
    Target:{
        type : String,
        required :true
    },

    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("Target",TargetTable);