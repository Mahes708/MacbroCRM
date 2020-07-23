import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Training from './Training';
import axios from "axios";
import  { Redirect } from 'react-router-dom'

class Addtraining extends Component {
    constructor(){
        super();
        this.state = {
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
            remarks :"" 
        } 
    } 
    adding = event => {
        
        const {name,value}=event.target;
        this.setState({
            [name] : value
        })
    } 
    // form event
    training = event => {
        // event.preventDefault();
          //console.log("Name   "+this.state.name)
         if(!this.state.isEdit){
             let data = {
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
                // this.props.Training(data);    
                axios.post("http://localhost:4000/Training",data).then(res => {
                        this.getAll();
                    }) 
                    return <Redirect to='/Training'  />
               
         }
         else
         {
             let data = {
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
        this.getAll();
       
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
         console.log("mahi");
         console.log(props);
        // console.log("testting"+props.setform._id);
        // if(props.setform._id!=null)
        // {
        //     this.setState ({
        //         isEdit : true,
        //         _id :props.setform._id,
        //         name :props.setform.name,
        //         mobile :props.setform.mobile,
        //         email : props.setform.email,
        //         dob : props.setform.dob,
        //         college : props.setform.college,
        //         Student_Graduate : props.setform.Student_Graduate,
        //         passing : props.setform.passing,
        //         experience : props.setform.experience,
        //         course_offered : props.setform.course_offered,
        //         fees_offered : props.setform.fees_offered,
        //         status : props.setform.status,
        //         address : props.setform.address,
        //         remarks : props.setform.remarks
                
        //     })
        // }
   }

    render() {
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
                                                            
                                                             
                                                            <form id="uploadForm" onSubmit={this.training} className="product-upload-form">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">

                                                                            <label>Name <span /></label>

                                                                            <input name="name" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.name} placeholder="Enter Name..." />
                                                                            <p id="errtitle" className="em no-margin text-danger" />
                                                                            {this.state.name}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Mobile</label>
                                                                                    <input name="mobile" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.mobile} placeholder="Enter Mobile..." />
                                                                                    <p id="errquantity" className="em no-margin text-danger">
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Email </label>
                                                                                    <input name="email" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.email} placeholder="Enter Email..." />
                                                                                    <p id="errprice" className="em no-margin text-danger">
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Dob</label>
                                                                            <input name="dob" type="date" onChange={this.adding} className="form-control form-control-lg" value={this.state.dob} placeholder="DD/MM/YYYY" />
                                                                            <p id="errsubcat" className="em no-margin text-danger" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>College Name</label>
                                                                            <input name="college" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.college} placeholder="Enter College Name..." />
                                                                            <p id="errcode" className="em no-margin text-danger" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Student/Graduate</label>
                                                                            <input name="Student_Graduate"  type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.Student_Graduate} placeholder="Enter Student/Graduate..." />
                                                                            <p id="errcode" className="em no-margin text-danger" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Year of Passing </label>
                                                                            <input name="passing" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.passing}  placeholder="Enter Year of Passing..." />
                                                                            <p id="errsubcat" className="em no-margin text-danger" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Experience </label>
                                                                            <input name="experience" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.experience} placeholder="Enter Experience..." />
                                                                            <p id="errsubcat" className="em no-margin text-danger" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Courses Offered </label>
                                                                            <select name="course_offered" value={this.state.course_offered } onChange={this.adding} className="form-control form-control-lg" >
                                                                                <option>Select</option>
                                                                                <option value="1">Mech 1</option>
                                                                                <option value="2">Mech 2</option>
                                                                                <option value="3">Mech 3</option>
                                                                                <option value="4">Mech 4</option>
                                                                                <option value="5">IT 1</option>
                                                                                <option value="6" >IT 2</option>
                                                                                <option value="7">IT 3</option>
                                                                                <option value="8">IT 4</option>
                                                                            </select>
                                                                            <p id="errsubcat" className="em no-margin text-danger" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Fees Offered </label>
                                                                            <input name="fees_offered" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.fees_offered }  placeholder="Enter Fees Offered..." />
                                                                            <p id="errsubcat" className="em no-margin text-danger" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-group">
                                                                            <label>Status</label>
                                                                            <input name="status" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.status }  placeholder="Enter Status..." />
                                                                            <p id="errsubcat" className="em no-margin text-danger" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <label>Address</label>
                                                                        <textarea name="address" onChange={this.adding} className="form-control form-control-lg" value={this.state.address }  rows="3"  ></textarea>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <label>Remarks</label>
                                                                        <textarea name="remarks" onChange={this.adding} className="form-control form-control-lg" value={this.state.remarks }  rows="3"    ></textarea>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <label> <br /></label>
                                                                        <button type="submit"  className="btn btn-info btn-block" name="button">Submit</button>
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