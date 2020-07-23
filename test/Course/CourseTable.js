const mongoose =require("mongoose");

const CourseTable = new mongoose.Schema({
     
    course_name :
    {
        type: String,
        required : true
    },
    department :
    {
        type: String,
        required : true
    },
    certification :
    {
        type : String,
        required :true
    },
    duration :
    {
        type : String,
        required :true
    },
    training_fee :
    {
        type: String,
        required : true
    },
    aggrement :
    {
        type: String,
        required : true
    },
    up_skill :
    {
        type : String,
        required :true
    },
    fee_pay :
    {
        type : String,
        required :true
    },
    courses :
    {
        type : String,
        required :true
    },
    upgrade :
    {
        type : String,
        required :true
    },
    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("Course",CourseTable);