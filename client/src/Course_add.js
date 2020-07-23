import React, { Component } from 'react';
import { Link , Redirect} from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from "axios";

let loggedIn = false
const initial = {
  _id: "",
  course_name: "",
  aggrement: "",
  certification: "",
  department: "",
  duration: "",
  training_fee: "",
  up_skill: "",
  fee_pay: "",
  courses: "",
  upgrade: "",
  course_nameError: "",
  aggrementError: "",
  certificationError: "",
  durationError: "",
  training_feeError: "",
  up_skillError: "",
  fee_payError: "",
  coursesError: "",
  upgradeError: "",
  departmentError: "",
  loggedIn: "",
  data: "",
  Edit_Id:""
}



class Course_add extends Component {
  state = initial;
  constructor() {
    super();

  }
  adding = event => {

    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }


  validate = () => {
    let course_nameError = "";
    let aggrementError = "";
    let certificationError = "";
    let durationError = "";
    let training_feeError = "";
    let up_skillError = "";
    let fee_payError = "";
    let coursesError = "";
    let upgradeError = "";
    let departmentError = "";

    if (!this.state.course_name) {
      course_nameError = " * This Field is Required "
    }

    if (!this.state.aggrement) {
      aggrementError = " * This Field is Required "
    }

    if (!this.state.certification) {
      certificationError = " * This Field is Required "
    }

    if (!this.state.duration) {
      durationError = " * This Field is Required "
    }
    if (!this.state.training_fee) {
      training_feeError = " * This Field is Required "
    }
    if (!this.state.up_skill) {
      up_skillError = " * This Field is Required "
    }
    if (!this.state.fee_pay) {
      fee_payError = " * This Field is Required "
    }
    if (!this.state.courses) {
      coursesError = " * This Field is Required "
    }
    if (!this.state.upgrade) {
      upgradeError = " * This Field is Required "
    }
    if (!this.state.department) {
      departmentError = " * This Field is Required ";
    }

    if (course_nameError || aggrementError || departmentError || upgradeError || up_skillError || coursesError || fee_payError || training_feeError || durationError || certificationError) {
      this.setState({ course_nameError, aggrementError, departmentError, upgradeError, up_skillError, coursesError, fee_payError, training_feeError, durationError, certificationError });
      return false;
    }
    return true;

  }


  // form event
  course = event => {
    event.preventDefault();
    const isValid = this.validate();
    //this.setState(initial);
    console.log(this.state.name)

    if (isValid) {
      this.setState({ initial , loggedIn: true });
    if (!this.state.Edit_Id)
    { 
    let data = { 
      course_name: this.state.course_name,
      aggrement: this.state.aggrement,
      department: this.state.department,
      upgrade: this.state.upgrade,
      up_skill: this.state.up_skill,
      courses: this.state.courses,
      fee_pay: this.state.fee_pay,
      training_fee: this.state.training_fee,
      duration: this.state.duration,
      certification: this.state.certification
    } 
    axios.post("http://localhost:4000/Course", data).then(res => {
      this.setState({  loggedIn: true });
      this.getAll();
    })
  }
  else{
    let data = {
      _id: this.state._id,
      course_name: this.state.course_name,
      aggrement: this.state.aggrement,
      department: this.state.department,
      upgrade: this.state.upgrade,
      up_skill: this.state.up_skill,
      courses: this.state.courses,
      fee_pay: this.state.fee_pay,
      training_fee: this.state.training_fee,
      duration: this.state.duration,
      certification: this.state.certification
    } 
    axios.put("http://localhost:4000/Course/update", data).then(res => {
      this.setState({  loggedIn: true });
      this.getAll();
    })

  }
  }
  }

  onSubmit = () => {
   console.log("Hello")
      this.props.history.push("/");
    
 }

  componentDidMount(props) {
    this.getAll();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Edit_Id = urlParams.get('id')
    this.setState({
      Edit_Id
    })

    axios.get(`http://localhost:4000/Course/${Edit_Id}`).then(res => {
      console.log( res.data.department)
      this.setState({
        data: res.data, 
        _id: res.data._id, 
        course_name:res.data.course_name,
        aggrement: res.data.aggrement,
        department: res.data.department,
        upgrade: res.data.upgrade,
        up_skill: res.data.up_skill,
        courses:res.data.courses,
        fee_pay: res.data.fee_pay,
        training_fee: res.data.training_fee,
        duration:res.data.duration,
        certification: res.data.certification
      })
    })

  }
  getAll() {
    axios.get("http://localhost:4000/Course").then(res => {
      // console.log(res.data);
      this.setState({
        data: res.data
      })
    })
  }

   

