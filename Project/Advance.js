const express = require("express");
const router = express.Router();
const ProjectAdvanceRouter = require("./AdvanceTable"); 

//Add
 
router.post("/",async(req,res) => {
    var data= new ProjectAdvanceRouter({ 
        projectID : req.body.projectID,
        advanceDate : req.body.advanceDate,
        advanceAmt :  req.body.advanceAmt,
        client_name :  req.body.client_name,         
        project_type :  req.body.project_type,
        cost :  req.body.cost          
        
    });
    await data.save();
    res.json(data);
})

//update
router.put("/update", async(req,res) => {  
 
   var update = await ProjectAdvanceRouter.updateMany({projectID:req.body.projectID}, { $push :{
       payment: {  
       projectID : req.body.projectID, 
       PaymentDate :  req.body.PaymentDate,
       PaymentAmt :  req.body.PaymentAmt  }
   }});
   res.json(update);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await ProjectAdvanceRouter.find();
    res.json(GetAllData);
})
//View
router.get("/:id", async(req,res)=>{
    var getData  = await ProjectAdvanceRouter.findById(req.params.id);
    res.json(getData);      
 })
module.exports = router;