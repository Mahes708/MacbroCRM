import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Training from './Training';
import axios from "axios";
import  { Redirect } from 'react-router-dom'


const initial = {
    _id :"",
    name :"",
    mobile :"",
    email: "",
    dob :"",
    college :"",
    Student_Graduate :"",
    passing :"",
    experience :"",
    course_offered :"",
    fees_offered :"",
    status :"",
    address :"",
    remarks :"",
    nameError :"",
    mobileError :"",
    emailError: "",
    dobError :"",
    collegeError :"",
    Student_GraduateError :"",
    passingError :"",
    experienceError :"",
    course_offeredError :"",
    fees_offeredError :"",
    statusError :"",
    addressError :"",
    data : "",
    dataCourseName :"",
    isEdit:false
}



class Addtraining extends Component {
    state = initial;
    constructor(){
        super();
        
    } 
    adding = event => {
        
        const {name,value}=event.target;
        this.setState({
            [name] : value
        })
    } 
    getCoursename(){
        axios.get("http://localhost:4000/Course").then(res => {
            // console.log(res.data);
             this.setState({
                 dataCourseName :res.data
             })
         })
    }

    
validate = () =>{
    let nameError = "";
    let emailError ="";
    let mobileError ="";
    let dobError ="";
    let collegeError ="";
    let Student_GraduateError ="";
    let passingError ="";
    let experienceError ="";
    let course_offeredError ="";
    let fees_offeredError ="";
    let statusError ="";
    let addressError ="";
   
  
    if(!this.state.name){
      nameError=" * This Field is Required "
    }
  
    if(!this.state.mobile){
      mobileError="* This Field is Required"
    }
  
    if(!this.state.dob){
      dobError="* This Field is Required"
    }
    
    if(!this.state.college){
      collegeError="* This Field is Required"
    }
  
    if(!this.state.Student_Graduate){
      Student_GraduateError="* This Field is Required"
    }
    if(!this.state.passing){
        passingError="* This Field is Required"
    }
    if(!this.state.Student_Graduate){
      Student_GraduateError="* This Field is Required"
    }
    if(!this.state.experience){
        experienceError="* This Field is Required"
    }
    if(!this.state.course_offered){
        course_offeredError="* This Field is Required"
    }
    if(!this.state.fees_offered){
        fees_offeredError="* This Field is Required"
    }
    if(!this.state.status){
        statusError="* This Field is Required"
    }
  
    if(!this.state.address){
      addressError="* This Field is Required"
    }
  
    if(!this.state.email.includes("@")){
      emailError="Invalid Email";
    }
    if(nameError || mobileError || emailError || dobError || collegeError || Student_GraduateError || passingError || experienceError || course_offeredError || fees_offeredError || statusError || addressError){
      this.setState({ nameError , mobileError , emailError , dobError , collegeError , Student_GraduateError , passingError , experienceError , course_offeredError, fees_offeredError , statusError , addressError});
      return false;
    }
    return true;
  
  }



    // form event
    training = event =>
    {
        event.preventDefault();
        const isValid = this.validate();      
        if(isValid)
        { 
            this.setState( initial );    
        }
        if(!this.state.isEdit){
        let data = 
        {
            isEdit :this.state.isEdit,
            name : this.state.name,
            mobile : this.state.mobile,
            email : this.state.email,
            dob : this.state.dob,
            college : this.state.college,
            Student_Graduate : this.state.Student_Graduate,
            passing : this.state.passing,
            experience : this.state.experience,
            course_offered : this.state.course_offered,
            fees_offered : this.state.fees_offered,
            status : this.state.status,
            address : this.state.address,
            remarks : this.state.remarks
        }
        axios.post("http://localhost:4000/Training",data).then(res => {
            this.getAll();
        })  
    }
    else
    {
        let data = 
        {
            _id :this.state._id,
            isEdit :this.state.isEdit,
            name : this.state.name,
            mobile : this.state.mobile,
            email : this.state.email,
            dob : this.state.dob,
            college : this.state.college,
            Student_Graduate : this.state.Student_Graduate,
            passing : this.state.passing,
            experience : this.state.experience,
            course_offered : this.state.course_offered,
            fees_offered : this.state.fees_offered,
            status : this.state.status,
            address : this.state.address,
            remarks : this.state.remarks
        }
        axios.put("http://localhost:4000/Training/update",data).then(res => {
            this.getAll();
        })  

    }

                
    }

    componentDidMount(props){
        console.log(this.props.editData);
        this.getAll();
        this.getCoursename();
        //isEdit : true;
       
     }
     getAll()
     {
         axios.get("http://localhost:4000/Training").then(res => {
            // console.log(res.data);
             this.setState({
                 data :res.data
             })
         })
     }
     
