import React, { Component } from 'react';
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import { browserHistory } from "react-router";
import Login from './Login';
import Dashboard from './Dashboard';

// import EmployeeApp from './Employee/EmployeeApp';
// import AddEmployee from './Employee/AddEmployee';
// import ListEmployee from './Employee/ListEmployee';
import Employee from './Employee';
import EmployeeList from './EmployeeList';

import Excel_upload from './Excel_upload';
import Addtraining from './Addtraining';
import Training from './Training'; 
import Course from './Course'; 
import Course_add from './Course_add';
import Target_add from './Target_add';
import Target_list from './Target_list'; 
import Company from './Company'; 
import Addcompany from './Addcompany';
 import Project from './Project';
import Addproject from './Addproject';

import PaymentTraining from './PaymentTraining';   
import PaymentProject from './PaymentProject'; 
import PaymentCompany from './PaymentCompany';

import ReportTraining from './ReportTraining';
import ReportProject from './ReportProject';
import ReportCompany from './ReportCompany';
import Example from './multiselect';

 import Greek from './test'; 
 


class App extends Component {
 
    render() {
    
      //  const greeting = 'Welcome to React';
        return (
            <div >       
              <div id="preloader"><div id="status"><div className="spinner"></div></div></div>
                <Router >      
                  <Switch>  
                      <Route path="/" exact >  <Login /></Route> 
                      <Route path="/Login"  >  <Login /></Route> 
                      <Route path="/Dashboard">  <Dashboard /></Route>
                      
                      {/* <Route path="/EmployeeApp" exact>  <EmployeeApp  /></Route>
                      <Route path="/ListEmployee">  <ListEmployee  /></Route>
                      <Route path="/AddEmployee">  <AddEmployee    /></Route> */}
                      
                      <Route path="/EmployeeList"   >  <EmployeeList    /></Route>
                      <Route path="/Employee"   >  <Employee    /></Route>
                      <Route path="/Employee/?id=:id"   >  <Employee    /></Route>

                      <Route path="/Excel_upload">  <Excel_upload /></Route>
                      <Route path="/Addtraining">  <Addtraining   /></Route>
                      <Route path="/Training">  <Training  /></Route>
                      <Route path="/Course">  <Course  /></Route>
                      <Route path="/Course_add">  <Course_add  /></Route>
                     
                      <Route path="/Target_add">  <Target_add  /></Route>
                      <Route path="/Target_list">  <Target_list  /></Route>
                      <Route path="/Addcompany">  <Addcompany  /></Route>
                      <Route path="/Company">  <Company  /></Route>
                      <Route path="/Addproject">  <Addproject  /></Route>
                      <Route path="/Project">  <Project  /></Route>

                      <Route path="/PaymentTraining">  <PaymentTraining  /></Route>
                      <Route path="/PaymentProject">  <PaymentProject  /></Route>
                      <Route path="/PaymentCompany">  <PaymentCompany  /></Route>
                     
                      <Route path="/ReportTraining" ><ReportTraining /></Route>
                      <Route path="/ReportProject" ><ReportProject /></Route>
                      <Route path="/ReportCompany" ><ReportCompany /></Route>

                      <Route path="/Example" ><Example /></Route> 

                      <Route path="/Greek" ><Greek  name ='Mahi' /></Route> 
                      {/* <Route path="/index.html" component={Dashboard} /> */}
                    </Switch>      
                  </Router>
              </div>
        );
    }
}
//const Greeting = (props) => <h1>Hello {props.name}</h1>;
 
export default App;