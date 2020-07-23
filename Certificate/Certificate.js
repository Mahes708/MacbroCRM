const express = require("express");
const router = express.Router();
const CertificateRouter = require("./CertificateTable");
 

//Add
 
router.post("/",async(req,res) => {
    var data= new CertificateRouter({ 
        candidate_id : req.body.candidate_id,
        Candidate_name : req.body.Candidate_name,
        type_course :  req.body.type_course,
        duration :  req.body.duration,
        grade :  req.body.grade         
        
    });
    await data.save();
    res.json(data);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await CertificateRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => {     
    var update = await CertificateRouter.update({_id:req.body._id}, { $set :{
        candidate_id : req.body.candidate_id,
        Candidate_name : req.body.Candidate_name,
        type_course :  req.body.type_course,
        duration :  req.body.duration,
        grade :  req.body.grade
    }});
    res.json(update);
})

//Delete
router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await CertificateRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

module.exports = router;