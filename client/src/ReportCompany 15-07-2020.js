import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Autocomplete from './Autocomplete';


class ReportCompany extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            data: [],
            FromDate: "",
            ToDate: "",
            name: "",
            email: "",
            Emp_name: [],
            userInput: ''
        }

    }
    componentDidMount() {
        this.getAll();
        this.getEmployeeName();
        //  this.getEmpName();
    }
    getAll() {
        axios.get("http://localhost:4000/Company").then(res => {
            // console.log(res.data);
            this.setState({
                data: res.data
            })
        })
    }

    Change = event => {
        console.log( event.target)
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    TrainingReport = event => {

        event.preventDefault();

        if ((this.state.FromDate != '') && (this.state.ToDate != '') && (this.state.name != '') && (this.state.email != '')) {
            axios.get(`http://localhost:4000/Company/SearchAll/${this.state.FromDate}/${this.state.ToDate}/${this.state.name}/${this.state.email}`).then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
        else if ((this.state.FromDate != '') && (this.state.ToDate != '') && (this.state.name == '') && (this.state.email == '')) {
            axios.get(`http://localhost:4000/Company/SearchDate/${this.state.FromDate}/${this.state.ToDate}`).then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
        else if ((this.state.FromDate != '') && (this.state.ToDate != '') && (this.state.name != '')) {
            axios.get(`http://localhost:4000/Company/SearchDateName/${this.state.FromDate}/${this.state.ToDate}/${this.state.name}`).then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
        else if ((this.state.FromDate != '') && (this.state.ToDate != '') && (this.state.email != '')) {
            axios.get(`http://localhost:4000/Company/SearchDateEmail/${this.state.FromDate}/${this.state.ToDate}/${this.state.email}`).then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
        else if ((this.state.FromDate == '') && (this.state.ToDate == '') && (this.state.name != '') && (this.state.email != '')) {
            axios.get(`http://localhost:4000/Company/SearchNameEmail/${this.state.name}/${this.state.email}`).then(res => {
                this.setState({
                    data: res.data
                })
            })
        }
        else if ((this.state.FromDate == '') && (this.state.ToDate == '') && (this.state.name == '') && (this.state.email != '')) {
            axios.get(`http://localhost:4000/Company/SearchEmail/${this.state.email}`).then(res => {
                this.setState({
                    data: res.data
                })
            })

        }
        else if ((this.state.FromDate == '') && (this.state.ToDate == '') && (this.state.name != '') && (this.state.email == '')) {
            axios.get(`http://localhost:4000/Company/SearchName/${this.state.name}`).then(res => {
                this.setState({
                    data: res.data
                })
            })

        }
        else {
            this.getAll();
        }
    }

    getEmployeeName() {
        axios.get("http://localhost:4000/Employee").then(res => {
            var name = res.data;
            var value = [];
            var Emp_name = [];
            for (var i = 0, l = name.length; i < l; i++) {
                if (name[i]) {
                    value.push(name[i].Employee_name);
                    this.setState({
                        Emp_name: value
                    });
                }
            }
        })
    }

    render() {

        console.log(this.props.name)
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Sidebar />
                    <div className="content-page">
                        <div className="content">
                            <br />
                            <div className="app-title">
                                <div>
                                    <h1> Report Company</h1>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="page-content-wrapper ">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card m-b-30">
                                                <div className="card-body">
                                                    <form id="uploadForm" class="product-upload-form" onSubmit={this.TrainingReport}  >
                                                        <div class="form-element margin-bottom-20">
                                                            <div class="form-group">
                                                                <p id="errpreimg" class="em no-margin text-danger"></p>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-2">
                                                                <div class="form-group">
                                                                    <label>From Date <span></span></label>
                                                                    <input name="FromDate" type="date" class="form-control form-control-lg" placeholder="Enter Name..." onChange={this.Change} />
                                                                    <p id="errtitle" class="em no-margin text-danger"></p>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <div class="form-group">
                                                                    <label>To Date<span></span></label>
                                                                    <input name="ToDate" type="date" class="form-control form-control-lg" placeholder="Enter Name..." onChange={this.Change} />
                                                                    <p id="errtitle" class="em no-margin text-danger"></p>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Name</label>

                                                                    <Autocomplete   
                                                                    
                                                                        options={this.state.Emp_name}
                                                                    //  options={[
                                                                    //     "Papaya",
                                                                    //     "Persimmon",
                                                                    //     "Paw Paw",
                                                                    //     "Prickly Pear",
                                                                    //     "Peach",
                                                                    //     "Pomegranate",
                                                                    //     "Pineapple"
                                                                    //   ]}  
                                                                    />
                                                                </div>
                                                            </div>


                                                            {/* <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Name</label>
                                                                    <input name="name" type="text" class="form-control form-control-lg" placeholder="Enter Name..." onChange={this.Change} />
                                                                    <p id="errprice" class="em no-margin text-danger"></p>
                                                                </div>
                                                            </div> */}
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Email</label>
                                                                    <input name="email" type="text" class="form-control form-control-lg" placeholder="Enter Email..." onChange={this.Change} />
                                                                    <p id="errprice" class="em no-margin text-danger"></p>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-2">
                                                                <div class="form-group mb-0">
                                                                    <input type="submit" class="form-control btn btn-info" placeholder=" " value="Search" style={{ marginTop: '31px' }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <table id="datatable-buttons" className="table table-striped table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>S.NO</th>
                                                                <th>Date</th>
                                                                <th>Client Name</th>
                                                                <th>Email</th>
                                                                <th>Mobile</th>
                                                                <th>Company Name</th>
                                                                <th>Requirement</th>
                                                                <th>Cost</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {

                                                                (
                                                                    this.state.data.length > 0 ?

                                                                        this.state.data.map((Company, index) =>

                                                                            <tr key={Company._id}>
                                                                                <td>{index + 1}</td>
                                                                                <td><Moment format="DD-MMMM-YYYY ">{Company.createdTime}</Moment></td>
                                                                                <td>{Company.client_name}</td>
                                                                                <td>{Company.email}</td>
                                                                                <td>{Company.mobile}</td>
                                                                                <td>{Company.company_name}</td>
                                                                                <td>{Company.requirement}</td>
                                                                                <td><NumberFormat value={Company.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                                                                                <td>{Company.status}</td>
                                                                            </tr>
                                                                        )
                                                                        :
                                                                        (
                                                                            <tr><td colSpan="9">No Data Found</td></tr>
                                                                        )
                                                                )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
export default ReportCompany;