const express = require("express");
const router = express.Router();
const CompanyRouter = require("./CompanyTable");
 

//Add 
router.post("/",async(req,res) => {
    var data= new CompanyRouter({ 
        client_name : req.body.client_name,
        mobile : req.body.mobile,
        email :  req.body.email,
        company_name :  req.body.company_name,
        requirement : req.body.requirement,
        no_of_candidate : req.body.no_of_candidate            
    });
    await data.save();
    res.json(data);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await CompanyRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => {     
    var update = await CompanyRouter.update({_id:req.body._id}, { $set :{
        client_name : req.body.client_name,
        mobile : req.body.mobile,
        email :  req.body.email,
        company_name :  req.body.company_name,
        project_type : req.body.project_type,
        cost : req.body.cost,
        address :  req.body.address
    }});
    res.json(update);
})

//Delete
router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await s.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

module.exports = router;