import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Link, Redirect } from 'react-router-dom'
import Graph from './Graph';
import Chart_Graph from './chart_Graph';
import axios from 'axios';
import NumberFormat from 'react-number-format';


var total = 0;
var totals = 0;
var pro = 0;
var pros = 0;
var com = 0;
var coms = 0;

class DashboardContent extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }

        this.state = {
            dataAdvance: [],
            dataProjectAdvancelist: [],
            dataCompanyAdvancelist: [],
            data: [],
            prodata: [],
            comdata: [],
            datas: [],
            datapro: [],
            datacom: [],
            dataAdvance: [],
            loggedIn
        }

    }



    componentDidMount() {
        this.getAll();
        this.setState({ totalval: total })
    }
    getAll() {
        axios.get("http://localhost:4000/TraineAdvance").then(res => {
            this.setState({
                dataAdvance: res.data
            })
        })

        axios.get("http://localhost:4000/ProjectAdvance/").then(res => {
            this.setState({
                dataProjectAdvancelist: res.data
            })
        })

        axios.get("http://localhost:4000/CompanyAdvance/").then(res => {
            this.setState({
                dataCompanyAdvancelist: res.data
            })
        })

        axios.get("http://localhost:4000/Training/recentdata/12").then(res => {
            // console.log(res.data);
            this.setState({
                data: res.data
            })
        })

        axios.get("http://localhost:4000/Project/recentdata/12").then(res => {
            // console.log(res.data);
            this.setState({
                prodata: res.data
            })
        })

        axios.get("http://localhost:4000/Company/recentdata/12").then(res => {
            // console.log(res.data);
            this.setState({
                comdata: res.data
            })
        })

    }





    render() {

        const ram = this.state.datas.length;
        const project = this.state.datapro.length;
        const company = this.state.datacom.length;

        const totallead = ram + project + company;


        return (
            <div>


                <tbody>

                    {totals = 0,
                        (
                            this.state.dataAdvance.length > 0 ?
                                this.state.dataAdvance.map((Payments, index) =>

                                    <tr key={Payments._id}>


                                        <td>


                                            {total = 0,

                                                Payments.payment.map(part => {
                                                    total += part.PaymentAmt;
                                                }
                                                )}

                                            <NumberFormat style={{ display: 'none' }} value={total += Payments.advanceAmt} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} />

                                        </td>
                                        <td>

                                        </td>


                                        <div style={{ display: 'none' }}>{totals += (total)} </div>

                                    </tr>
                                )
                                :
                                (
                                    <tr><td colSpan="87">No Data Found</td></tr>
                                )
                        )}
                    <td ><NumberFormat style={{ display: 'none' }} value={totals} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                </tbody>

                {/* project */}

                <tbody>

                    {pros = 0,
                        (
                            this.state.dataProjectAdvancelist.length > 0 ?
                                this.state.dataProjectAdvancelist.map((Project, index) =>

                                    <tr key={Project._id}>

                                        <td>

                                            {pro = 0,

                                                Project.payment.map(part => {
                                                    pro += part.PaymentAmt;
                                                }
                                                )}

                                            <NumberFormat style={{ display: 'none' }} value={pro += Project.advanceAmt} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} />
                                        </td>

                                        <div style={{ display: 'none' }}>{pros += (pro)} </div>
                                    </tr>
                                )
                                :
                                (
                                    <tr><td colSpan="87">No Data Found</td></tr>
                                )
                        )}
                    <td ><NumberFormat style={{ display: 'none' }} value={pros} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>

                </tbody>

                {/* company */}


                <tbody>

                    {coms = 0,
                        (
                            this.state.dataCompanyAdvancelist.length > 0 ?
                                this.state.dataCompanyAdvancelist.map((Company, index) =>

                                    <tr key={Company._id}>

                                        <td>


                                            {com = 0,

                                                Company.payment.map(part => {
                                                    com += part.PaymentAmt;
                                                }
                                                )}

                                            <NumberFormat style={{ display: 'none' }} value={com += Company.advanceAmt} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} />
                                        </td>

                                        <div style={{ display: 'none' }}>{coms += (com)} </div>
                                    </tr>
                                )
                                :
                                (
                                    <tr><td colSpan="87">No Data Found</td></tr>
                                )
                        )}
                    <td ><NumberFormat style={{ display: 'none' }} value={coms} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>

                </tbody>



                <div className="page-content-wrapper ">

                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="float-right page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                                <h5 className="page-title">Dashboard</h5>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card mini-stat m-b-30">
                                    <div className="p-3 bg-primary text-white">
                                        <div className="mini-stat-icon">
                                            <i className="mdi mdi-cube-outline float-right mb-0"></i>
                                        </div>
                                        <h6 className="text-uppercase mb-0">Total sales</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="border-bottom ">
                                            <h3><span className="text-muted"><center>{totals + pros + coms}</center></span></h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card mini-stat m-b-30">
                                    <div className="p-3 bg-primary text-white">
                                        <div className="mini-stat-icon">
                                            <i className="mdi mdi-account-network float-right mb-0"></i>
                                        </div>
                                        <h6 className="text-uppercase mb-0">Training</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="border-bottom ">


                                            <h3><span className="text-muted"><center>{totals}</center></span></h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card mini-stat m-b-30">
                                    <div className="p-3 bg-primary text-white">
                                        <div className="mini-stat-icon">
                                            <i className="mdi mdi-tag-text-outline float-right mb-0"></i>
                                        </div>
                                        <h6 className="text-uppercase mb-0">Project</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="border-bottom ">
                                            <h3><span className="text-muted"><center>{pros}</center></span></h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card mini-stat m-b-30">
                                    <div className="p-3 bg-primary text-white">
                                        <div className="mini-stat-icon">
                                            <i className="mdi mdi-cart-outline float-right mb-0"></i>
                                        </div>
                                        <h6 className="text-uppercase mb-0"> Company</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="border-bottom ">
                                            <h3><span className="text-muted"><center>{coms}</center></span></h3>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {/* <div className="col-xl-8">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <h4 className="mt-0 header-title">TOTAL PROJECTION </h4>

                                        <ul className="list-inline widget-chart m-t-20 text-center">
                                            <li>
                                                <h4 className=""><b>{totals + pros + coms}</b></h4>
                                                <p className="text-muted m-b-0">Total Lead</p>
                                            </li>
                                            <li>
                                                <h4 className=""><b>5421</b></h4>
                                                <p className="text-muted m-b-0">Last week</p>
                                            </li>
                                            <li>
                                                <h4 className=""><b>9652</b></h4>
                                                <p className="text-muted m-b-0">Last Month</p>
                                            </li>
                                        </ul>

                                        <div className="app">
                                            <Graph />

                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-xl-12">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <h4 className="mt-0 header-title">Revenue</h4>

                                        <ul className="list-inline widget-chart m-t-20 text-center">
                                            <li>
                                                <h4 className=""><b>{totals + pros + coms}</b></h4>
                                                <p className="text-muted m-b-0">Total Revenue</p>
                                            </li>
                                            {/* <li>
                                                <h4 className=""><b>321</b></h4>
                                                <p className="text-muted m-b-0">Last week</p>
                                            </li>
                                            <li>
                                                <h4 className=""><b>964</b></h4>
                                                <p className="text-muted m-b-0">Last Month</p>
                                            </li> */}
                                        </ul>
                                        <Chart_Graph />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <h4 className="mt-0 header-title mb-4">Recent Training Transactions</h4>
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Mobile No</th>
                                                        <th>Email</th>
                                                        <th>Course</th>
                                                        <th>Status</th>

                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {

                                                        (
                                                            this.state.data.length > 0 ?

                                                                this.state.data.map((Training, index) =>

                                                                    <tr key={Training._id}>
                                                                        {/* <td>{index+1}</td> */}
                                                                        <td>{Training.name}</td>
                                                                        <td>{Training.mobile}</td>
                                                                        <td>{Training.email}</td>
                                                                        <td>{Training.course_offered}</td>
                                                                        {/* <td><NumberFormat value={Training.fees_offered} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td> */}
                                                                        <td>{Training.status}</td>

                                                                    </tr>
                                                                )
                                                                :
                                                                (
                                                                    <tr><td colSpan="7">No Data Found</td></tr>
                                                                )
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <h4 className="mt-0 header-title mb-4">Recent Project Transactions</h4>
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Client Name</th>
                                                        <th>Mobile No</th>
                                                        <th>Email</th>
                                                        <th>Company Name</th>
                                                        <th>Type of Project	</th>
                                                        <th>Cost</th>
                                                        <th>Status</th>

                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {

                                                        (
                                                            this.state.prodata.length > 0 ?

                                                                this.state.prodata.map((Project, index) =>

                                                                    <tr key={Project._id}>
                                                                        {/* <td>{index+1}</td> */}
                                                                        <td>{Project.client_name}</td>
                                                                        <td>{Project.mobile}</td>
                                                                        <td>{Project.email}</td>
                                                                        <td>{Project.company_name}</td>
                                                                        <td>{Project.project_type}</td>
                                                                        <td><NumberFormat value={Project.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                                                                        {/* <td>{Project.address}</td> */}
                                                                        <td>{Project.status}</td>

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

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <h4 className="mt-0 header-title mb-4">Recent Company Transactions</h4>
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Client Name	</th>
                                                        <th> Company Name	</th>
                                                        <th>Requirement</th>
                                                        <th>No of Candidate	</th>
                                                        <th>Cost</th>
                                                        <th>Status</th>

                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {

                                                        (
                                                            this.state.comdata.length > 0 ?

                                                                this.state.comdata.map((Company, index) =>

                                                                    <tr key={Company._id}>
                                                                        {/* <td>{index + 1}</td> */}
                                                                        <td>{Company.client_name}</td>
                                                                        <td>{Company.company_name}</td>
                                                                        {/* <td>{Company.address}</td> */}
                                                                        <td>{Company.requirement}</td>
                                                                        <td>{Company.no_of_candidate}</td>
                                                                        <td><NumberFormat value={Company.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                                                                        <td>{Company.status}</td>


                                                                    </tr>
                                                                )
                                                                :
                                                                (
                                                                    <tr><td colSpan="8">No Data Found</td></tr>
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
        );
    }
}


class Dashboard extends Component {
    render() {
        return (

            <div id="wrapper">
                <Sidebar />
                <div className="content-page">
                    <div className="content">
                        <Header />
                        <DashboardContent />
                    </div>
                    <Footer />

                </div>
            </div>


        );
    }
}

export default Dashboard;

