import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

import axios from "axios";


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
  data: ""
  // isEdit:""
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
      training_feeError = "blank Training fee"
    }
    if (!this.state.up_skill) {
      up_skillError = " * This Field is Required "
    }
    if (!this.state.fee_pay) {
      fee_payError = "blank Fee pay"
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
      this.setState(initial);
    }

    let data = {
      isEdit: this.state.isEdit,
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
    //this.props.Training(data);    
    axios.post("http://localhost:4000/Course", data).then(res => {
      this.getAll();
    })
  }

  componentDidMount(props) {
    this.getAll();

  }
  getAll() {
    axios.get("http://localhost:4000/Course").then(res => {
      // console.log(res.data);
      this.setState({
        data: res.data
      })
    })
  }

  componentWillReceiveProps(props) {
    console.log("mahi");
    console.log(props);

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
                  <Link to="Course" className="btn btn-primary float-right">View List</Link>
                </div>

                <br />
                <div className="app-title">
                  <div>
                    <h1>Add Course</h1>
                  </div>
                </div>

                <div className="row" style={{ marginLeft: '10px' }}>
                  <div className="col-md-12">
                    <div className="card m-b-30">
                      <div className="card-body">
                        <div className="tile">
                          <div className="tile-body" id="app">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="product-upload-inner">
                                  <form id="uploadForm" className="product-upload-form" onSubmit={this.course}>
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
                                            <option>Mech </option>
                                            <option>IT </option>
                                          </select>

                                          <div style={{ color: "red" }}>{this.state.departmentError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Certification <span style={star}><b>*</b></span></label>
                                          <select name="certification" onChange={this.adding} Value={this.state.certification} className="form-control form-control-lg">
                                            <option>Select</option>
                                            <option>TIDF Certificate </option>
                                            <option>Intern Certificate </option>
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
                                            <option  >Select </option>
                                            <option  >YES </option>
                                            <option  > NO</option>
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
                                            <option  >Select </option>
                                            <option  >YES </option>
                                            <option  > NO</option>
                                          </select>

                                          <div style={{ color: "red" }}>{this.state.up_skillError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Fee Pay <span style={star}><b>*</b></span> </label>
                                          <select className="form-control form-control-lg" onChange={this.adding} Value={this.state.fee_pay} name="fee_pay">
                                            <option >Select </option>
                                            <option  >Installment 1 </option>
                                            <option >Installment 2</option>
                                            <option > Installment 3</option>
                                            <option > Installment 4</option>
                                          </select>

                                          <div style={{ color: "red" }}>{this.state.fee_payError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Course On <span style={star}><b>*</b></span></label>
                                          <select className="form-control form-control-lg" onChange={this.adding} Value={this.state.courses} name="courses">
                                            <option >Select </option>
                                            <option  >Online </option>
                                            <option >Offline</option>

                                          </select>

                                          <div style={{ color: "red" }}>{this.state.coursesError}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Upgrade Plan <span style={star}><b>*</b></span></label>
                                          <input name="upgrade" type="text" className="form-control form-control-lg" onChange={this.adding} Value={this.state.upgrade} placeholder="Enter Training fee..." />
                                          <p id="errprice" className="em no-margin text-danger">
                                          </p>
                                          <div style={{ color: "red" }}>{this.state.upgradeError}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-2">
                                                                        <label> <br /></label>
                                                                        <button type="submit"  className="btn btn-info btn-block" onChange={this.adding}  name="button">Submit</button>
                                                                    </div>
                                    </div>
                                  </form></div>
                              </div></div></div></div></div>
                    </div></div> </div>    </div></div>
            <br>
            </br>
            <Footer />
          </main></div>

      </div>
    )
  }
}

export default Course_add;