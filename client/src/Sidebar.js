import React, { Component } from 'react';
import logo from './images/logo.png';
import { Link } from "react-router-dom";
import Dashboard from './Dashboard';
import EmployeeList from './EmployeeList';
import { Scrollbars } from 'react-custom-scrollbars'; 
import Excel_upload from './Excel_upload';
import Training from './Training';
import Course from './Course';

import Target_add from './Target_add';
import Target_list from './Target_list'; 
import Company from './Company'; 
import Project from './Project';

import PaymentTraining from './PaymentTraining';   
import PaymentProject from './PaymentProject'; 
import PaymentCompany from './PaymentCompany';

import ReportTraining from './ReportTraining';
import ReportProject from './ReportProject';
import ReportCompany from './ReportCompany';


//import './path.js';

class Sidebar extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token")
    }
    render() {
        return (
            <div >
                <div className="left side-menu">
                    <button type="button" className="button-menu-mobile button-menu-mobile-topbar open-left waves-effect">
                        <i className="ion-close"></i>
                    </button>
                    <div className="left-side-logo d-block d-lg-none">
                        <div className="text-center">
                        <Link  to="/Dashboard" className="logo"><img src={logo} height="20" alt="logo" /></Link>
                        </div>
                    </div>
                    <Scrollbars style={{ width: 240, height: 650 }}>
                    <div className="sidebar-inner slimscrollleft">
                        <div id="sidebar-menu">
                            <ul>
                                <li className="menu-title">Main</li>
                                <li><Link  to="/Dashboard"className="waves-effect"><i className="dripicons-meter"></i><span> Dashboard </span></Link></li>
                                <li className=""><Link to ="/EmployeeList" className="waves-effect"><i className="dripicons-user"></i> <span> Employee   </span> </Link></li>
                                <li className=""><Link to ="/Target_list" className="waves-effect"><i className="dripicons-pencil"></i> <span> Target Creation  </span> </Link></li>
                                <li className=""><Link to ="/Course" className="waves-effect"><i className="dripicons-document-edit"></i> <span> Course Creation  </span> </Link></li>
                                <li className="has_sub  nav-active">
                                    <a data-toggle="collapse"  className="waves-effect" style={{background:"white"}} href="#collapse1"><i className="dripicons-graph-pie"></i><span> Lead </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                    <ul className="list-unstyled">
                                    <div id="collapse1" className="collapse">
                                        <li><Link to="/Training">&ensp;<span>Training</span></Link></li>
                                        <li><Link to="/Project">&ensp;<span>Project</span></Link></li>
                                        <li><Link to="/Company">&ensp;<span>Company</span></Link></li>
                                        </div>
                                    </ul> 
                                </li>
                                <li className=""><Link to="/Excel_upload" className="waves-effect"><i className="dripicons-upload"></i> <span> Excel Data Upload </span> </Link> </li>
                                {/* <li className=""><a href="agreement_list.html" className="waves-effect"><i className="dripicons-graduation"></i> <span> Agreement  </span> </a> </li> */}
                                {/* <li className=""><Link to="/Payment" className="waves-effect"><i className="dripicons-wallet"></i> <span> Payments</span> </Link></li> */}
                                <li className="has_sub  nav-active">
                                    <a data-toggle="collapse"  className="waves-effect" style={{background:"white"}} href="#collapse2"><i className="dripicons-wallet"></i><span> Payments </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                    <ul className="list-unstyled">
                                    <div id="collapse2" className="collapse">
                                        <li><Link to="/PaymentTraining">&ensp;<span>Training</span></Link></li>
                                        <li><Link to="/PaymentProject">&ensp;<span>Projects</span></Link></li>
                                        <li><Link to="/PaymentCompany">&ensp;<span>Company</span></Link></li>
                                        </div>
                                    </ul>
                                </li>
                                {/* <li className=""><Link to="/Report" className="waves-effect"><i className="dripicons-article"></i> <span> Report  </span> </Link></li> */}
                                <li className="has_sub  nav-active">
                                    <a data-toggle="collapse"  className="waves-effect" style={{background:"white"}} href="#collapse3"><i className="dripicons-article"></i><span> Reports </span> <span className="menu-arrow float-right"><i className="mdi mdi-chevron-right"></i></span></a>
                                    <ul className="list-unstyled">
                                    <div id="collapse3" className="collapse">
                                        <li><Link to="/ReportTraining">&ensp;<span>Training</span></Link></li>
                                        <li><Link to="/ReportProject">&ensp;<span>Projects</span></Link></li>
                                        <li><Link to="/ReportCompany">&ensp;<span>Company</span></Link></li>
                                        </div>
                                    </ul>
                                </li>
                                {/* <li className=""><a href="certification_list.html" className="waves-effect"><i className="dripicons-clipboard"></i> <span> Certification </span> </a></li> */}
                                <li className=""><Link to="/" className="waves-effect"><i className="dripicons-exit"></i> <span> Logout</span> </Link> </li>
                            </ul>
                        </div> 
                    </div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}

export default Sidebar;