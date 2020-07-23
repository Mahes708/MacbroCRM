import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Company from './Company';
import axios from "axios";
import { Redirect } from 'react-router-dom'

let loggedIn = false
const initialState = {
    _id: "",
    client_name: "",
    mobile: "",
    email: "",
    company_name: "",
    requirement: "",
    no_of_candidate: "",
    cost: "",
    address: "",
    status: "",
    client_nameError: "",
    mobileError: "",
    emailError: "",
    company_nameError: "",
    requirementError: "",
    no_of_candidateError: "",
    costError: "",
    addressError: "",
    statusError: "",
    data: "",
    loggedIn: "",
    Edit_Id: ""
};

class Addcompany extends Component {

    state = initialState;
    constructor() {
        super();
    }

    c_adding = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }


    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };


    validate = () => {
        let client_nameError = "";
        let emailError = "";
        let mobileError = "";
        let company_nameError = "";
        let requirementError = "";
        let no_of_candidateError = "";
        let addressError = "";
        let statusError = "";
        let costError = "";

        if (!this.state.client_name) {
            client_nameError = " * This Field is Required"
        }

        if (!this.state.mobile) {
            mobileError = " * This Field is Required"
        }

        if (!this.state.company_name) {
            company_nameError = " * This Field is Required"
        }

        if (!this.state.requirement) {
            requirementError = " * This Field is Required"
        }

        if (!this.state.no_of_candidate) {
            no_of_candidateError = " * This Field is Required"
        }

        if (!this.state.address) {
            addressError = " * This Field is Required"
        }
        if (!this.state.status) {
            statusError = " * This Field is Required"
        }
        if (!this.state.cost) {
            costError = " * This Field is Required"
        }

        if (!this.state.email.includes("@")) {
            emailError = "* Invalid Email";
        }
        if (emailError || client_nameError || mobileError || company_nameError || requirementError || no_of_candidateError || addressError || statusError || costError) {
            this.setState({ emailError, client_nameError, mobileError, company_nameError, requirementError, no_of_candidateError, addressError, statusError, costError });
            return false;
        }
        return true;

    }


    // form event
    company = event => {

        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.setState({ initialState, loggedIn: true });
            if (!this.state.Edit_Id) {
                let data = {
                    isEdit: this.state.isEdit,
                    client_name: this.state.client_name,
                    mobile: this.state.mobile,
                    email: this.state.email,
                    company_name: this.state.company_name,
                    requirement: this.state.requirement,
                    no_of_candidate: this.state.no_of_candidate,
                    cost: this.state.cost,
                    address: this.state.address,
                    status: this.state.status

                } 
                axios.post("http://localhost:4000/Company", data).then(res => {
                    this.getAll();
                    this.setState({ loggedIn: true });
                })
            }
            else {
                let data = {
                    _id: this.state._id,
                    client_name: this.state.client_name,
                    mobile: this.state.mobile,
                    email: this.state.email,
                    company_name: this.state.company_name,
                    requirement: this.state.requirement,
                    no_of_candidate: this.state.no_of_candidate,
                    cost: this.state.cost,
                    address: this.state.address,
                    status: this.state.status
                }                 
                axios.put("http://localhost:4000/Company/update", data).then(res => {
                    this.getAll();
                    this.setState({ loggedIn: true });                    
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
    
        axios.get(`http://localhost:4000/Company/${Edit_Id}`).then(res => {
          console.log(res.data)
          this.setState({
                    data: res.data,
                    _id: res.data._id, 
                    client_name: res.data.client_name,
                    mobile: res.data.mobile,
                    email: res.data.email,
                    company_name: res.data.company_name,
                    requirement: res.data.requirement,
                    no_of_candidate: res.data.no_of_candidate,
                    cost: res.data.cost,
                    address: res.data.address,
                    status: res.data.status
          })
        }) 

    }
    getAll() {
        axios.get("http://localhost:4000/Company").then(res => {
            // console.log(res.data);
            this.setState({
                data: res.data
            })
        })
    }
    render() {

        if (this.state.loggedIn) {
            return <Redirect to="/Company" />
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

                                        <h1>Add Company</h1>
                                    </div>
                                </div>

                                <div style={{ marginTop: "-5px" }} >
                                    <Link to="/Company" className="btn btn-primary float-right">View List</Link>
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
                                                                    {/* product upload inner */}
                                                                    <form id="uploadForm" className="product-upload-form" onSubmit={this.company}>
                                                                        <div className="row">
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Client Name <span style={star}><b>*</b></span><span /></label>
                                                                                    <input name="client_name" type="text" onChange={this.c_adding} value={this.state.client_name} className="form-control form-control-lg" placeholder="Enter Name..." />
                                                                                    <div style={{ color: "red" }}>{this.state.client_nameError}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Mobile <span style={star}><b>*</b></span></label>
                                                                                    <input name="mobile" type="text" onChange={this.c_adding} value={this.state.mobile} className="form-control form-control-lg" placeholder="Enter Mobile..." />
                                                                                    <div style={{ color: "red" }}>{this.state.mobileError}</div>

                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Email <span style={star}><b>*</b></span></label>
                                                                                    <input name="email" type="text" onChange={this.c_adding} value={this.state.email} className="form-control form-control-lg" placeholder="Enter Email..." />
                                                                                    <div style={{ color: "red" }}>{this.state.emailError}</div>

                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Company Name <span style={star}><b>*</b></span></label>
                                                                                    <input name="company_name" type="text" onChange={this.c_adding} value={this.state.company_name} className="form-control form-control-lg" placeholder="Enter Company Name..." />
                                                                                    <div style={{ color: "red" }}>{this.state.company_nameError}</div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="row">

                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Requirement <span style={star}><b>*</b></span></label>
                                                                                    <input name="requirement" type="text" onChange={this.c_adding} value={this.state.requirement} className="form-control form-control-lg" placeholder="Enter requirement..." />
                                                                                    <div style={{ color: "red" }}>{this.state.requirementError}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>No.of Candidate <span style={star}><b>*</b></span></label>
                                                                                    <input name="no_of_candidate" type="text" onChange={this.c_adding} value={this.state.no_of_candidate} className="form-control form-control-lg" placeholder="Enter No.of Candidate..." />
                                                                                    <div style={{ color: "red" }}>{this.state.no_of_candidateError}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Cost  <span style={star}><b>*</b></span></label>
                                                                                    <input name="cost" type="text" onChange={this.c_adding} value={this.state.cost} className="form-control form-control-lg" placeholder="Enter Cost..." />
                                                                                    <div style={{ color: "red" }}>{this.state.costError}</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-3">
                                                                                <div className="form-group">
                                                                                    <label>Status  <span style={star}><b>*</b></span></label>
                                                                                    <input name="status" type="text" onChange={this.c_adding} value={this.state.status} className="form-control form-control-lg" placeholder="Enter Status..." />
                                                                                    <div style={{ color: "red" }}>{this.state.statusError}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-3">
                                                                                <label>Address <span style={star}><b>*</b></span></label>
                                                                                <textarea className="form-control form-control-lg" onChange={this.c_adding} value={this.state.address} name="address" rows="3"  ></textarea>
                                                                                <div style={{ color: "red" }}>{this.state.addressError}</div>
                                                                            </div>
                                                                            <div className="col-md-2">
                                                                                <label> <br /></label>
                                                                                <button type="submit" className="btn btn-info btn-block" onChange={this.c_adding} name="button">Submit</button>
                                                                            </div>
                                                                        </div>
                                                                    </form></div>
                                                            </div></div></div></div></div></div></div></div></main>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>


        )
    }
}
export default Addcompany;