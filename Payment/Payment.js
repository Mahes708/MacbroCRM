
const express = require("express");
const router = express.Router();
const PaymentRouter = require("./PaymentTable");
const fileUpload = require('express-fileupload');
const app = express();
router.use(fileUpload());

//Add


router.post("/", (req, res) => {   
        const file = req.files.file;
        file.mv(`${__dirname}/../client/public/uploads/Training/${file.name}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            } 
        })
            var data = new PaymentRouter({
                photo: file.name,
                traineName: req.body.traineName,
                traineID: req.body.traineID,
                PaymentDate: req.body.PaymentDate,
                PaymentAmt: req.body.PaymentAmt
            });
            data.save(); 
            res.json(data);
       
 
})

router.post("/add",async(req, res) => {   
    var data = new PaymentRouter({
        traineName: req.body.traineName,
        traineID: req.body.traineID,
        PaymentDate: req.body.PaymentDate,
        PaymentAmt: req.body.PaymentAmt
    });
   await data.save();
    res.json(data);
})

//Get All
router.get("/", async (req, res) => {
    var GetAllData = await PaymentRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async (req, res) => {
    var update = await PaymentRouter.update({ _id: req.body._id }, {
        $set: {
            student_name: req.body.student_name,
            advance_date: req.body.advance_date,
            student_photo: req.body.student_photo,
            payment: req.body.payment
        }
    });
    res.json(update);
}) 

//View
router.get("/:id", async (req, res) => {
    var getData = await PaymentRouter.findById(req.params.id);
    res.json(getData);

})
router.get("/traineID/:id", async (req, res) => {
    var getData = await PaymentRouter.find({ traineID: req.params.id });
    res.json(getData);

})

// Graph Monthwise

router.get("/Graph/:id", async(req,res)=>{
    
    var year ='2020'
    var start
    var end
    
    for(var i= 1;i<=12;i++)
    {
    //    if(i<=9)
    //    {
    //     var start = new Date( year + "-0" + i +"-1");
    //     var end   = new Date( year + "-0" + i +"-31");
    //    }
    //    else
    //    {
          start = new Date(year + "-" + i +"-1");
          end   = new Date(year + "-" + i +"-31");
      // }
      
      
        //  var start = new Date(req.params.FromDate);
        //  var end = new Date(req.params.ToDate); 
    var getData  = await PaymentRouter.aggregate([
                { $match: { createdTime: {$gte: start, $lte: end} } },
                { $group: { _id: i, PaymentAmt: { $sum: "$PaymentAmt" } } }
            ])
            if(getData=='') 
            {
                getData=[{_id:i,PaymentAmt : 0}]
            }  
            console.log(getData) 
            
   }
   
//    var start = new Date("2020-07-01");
//     var end = new Date("2020-07-31"); 
//    var getData  = await PaymentRouter.aggregate([
//         { $match: { createdTime: {$gte: start, $lte: end} } },
//         { $group: { _id: null, PaymentAmt: { $sum: "$PaymentAmt" } } }
//     ])
console.log(getData) 
res.json(getData); 
 })

 
module.exports = router;