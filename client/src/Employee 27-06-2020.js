 import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import EmployeeList from './EmployeeList';
import { Multiselect } from 'multiselect-react-dropdown';
import ImageUploader from 'react-images-upload';
import axios from 'axios';


class Employee extends Component { 
    
    constructor(props){
        super(props);
        console.log(props)
      

        this.state = {
            options: [{ name: 'Mech', id: 1 }, { name: 'ECE', id: 2 }, { name: 'M.Sc', id: 3 }, , { name: 'MCA', id: 4 }],
            _id :"",
            Employee_name :"",
            mobile :"",
            email: "",
            password :"",
            dob :"",
            department :"",
            experience :"",
            doj :"",
            address :""          
        } 
        
       
    } 
    adding = event => {
        
        const {name,value}=event.target;
        this.setState({
            [name] : value
        })
    } 
    // form event
    Employee = event => {
          event.preventDefault();
        //  console.log("Name   "+this.state.Employee_name)
         if(!this.state.isEdit){
             let data = {
                 isEdit :this.state.isEdit,
                 Employee_name : this.state.Employee_name,
                 mobile : this.state.mobile,
                 email : this.state.email,
                 password : this.state.password,
                 dob : this.state.dob,
                 department : this.state.department,
                 experience : this.state.experience,
                 doj : this.state.doj,
                 address : this.state.address
                 }
                // this.props.Training(data);    
                // axios.post("http://localhost:4000/Employee",data).then(res => {
                //         //this.getAll(); 
                        
                //     }) 
                   // this.props.history.push('/Training/');
                     return <Redirect to='/Training'  />
               
         }
         else
         {
             let data = {
                 _id :this.state._id,
                 isEdit :this.state.isEdit,
                 Employee_name : this.state.Employee_name,
                 mobile : this.state.mobile,
                 email : this.state.email,
                 password : this.state.password,
                 dob : this.state.dob,
                 department : this.state.department,
                 experience : this.state.experience,
                 doj : this.state.doj,
                 address : this.state.address
                }
                axios.put("http://localhost:4000/Employee/update",data).then(res => {
                        this.getAll();
                    })  
            } 
     }

     componentDidMount(props){
       // console.log(props.location.aboutProps)
        
     }
     getAll()
     {
         axios.get("http://localhost:4000/Employee").then(res => {
            // console.log(res.data);
             this.setState({
                 data :res.data
             })
         })
     }


    render() {
       
        return ( 
        // <h1> Hello {this.props.name}</h1>
            <div id="wrapper">
                <Sidebar />
                <div className="content-page">
                    <div className="content">
                        <Header />
                <main className="app-content">
                    <br></br>
                    <div className="app-title">
                        <div>
                            <h1>Add Employee</h1>
                        <h1>{this.props.testvalue}</h1>
                        </div>
                    </div>

                    <div style={{ marginTop: "-5px" }} >
                        <Link to="/EmployeeList" className="btn btn-primary float-right">View List</Link>
                        <h1> welcome {this.props.name}</h1>
                        {/* <h1>test {props.location.aboutProps}</h1> */}
                        
                    </div>

                    <br></br>
                    <br></br>
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card m-b-30">
                                <div className="card-body">
                                    <div className="tile">
                                        <div className="tile-body" id="app">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="product-upload-inner">
                                                        <form id="uploadForm" onSubmit={this.Employee} className="product-upload-form">
                                                            <input type="hidden" name="_token" />
                                                            <div className="form-element margin-bottom-20">
                                                           
                                                                <label htmlFor="" className="sec-txt">Preview Images
                                                                    </label>
                                                                <div className="">
                                                                    <table className="table table-striped" id="imgtable">

                                                                    </table>
                                                                </div>
                                                                <div className="form-group">

                                                                    <input type="file" name="photo" className="" onChange={this.fileChangedHandler} />

                                                                    <p id="errpreimg" className="em no-margin text-danger">
                                                                    </p>
                                                                </div>

                                                            </div>
                                                             
                                                           
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label>Name   <b><span style={{color:"red"}}>*</span></b> </label>
                                                                        <input name="Employee_name" onChange={this.adding} type="text" value ={this.props.Employee_name} className="form-control form-control-lg" placeholder="Enter Name..." />
                                                                        <p id="errtitle"
                                                                            className="em no-margin text-danger"></p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">

                                                                    <div className="form-group">
                                                                        <label>Mobile </label>
                                                                        <input name="mobile" type="text" onChange={this.adding} className="form-control form-control-lg" placeholder="Enter Mobile..." />
                                                                        <p id="errquantity"
                                                                            className="em no-margin text-danger">
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label>Email </label>
                                                                        <input name="email" type="text" onChange={this.adding}
                                                                            className="form-control form-control-lg"
                                                                            placeholder="Enter Email..." />
                                                                        <p id="errprice"
                                                                            className="em no-margin text-danger">
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label>Password </label>
                                                                        <input name="password" type="password" onChange={this.adding}
                                                                            className="form-control form-control-lg"
                                                                            placeholder="Enter Password..." />
                                                                        <p id="errprice"
                                                                            className="em no-margin text-danger">
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                            </div>


                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label>Date of Birth</label>
                                                                        <input name="dob" type="date" onChange={this.adding}
                                                                            className="form-control form-control-lg"
                                                                            placeholder="DD/MM/YYYY" />

                                                                        <p id="errsubcat"
                                                                            className="em no-margin text-danger"></p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label>Department</label>
                                                                        <div >
                                                                            <Multiselect
                                                                                options={this.state.options} // Options to display in the dropdown
                                                                                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                                                onSelect={this.onSelect} // Function will trigger on select event
                                                                                onRemove={this.onRemove} // Function will trigger on remove event
                                                                                displayValue="name" // Property name to display in the dropdown options
                                                                                name="department"
                                                                                onChange={this.adding}
                                                                            />
                                                                        </div>
                                                                        <p id="errcat" className="em no-margin text-danger"></p>
                                                                    </div>
                                                                </div>


                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label>Experience</label>
                                                                        <input name="experience" type="text" onChange={this.adding}
                                                                            className="form-control form-control-lg"
                                                                            placeholder="Enter Experience..." />

                                                                        <p id="errcode"
                                                                            className="em no-margin text-danger"></p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label>Date of Joining </label>
                                                                        <input name="doj" type="date" onChange={this.adding}
                                                                            className="form-control form-control-lg"
                                                                            placeholder="DD-MM-YYYY" />

                                                                        <p id="errsubcat"
                                                                            className="em no-margin text-danger"></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <label>Res.Location</label>
                                                                    <textarea name="address" onChange={this.adding} className="form-control form-control-lg" rows="3"></textarea>
                                                                </div>
                                                                <div className="col-md-2" >
                                                                    <label> <br></br></label>
                                                                    <button type="submit" className="btn btn-info btn-block" name="button">Submit</button>
                                                                </div>
                                                            </div>
                                                        </form>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
                </div>
                    <Footer />
            </div >
            </div>
        );
    }
}

// class Employee extends Component {
//     render() {
//         return (
//             <div id="wrapper">
//                 {/* <Sidebar />
//                 <div className="content-page">
//                     <div className="content">
//                         <Header /> */}
//                        <EmployeeContent />
//                     {/* </div>
//                     <Footer />

//                 </div> */}

//                <h1> welcome {this.props.name}</h1>
//             </div>
//         );
//     }
// }

// const Employee = (props) => {
//     console.log(props)
    
//     return <h1>Name :  {props.name}</h1>    
// }

 export default Employee;