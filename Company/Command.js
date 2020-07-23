const express = require("express");
const router = express.Router();
const CompanyCommandRouter = require("./CommandTable"); 
 


//Post
router.post("/",async(req,res) => {
    var data= new CompanyCommandRouter({ 
        companyID : req.body.companyID,
        Commanddate : req.body.Commanddate,
        command : req.body.command
 });
    await data.save();
    res.json(data);
})

 
//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await CompanyCommandRouter.find();
    res.json(GetAllData);
})

//Command View
router.get("/companyID/:id", async(req,res)=>{
    var getData  = await CompanyCommandRouter.find({companyID: req.params.id});
    res.json(getData);
      
 })
 
 
module.exports = router;