     componentWillReceiveProps(props){
         
         console.log(props);
         //console.log("testting"+props.setform._id);
        if(props.setform._id!=null)
        {
            this.setState ({
                isEdit : true,
                _id :props.setform._id,
                name :props.setform.name,
                mobile :props.setform.mobile,
                email : props.setform.email,
                dob : props.setform.dob,
                college : props.setform.college,
                Student_Graduate : props.setform.Student_Graduate,
                passing : props.setform.passing,
                experience : props.setform.experience,
                course_offered : props.setform.course_offered,
                fees_offered : props.setform.fees_offered,
                status : props.setform.status,
                address : props.setform.address,
                remarks : props.setform.remarks
                
            })
        }
   }

    render() {

            const star = {
                color: "red"
            }


        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Sidebar />
                    <main className="app-content">
                    <div className="content-page">
                        <div className="content">
                        <br />
                            <br />
                            <div style={{ marginTop: '-5px' }}>
                                <Link to="Training" className="btn btn-primary float-right">View List</Link>
                            </div>
                           
                        <br />
                        <div className="app-title">
                            <div>
                                <h1>Add Training Lead</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <div className="tile">
                                            <div className="tile-body" id="app">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="product-upload-inner">
                                                            
                                                             
                                                            <form id="uploadForm" onSubmit={this.training}  className="product-upload-form">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">

                                                                            <label>Name <span style={star}><b>*</b></span> </label>

                                                                            <input name="name" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.name} placeholder="Enter Name..." />
                                                                            <div style={{color:"red"}}>{this.state.nameError}</div>
                                                                            {/* {this.state.name} */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Mobile <span style={star}><b>*</b></span></label>
                                                                                    <input name="mobile" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.mobile} placeholder="Enter Mobile..." />
                                                                                    <div style={{color:"red"}}>{this.state.mobileError}</div>
                                                                             
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Email  <span style={star}><b>*</b></span></label>
                                                                                    <input name="email" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.email} placeholder="Enter Email..." />
                                                                                    <div style={{color:"red"}}>{this.state.emailError}</div>
                                                                                   
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Dob <span style={star}><b>*</b></span></label>
                                                                            <input name="dob" type="date" onChange={this.adding} className="form-control form-control-lg" value={this.state.dob} placeholder="DD/MM/YYYY" />
                                                                            <div style={{color:"red"}}>{this.state.dobError}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>College Name <span style={star}><b>*</b></span></label>
                                                                            <input name="college" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.college} placeholder="Enter College Name..." />
                                                                            <div style={{color:"red"}}>{this.state.collegeError}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Student/Graduate <span style={star}><b>*</b></span></label>
                                                                            <input name="Student_Graduate"  type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.Student_Graduate} placeholder="Enter Student/Graduate..." />
                                                                            <div style={{color:"red"}}>{this.state.Student_GraduateError}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Year of Passing  <span style={star}><b>*</b></span></label>
                                                                            <input name="passing" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.passing}  placeholder="Enter Year of Passing..." />
                                                                            <div style={{color:"red"}}>{this.state.passingError}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Experience <span style={star}><b>*</b></span></label>
                                                                            <input name="experience" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.experience} placeholder="Enter Experience..." />
                                                                            <div style={{color:"red"}}>{this.state.experienceError}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Courses Offered <span style={star}><b>*</b></span></label>
                                                                            <select name="course_offered" value={this.state.course_offered } onChange={this.adding} className="form-control form-control-lg" >
                                                                               
                                                                            <option selected>Select</option>
                                                                      {
                                                                      ( 
                                                                        this.state.dataCourseName.length >0 ? 
                                                                        
                                                                      this.state.dataCourseName.map((Course,index)=>
                                                                     
                                                                      <option value={Course.course_name}>{Course.course_name}</option>
                                                                      ) :
                                                                      (
                                                                        <option value="1">No</option>
                                                                      )
                                                                        )
                                                                      }


                                                                            </select>
                                                                            <div style={{color:"red"}}>{this.state.course_offeredError}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Fees Offered <span style={star}><b>*</b></span></label>
                                                                            <input name="fees_offered" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.fees_offered }  placeholder="Enter Fees Offered..." />
                                                                            <div style={{color:"red"}}>{this.state.fees_offeredError}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Status  <span style={star}><b>*</b></span></label>
                                                                            <input name="status" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.status }  placeholder="Enter Status..." />
                                                                            <div style={{color:"red"}}>{this.state.statusError}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <label>Address  <span style={star}><b>*</b></span></label>
                                                                        <textarea name="address" onChange={this.adding} className="form-control form-control-lg" value={this.state.address }  rows="3"  ></textarea>
                                                                        <div style={{color:"red"}}>{this.state.addressError}</div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <label>Remarks  </label>
                                                                        <textarea name="remarks" onChange={this.adding} className="form-control form-control-lg" value={this.state.remarks }  rows="3"    ></textarea>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <label> <br /></label>
                                                                        <button type="submit"  className="btn btn-info btn-block" onChange={this.adding}  name="button">Submit</button>
                                                                    </div>
                                                                </div>
                                                            </form></div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div></div></div></div></div>
                                    <Footer /></main>
 </div>
            </div>
                
        )
    }
}
export default Addtraining;