const express = require("express");
const router = express.Router();
const CompanyAdvanceRouter = require("./AdvanceTable"); 

//Add

router.post("/",async(req,res) => {
    var data= new CompanyAdvanceRouter({ 
        companyID : req.body.companyID,
        advanceDate : req.body.advanceDate,
        advanceAmt :  req.body.advanceAmt,
        client_name :  req.body.client_name,         
        company_name :  req.body.company_name,
        cost :  req.body.cost          
        
    });
    await data.save();
    res.json(data);
})

//update
router.put("/update", async(req,res) => {     
  var update = await CompanyAdvanceRouter.updateMany({companyID:req.body.companyID}, { $push :{
      payment: {  
      companyID : req.body.companyID, 
      PaymentDate :  req.body.PaymentDate,
      PaymentAmt :  req.body.PaymentAmt  }
  }});
  res.json(update);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await CompanyAdvanceRouter.find();
    res.json(GetAllData);
})
//View
router.get("/:id", async(req,res)=>{
    var getData  = await CompanyAdvanceRouter.findById(req.params.id);
    res.json(getData);      
 })
module.exports = router;