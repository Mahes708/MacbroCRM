const mongoose =require("mongoose");

const ExcelDataTable = new mongoose.Schema({
     
    UserName :
    {
        type: String
        
    },
    TypeOflead :
    {
        type: String
        
    },
    filePath :
    {
        type : String
        
    },
    
    createdTime : {
        type : Date,
        default : Date.now
    }    
})
module.exports = mongoose.model ("ExcelData",ExcelDataTable);