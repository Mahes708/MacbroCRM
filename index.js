//Third Party Module
const express =require('express');
const app = express();
const mongoose =require('mongoose');
const morgan =require('morgan');
const cors =require('cors');

const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
 
app.use(cors());
//Middleware 
app.use(morgan("dev"));
app.use(express.json()); 

//Router
var Employee = require('./Employee/Employee');
var Course = require('./Course/Course');
var ExcelDataTraining = require('./ExcelDataTraining');
var ExcelDataProject = require('./ExcelDataProject');
var ExcelDataCompany = require('./ExcelDataCompany');
var Certificate = require('./Certificate/Certificate');
var Target = require('./Target/Target');
var TargetCommand = require('./Target/Command');
var Agreement = require('./Agreement/Agreement');
var Payment = require('./Payment/Payment');
var Training = require('./Training/Training');
var Project = require('./Project/Project');
var Company = require('./Company/Company');
var TraineCommand = require('./Training/Command');
var TraineAdvance = require('./Training/Advance');
var ProjectCommand = require('./Project/Command');
var ProjectAdvance = require('./Project/Advance');
var CompanyCommand = require('./Company/Command');
var CompanyAdvance = require('./Company/Advance');
var PaymentProject = require('./PaymentProject/PaymentProject');
var PaymentCompany = require('./PaymentCompany/PaymentCompany');


 
app.use("/Employee",Employee);
app.use("/Course",Course)
app.use("/ExcelDataTraining",ExcelDataTraining)
app.use("/ExcelDataProject",ExcelDataProject)
app.use("/ExcelDataCompany",ExcelDataCompany)
app.use("/Certificate",Certificate)
app.use("/Target",Target)
app.use("/TargetCommand",TargetCommand)
app.use("/Agreement",Agreement)
app.use("/Payment",Payment)
app.use("/Training",Training)
app.use("/Project",Project)
app.use("/Company",Company)
app.use("/TraineCommand",TraineCommand)
app.use("/TraineAdvance",TraineAdvance)
app.use("/ProjectCommand",ProjectCommand)
app.use("/ProjectAdvance",ProjectAdvance)
app.use("/CompanyCommand",CompanyCommand)
app.use("/CompanyAdvance",CompanyAdvance)
app.use("/PaymentProject",PaymentProject)
app.use("/PaymentCompany",PaymentCompany)

 



//Listen Port
app.listen(4000,() => { console.log("Server Started at port no 4000");})

//DB Connection 
mongoose.connect('mongodb://localhost/macbro',{useNewUrlParser: true, useUnifiedTopology: true},err => {
  if(!err)
      {
          console.log("DB Connected");
      }
      else{
        { console.log('Error in DB connection : ' + err) }
      }
});
 
 




  