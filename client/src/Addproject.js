import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Project from './Project';
import axios from "axios";

 

let logIn = false
const initialState = {
  client_name: "",
  mobile: "",
  email: "",
  company_name: "",
  project_type: "",
  cost: "",
  address: "",
  status: "",
  client_nameError: "",
  mobileError: "",
  emailError: "",
  company_nameError: "",
  project_typeError: "",
  costError: "",
  addressError: "",
  statusError: "",
  logIn : "",
  Edit_Id : ""
};

class Addproject extends Component {
  //state = initialState;
  constructor() {
    super(); 
    this.state = initialState;
  } 
  adding = event => { 
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  validate = () => {
    let client_nameError = "";
    let emailError = "";
    let mobileError = "";
    let company_nameError = "";
    let project_typeError = "";
    let costError = "";
    let addressError = "";
    let statusError = "";

    if (!this.state.client_name) {
      client_nameError = " * This Field is Required "
    }

    if (!this.state.mobile) {
      mobileError = " * This Field is Required "
    }

    if (!this.state.company_name) {
      company_nameError = " * This Field is Required "
    }

    if (!this.state.project_type) {
      project_typeError = " * This Field is Required "
    }

    if (!this.state.cost) {
      costError = " * This Field is Required "
    }

    if (!this.state.address) {
      addressError = " * This Field is Required "
    }
    if (!this.state.status) {
      statusError = " * This Field is Required "
    }

    if (!this.state.email.includes("@")) {
      emailError = "* Invalid Email";
    }
    if (emailError || client_nameError || mobileError || company_nameError || project_typeError || costError || addressError, statusError) {
      this.setState({ emailError, client_nameError, mobileError, company_nameError, project_typeError, costError, addressError, statusError });
      return false;
    }
    return true;

  }
  // form event
  project = event => { 
    event.preventDefault()
    const isValid = this.validate();
    
    if (isValid) {
      this.setState({ initialState, logIn: true }); 
      if (!this.state.Edit_Id) {
          let data = {
            isEdit: this.state.isEdit,
            client_name: this.state.client_name,
            mobile: this.state.mobile,
            email: this.state.email,
            company_name: this.state.company_name,
            project_type: this.state.project_type,
            cost: this.state.cost,
            address: this.state.address,
            status: this.state.status
            } 
          axios.post("http://localhost:4000/project", data).then(res => {
            this.setState({  logIn: true });
            this.getAll();
          })
        }
        else 
        {
          let data = {
            _id: this.state._id,
            client_name: this.state.client_name,
            mobile: this.state.mobile,
            email: this.state.email,
            company_name: this.state.company_name,
            project_type: this.state.project_type,
            cost: this.state.cost,
            address: this.state.address,
            status: this.state.status
            } 
          axios.put("http://localhost:4000/project/update", data).then(res => {
            this.setState({  logIn: true });
            this.getAll();
          })
        }
  }
    
  }


  componentDidMount(props) {
    this.getAll();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Edit_Id = urlParams.get('id')
    this.setState({
      Edit_Id
    })

    axios.get(`http://localhost:4000/project/${Edit_Id}`).then(res => {
      console.log(res.data)
      this.setState({
        data: res.data,
         _id: res.data._id, 
        client_name: res.data.client_name,
        mobile: res.data.mobile,
        email: res.data.email,
        company_name: res.data.company_name,
        project_type: res.data.project_type,
        cost: res.data.cost,
        address: res.data.address,
        status: res.data.status
        
      })
    }) 

  }
  getAll() {
    axios.get("http://localhost:4000/project").then(res => {
      // console.log(res.data);
      this.setState({
        data: res.data
      })
    })
  }

  


  render() {

    if (this.state.logIn) {
      return <Redirect to="/Project" />
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

                    <h1>Add Project</h1>
                  </div>
                </div>

                <div style={{ marginTop: "-5px" }} >
                  <Link to="/Project" className="btn btn-primary float-right">View List</Link>
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

                                  <form id="uploadForm" className="product-upload-form" onSubmit={this.project}>
                                    <div className="row">
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>Client Name <span style={star}><b>*</b></span></label>
                                          <input name="client_name" type="text" className="form-control form-control-lg" onChange={this.adding} value={this.state.client_name} placeholder="Enter Name..." />
                                          <div style={{ color: "red" }}>{this.state.client_nameError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>Mobile <span style={star}><b>*</b></span></label>
                                          <input name="mobile" type="text" className="form-control form-control-lg" onChange={this.adding} value={this.state.mobile} placeholder="Enter Mobile..." />
                                          <div style={{ color: "red" }}>{this.state.mobileError}</div>

                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>Email <span style={star}><b>*</b></span></label>
                                          <input name="email" type="text" className="form-control form-control-lg" onChange={this.adding} value={this.state.email} placeholder="Enter Email..." />
                                          <div style={{ color: "red" }}>{this.state.emailError}</div>

                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>Company Name <span style={star}><b>*</b></span></label>
                                          <input name="company_name" type="text" className="form-control form-control-lg" onChange={this.adding} value={this.state.company_name} placeholder="Enter Company Name..." />
                                          <div style={{ color: "red" }}>{this.state.company_nameError}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">

                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>Type of Project <span style={star}><b>*</b></span></label>
                                          <input type="text" name="project_type" className="form-control form-control-lg" onChange={this.adding} value={this.state.project_type} placeholder="Enter Your Project.." />

                                          <div style={{ color: "red" }}>{this.state.project_typeError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>Cost <span style={star}><b>*</b></span></label>
                                          <input name="cost" type="text" className="form-control form-control-lg" onChange={this.adding} value={this.state.cost} placeholder="Enter Student/Graduate..." />
                                          <div style={{ color: "red" }}>{this.state.costError}</div>
                                        </div>
                                      </div>
                                      
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>Status  <span style={star}><b>*</b></span></label>
                                          <input name="status" type="text" className="form-control form-control-lg" onChange={this.adding} value={this.state.status} placeholder="Enter Status..." />
                                          <div style={{ color: "red" }}>{this.state.statusError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <label >Address <span style={star}><b>*</b></span></label>
                                        <textarea className="form-control form-control-lg" name="address" onChange={this.adding} value={this.state.address} rows="3"   ></textarea>
                                        <div style={{ color: "red" }}>{this.state.addressError}</div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-2">
                                        <label> <br /></label>

                                        <button type="submit" className="btn btn-info btn-block" name="button">Submit</button>
                                      </div>
                                    </div>
                                  </form></div>
                              </div></div></div></div></div>
                    </div></div> </div>
                <br>
                </br>
                <Footer />
              </main>
            </div>
          </div>
        </div>
      </div>




    )
  }
}
export default Addproject;