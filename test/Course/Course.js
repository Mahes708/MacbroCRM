const express = require("express");
const router = express.Router();
const CourseRouter = require("./CourseTable");

//Add

router.post("/",async(req,res) => {
    var data= new CourseRouter({
        course_name : req.body.course_name,
        department : req.body.department,
        certification : req.body.certification,
        duration : req.body.duration,
        training_fee : req.body.training_fee,
        aggrement : req.body.aggrement,
        up_skill : req.body.up_skill,
        fee_pay : req.body.fee_pay,
        courses : req.body.courses,
        upgrade : req.body.upgrade
        
    });
    await data.save();
    res.json(data);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllCourse = await CourseRouter.find();
    res.json(GetAllCourse);
})

//Update
router.put("/update", async(req,res) => {     
    var update = await CourseRouter.update({_id:req.body._id}, { $set :{
        course_name : req.body.course_name,
        department : req.body.department,
        certification : req.body.certification,
        duration : req.body.duration,
        training_fee : req.body.training_fee,
        aggrement : req.body.aggrement,
        up_skill : req.body.up_skill,
        fee_pay : req.body.fee_pay,
        courses : req.body.courses,
        upgrade : req.body.upgrade
    }});
    res.json(update);
})

//Delete
router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await CourseRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

module.exports = router;