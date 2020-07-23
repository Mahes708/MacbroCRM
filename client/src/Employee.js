import React, { Component } from 'react';
import { Link,  Redirect } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import EmployeeList from './EmployeeList';
import axios from 'axios';

let loggedIn = false
const initialState = {

    options: [{ name: 'Mech', id: 1 }, { name: 'ECE', id: 2 }, { name: 'M.Sc', id: 3 },  { name: 'MCA', id: 4 }],
    _id: "",
    photo: "",
    Employee_name: "",
    Employee_code: "",
    mobile: "",
    email: "",
    password: "",
    dob: "",
    department: "",
    experience: "",
    doj: "",
    address: "",
   // fileError: "",
    Employee_nameError: "",
    Employee_codeError: "",
    mobileError: "",
    emailError: "",
    passwordError: "",
    dobError: "",
    departmentError:"",
    experienceError: "",
    dojError: "",
    addressError: "",
    value: [],
    isEdit: false,
    data: [],
    loggedIn: "",
    Edit_Id : "",
    message : "",
    msg :"",
    datacode:[],
    datas:[],
    code_msg: ""

}



class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        
    }

    Emp = event => {
        console.log(event.target)
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    Empphoto = e => {
        const photo = "";
        console.log(e.target.files[0])
        this.setState({
            photo: e.target.files[0]
        })
        // this.setState({file : e.target.files[0]});
    }

    Emailemp =  event => {
        axios.get(`http://localhost:4000/Employee/SearchEmail/${this.state.email}`).then(res =>
        {
            this.setState({
                datas: res.data
            })  
            if (this.state.datas.length) {
                this.setState({
                    msg: "* This Email Id is Already Exist"
                })
            }
            else
            {
                this.setState({
                    msg: ""
                })
            }
            return false;
        })
    }

    // code

    Codeemp =  event => {
        axios.get(`http://localhost:4000/Employee/SearchCode/${this.state.Employee_code}`).then(res =>
        { 
            this.setState({
                datacode: res.data
            }) 
            if (this.state.datacode.length) { 
                this.setState({
                    code_msg: "* This Employee Code is Already Exist"
                }) 
            }
            else
            {
                this.setState({
                    code_msg: ""
                })
            } 
            return false;
        }) 
    }
    // handleChange = e => { 
    //       var options = e;
    //       var value = [];
    //       var department =[]; 
    //     for (var i = 0, l = e.length; i <l; i++) {
    //      if (options[i]) {
    //         value.push(options[i].name); 
    //         this.setState({
    //             department:value
    //                 }); 
    //            console.log(value)     
    //       }
    //     } 
        
    //   } 
    validate = () => {
      //  let fileError = "";
        let Employee_nameError = "";
        let Employee_codeError = "";
        let mobileError = "";
        let emailError = "";
        let passwordError = "";
        let dobError = "";
        let departmentError = "";
        let experienceError = "";
        let dojError = "";
        let addressError = "";
        let msg ="";
        let code_msg ="";


        // if (!this.state.photo) {
        //     fileError = " * This Field is Required "
        // }
        if (!this.state.Employee_code) {
            Employee_codeError = "* This Field is Required"
        }

        if (!this.state.Employee_name) {
            Employee_nameError = "* This Field is Required"
        }

        if (!this.state.mobile) {
            mobileError = "* This Field is Required"
        }

        if (!this.state.password) {
            passwordError = "* This Field is Required"
        }

        if (!this.state.dob) {
            dobError = "* This Field is Required"
        }
        if (!this.state.department) {
            departmentError = "* This Field is Required"
        }
        if (!this.state.doj) {
            dojError = "* This Field is Required"
        }
        if (!this.state.experience) {
            experienceError = "* This Field is Required"
        }

        if (!this.state.address) {
            addressError = "* This Field is Required"
        }
        if (this.state.datas.length) {
            msg = "* This Email Id is Already Exist"
        }
        if (this.state.datacode.length) {
            code_msg = "* This Employee Code is Already Exist"
        }

        if (!this.state.email.includes("@")) {
            emailError = "* Invalid Email";
        }
        if ( Employee_nameError || Employee_codeError || mobileError || emailError || dobError || passwordError || departmentError || experienceError || dojError || addressError || msg || code_msg) {
            this.setState({  Employee_codeError, Employee_nameError, mobileError, emailError, dobError, passwordError, departmentError, experienceError, dojError, addressError , msg , code_msg});
            return false;
        }
        return true;

    }


    // form event
    Employee = event => {
        event.preventDefault();
        const isValid = this.validate();

        if (isValid) {
            this.setState({ initialState , loggedIn: true });
         

        if (!this.state.Edit_Id) {
            const formData = new FormData()
            const file = this.state.photo;
           
            formData.append('photo', file)
            formData.append('Employee_name', this.state.Employee_name)
            formData.append('Employee_code', this.state.Employee_code)
            formData.append('mobile', this.state.mobile)
            formData.append('email', this.state.email)
            formData.append('password', this.state.password)
            formData.append('dob', this.state.dob)
            formData.append('department', this.state.department)
            formData.append('experience', this.state.experience)
            formData.append('doj', this.state.doj)
            formData.append('address', this.state.address)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }; 
       
            axios.post("http://localhost:4000/Employee", formData, config).then(res => {
                console.log(res.data)
                this.setState({ 
                    message :"Added Successfully" });
                 
            })
        }
        else {
            const formData = new FormData()
            console.log(this.state.photo) 
            const file = this.state.photo;
            const old_photo = this.state.data.photo;
                
            formData.append('file', file)
            formData.append('old_photo', old_photo)
            formData.append('Employee_name', this.state.Employee_name)
            formData.append('Employee_code', this.state.Employee_code)
            formData.append('mobile', this.state.mobile)
            formData.append('email', this.state.email)
            formData.append('password', this.state.password)
            formData.append('dob', this.state.dob)
            formData.append('department', this.state.department)
            formData.append('experience', this.state.experience)
            formData.append('doj', this.state.doj)
            formData.append('address', this.state.address) 
            formData.append('_id', this.state._id)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }; 
            axios.put("http://localhost:4000/Employee/update", formData, config).then(res => {
                this.setState({  
                    message :"Edited Successfully" });
              })
            }
        }
    }

    componentDidMount(props) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const Edit_Id = urlParams.get('id') 
        this.setState({
            Edit_Id
        })
      
        axios.get(`http://localhost:4000/Employee/${Edit_Id}`).then(res => {
             console.log(res.data.department)
            this.setState({
                data: res.data,                
                _id : res.data._id,
                photo : res.data.photo,
                Employee_code : res.data.Employee_code,
                Employee_name : res.data.Employee_name,
                mobile : res.data.mobile,
                email : res.data.email,
                password : res.data.password,
                dob : res.data.dob,
                department :res.data.department,
                experience : res.data.experience,
                doj : res.data.doj,
                address : res.data.address
            })
        }) 
        
     } 
   
    render() {
       
        if(this.state.loggedIn){
            return <Redirect to="/EmployeeList" />
          }

        const star = {
            color: "red"
        }
        return (
            <div>
                <div id="wrapper">
                    <Sidebar />
                    <div className="content-page">

                        <Header />
                        <div className="content">

                            <main className="app-content">

                                <br></br>
                                <div className="app-title">
                                    <div>

                                        <h1>Add Employee</h1>
                                    </div>
                                </div>

                                <div style={{ marginTop: "-5px" }} >
                               
                                    <Link to="/EmployeeList" className="btn btn-primary float-right">View List</Link>
                                </div>

                                <br></br>
                                <br></br>
                                {this.state.message ? <h3 style={{color:"green", marginLeft:"500px"}}>{this.state.message}</h3> : null}
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

                                                                            <label htmlFor="" className="sec-txt">Photo <b><span style={{ color: "red" }}>*</span></b>
                                                                    </label>
                                                                            <div className="">
                                                                               {this.state.Edit_Id ? <table className="table table-striped" id="imgtable">
                                                                                {this.state.photo ?  <img src={process.env.PUBLIC_URL + `/uploads/Employee/${this.state.data.photo}`} width="50px" height="50px" style={{ borderRadius:'30px' }} /> : ''} 
                                                                               
                                                                                </table> : "" }
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <input type="file" name="photo" className="" onChange={this.Empphoto} value={this.state.file} />
                                                                                {/* <div style={{ color: "red" }}>{this.state.fileError}</div> */}
                                                                            </div>

                                                                        </div>
 
                                                                        
                                                                        <div className="row">
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                     <label>Employee Code <b><span style={{ color: "red" }}>*</span></b> </label>
                                                                                    <input name="Employee_code" onChange={this.Emp}   autoComplete="off"   onKeyUp={this.Codeemp}  value={this.state.Employee_code}    type="text" className="form-control form-control-lg" placeholder="Enter Code..." />
                                                                                    <div style={{ color: "red" }}>{this.state.Employee_codeError}</div>
                                                                                    <div style={{color:"red"}}>{this.state.code_msg}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Employee Name <b><span style={{ color: "red" }}>*</span></b> </label>
                                                                                    <input name="Employee_name" onChange={this.Emp}  autoComplete="off"   value={this.state.Employee_name} type="text" className="form-control form-control-lg" placeholder="Enter Name..." />
                                                                                    <div style={{ color: "red" }}>{this.state.Employee_nameError}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">

                                                                                <div className="form-group">
                                                                                    <label>Mobile <span style={star}><b>*</b></span> </label>
                                                                                    <input name="mobile" type="text" onChange={this.Emp}  autoComplete="off"   value={this.state.mobile} className="form-control form-control-lg" placeholder="Enter Mobile..." />
                                                                                    <div style={{ color: "red" }}>{this.state.mobileError}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Email <span style={star}><b>*</b></span></label>
                                                                                    <input name="email" type="text" onChange={this.Emp}  autoComplete="off"   onKeyUp={this.Emailemp} value={this.state.email}
                                                                                        className="form-control form-control-lg"
                                                                                        placeholder="Enter Email..." />
                                                                                    <div style={{ color: "red" }}>{this.state.emailError}</div>
                                                                                    <div style={{color : "red"}}>{this.state.msg}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">

                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Password <span style={star}><b>*</b></span></label>
                                                                                    <input name="password" type="password" onChange={this.Emp} value={this.state.password}
                                                                                        className="form-control form-control-lg"
                                                                                        placeholder="Enter Password..." />
                                                                                    <div style={{ color: "red" }}>{this.state.passwordError}</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Date of Birth <span style={star}><b>*</b></span></label>
                                                                                    <input name="dob" type="date" onChange={this.Emp} value={this.state.dob}
                                                                                        className="form-control form-control-lg"
                                                                                        placeholder="DD/MM/YYYY" />

                                                                                    <div style={{ color: "red" }}>{this.state.dobError}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Department</label>
                                                                                    <div >
                                                                                    <select name="department" onChange={this.Emp} Value={this.state.department} className="form-control form-control-lg">
                                                                                        <option>Select</option>
                                                                                        <option value="ECE" selected={this.state.department == "ECE"}>ECE </option>
                                                                                        <option value="M.Sc" selected={this.state.department =="M.Sc"}>M.Sc</option>
                                                                                        <option value="MCA" selected={this.state.department == "MCA"}>MCA</option>
                                                                                        <option value="MBA" selected={this.state.department == "MBA"}>MBA</option>
                                                                                        <option value="EEE" selected={this.state.department == "EEE"}>EEE</option>
                                                                                    </select>
                                                                                    </div>
                                                                                    <div style={{ color: "red" }}>{this.state.departmentError}</div>
                                                                                </div>
                                                                            </div>


                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Experience <span style={star}><b>*</b></span></label>
                                                                                    <input name="experience" type="text" onChange={this.Emp} value={this.state.experience}
                                                                                        className="form-control form-control-lg"
                                                                                        placeholder="Enter Experience..." />

                                                                                    <div style={{ color: "red" }}>{this.state.experienceError}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Date of Joining <span style={star}><b>*</b></span></label>
                                                                                    <input name="doj" type="date" onChange={this.Emp} value={this.state.doj}
                                                                                        className="form-control form-control-lg"
                                                                                        placeholder="DD-MM-YYYY" />

                                                                                    <div style={{ color: "red" }}>{this.state.dojError}</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-3">
                                                                                <label>Res.Location <span style={star}><b>*</b></span></label>
                                                                                <textarea name="address" onChange={this.Emp} value={this.state.address} className="form-control form-control-lg" rows="3"></textarea>
                                                                                <div style={{ color: "red" }}>{this.state.addressError}</div>
                                                                            </div>

                                                                            <div className="col-md-2" >
                                                                                <label> <br></br></label>
        <button type="submit" className="btn btn-info btn-block" onChange={this.Emp} name="button"  > {this.state.Edit_Id ? 'Update' : 'Submit'} </button>
                                                                            </div>
                                                                        </div></form></div>

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
                    </div>
                </div>

            </div >
        );
    }
}



export default Employee;