  render() {

    if(this.state.loggedIn){
      return <Redirect to="/Course" />
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

              <h1>Add Course</h1>
              </div>
          </div>

          <div style={{ marginTop: "-5px" }} >
              <Link to="/Course" className="btn btn-primary float-right">View List</Link>
          </div>

          <br></br>
          <br></br>
      

                <div className="row" style={{ marginLeft: '10px' }}>
                  <div className="col-md-12">
                    <div className="card m-b-30">
                      <div className="card-body">
                        <div className="tile">
                          <div className="tile-body" id="app">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="product-upload-inner">
                                  <form id="uploadForm" className="product-upload-form" onSubmit={this.course} >
                                    <div className="row">

                                      <div className="col-md-4">
                                        <div className="form-group">

                                          <label>Course Name <span style={star}><b>*</b></span> </label>

                                          <input name="course_name" type="text" onChange={this.adding} className="form-control form-control-lg" value={this.state.course_name} placeholder="Enter Name..." />
                                          <div style={{ color: "red" }}>{this.state.course_nameError}</div>
                                          {/* {this.state.name} */}
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Department <span style={star}><b>*</b></span></label>
                                          <select name="department" onChange={this.adding} Value={this.state.department} className="form-control form-control-lg">
                                            <option>Select</option>
                                            <option value="Mech" selected={this.state.department == "Mech"}>Mech </option>
                                            <option value="IT" selected={this.state.department == "IT"}>IT</option>
                                          </select>

                                          <div style={{ color: "red" }}>{this.state.departmentError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Certification <span style={star}><b>*</b></span></label>
                                          <select name="certification" onChange={this.adding} Value={this.state.certification} className="form-control form-control-lg">
                                            <option>Select</option>
                                            <option value="TIDF Certificate" selected={this.state.certification == "TIDF Certificate"}>TIDF Certificate </option>
                                            <option value="Intern Certificate" selected={this.state.certification == "Intern Certificate"}>Intern Certificate </option>
                                          </select>
                                          <div style={{ color: "red" }}>{this.state.certificationError}</div>
                                        </div>
                                      </div>


                                    </div>
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Duration <span style={star}><b>*</b></span></label>
                                          <input name="duration" type="text" className="form-control form-control-lg" onChange={this.adding} Value={this.state.duration} placeholder="Enter Duration..." />
                                          <p id="errprice" className="em no-margin text-danger">
                                          </p>
                                          <div style={{ color: "red" }}>{this.state.durationError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Training Fees<span style={star}><b>*</b></span> </label>
                                          <input name="training_fee" type="text" className="form-control form-control-lg" onChange={this.adding} Value={this.state.training_fee} placeholder="Enter Training fee..." />
                                          <p id="errprice" className="em no-margin text-danger">
                                          </p>
                                          <div style={{ color: "red" }}>{this.state.training_feeError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Aggrement<span style={star}><b>*</b></span></label>
                                          <select className="form-control form-control-lg" onChange={this.adding} Value={this.state.aggrement} name="aggrement">
                                            <option >Select </option>
                                            <option value="YES" selected={this.state.aggrement == "YES"}>YES </option>
                                            <option value="No" selected={this.state.aggrement == "No"}>No</option>
                                          </select>

                                          <div style={{ color: "red" }}>{this.state.aggrementError}</div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Up Skill<span style={star}><b>*</b></span></label>
                                          <select className="form-control form-control-lg" onChange={this.adding} Value={this.state.up_skill} name="up_skill">
                                            <option>Select </option>
                                            <option value="YES" selected={this.state.up_skill == "YES"}>YES </option>
                                            <option value="No" selected={this.state.up_skill == "No"}>No</option>
                                          </select>

                                          <div style={{ color: "red" }}>{this.state.up_skillError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Fee Pay <span style={star}><b>*</b></span> </label>
                                          <select className="form-control form-control-lg" onChange={this.adding} Value={this.state.fee_pay} name="fee_pay">
                                            <option >Select </option>
                                            <option value="Installment 1" selected={this.state.fee_pay == "Installment 1"}>Installment 1 </option>
                                            <option value="Installment 2" selected={this.state.fee_pay == "Installment 2"}>Installment 2 </option>
                                            <option value="Installment 3" selected={this.state.fee_pay == "Installment 3"}>Installment 3 </option>
                                            <option value="Installment 4" selected={this.state.fee_pay == "Installment 4"}>Installment 4 </option>
                                          </select>

                                          <div style={{ color: "red" }}>{this.state.fee_payError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Course On <span style={star}><b>*</b></span></label>
                                          <select className="form-control form-control-lg" onChange={this.adding} Value={this.state.courses} name="courses">
                                            <option >Select </option>
                                            <option value="Online" selected={this.state.courses == "Online"}>Online</option>
                                            <option value="Offline" selected={this.state.courses == "Offline"}>Offline</option>
                                          </select>

                                          <div style={{ color: "red" }}>{this.state.coursesError}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Upgrade Plan <span style={star}><b>*</b></span></label>
                                          <input name="upgrade" type="text" className="form-control form-control-lg" onChange={this.adding} Value={this.state.upgrade} placeholder="Enter Training fee..." />
                                          <p id="errprice" className="em no-margin text-danger">
                                          </p>
                                          <div style={{ color: "red" }}>{this.state.upgradeError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <div className="form-group">
                                          <label><br></br></label>
                                          <button type="submit" className="btn btn-info btn-block" onChange={this.adding}  name="button"> {this.state.Edit_Id ? 'Update' : 'Submit'}</button>
                                        </div>
                                      </div>
                                    </div>
                                    
                                  </form></div>
                              </div></div></div></div></div>
                    </div></div> </div>   
            <br>
            </br>
            <Footer />
          </main></div>
 </div></div>
      </div>
    )
  }
}

export default Course_add;