const express = require("express");
const router = express.Router();
const PaymentCompanyRouter = require("./PaymentCompanyTable");

//Add
 
router.post("/",async(req,res) => {
    var data= new PaymentCompanyRouter({ 
        client_name : req.body.client_name,
        companyID : req.body.companyID,
        PaymentDate :  req.body.PaymentDate,
        PaymentAmt :  req.body.PaymentAmt        
    });
    await data.save();
    res.json(data);
})

  

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await PaymentCompanyRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => {     
    var update = await PaymentCompanyRouter.update({_id:req.body._id}, { $set :{
        student_name : req.body.student_name,
        advance_date : req.body.advance_date, 
        student_photo :  req.body.student_photo,
        payment :  req.body.payment
    }});
    res.json(update);
})

//View
router.get("/:id", async(req,res)=>{
    var getData  = await PaymentCompanyRouter.findById(req.params.id);  
     res.json(getData);  
 
 })
 router.get("/companyID/:id", async(req,res)=>{
    var getData  = await PaymentCompanyRouter.find({companyID: req.params.id});
    res.json(getData);
      
 })


module.exports = router;