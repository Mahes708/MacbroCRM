import React from 'react';
import {  BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import Login from './Login';
import Dashboard from './Dashboard';
import EmployeeList from './EmployeeList';
import Employee from './Employee';
import Excel_upload from './Excel_upload';
import Addtraining from './Addtraining';
import Training from './Training'; 
const greeting = 'Welcome to React';


function App() {
  return (
    <div >
     
      <div id="preloader"><div id="status"><div className="spinner"></div></div></div>
      <Router>      
      <Switch>  
        <Route path="/" exact >  <Login /></Route> 
        <Route path="/Login"  >  <Login /></Route> 
        <Route path="/Dashboard">  <Dashboard /></Route>
        <Route path="/EmployeeList">  <EmployeeList  /></Route>
        <Route path="/Employee">  <Employee greeting={greeting} /></Route>
        <Route path="/Excel_upload">  <Excel_upload /></Route>
        <Route path="/Addtraining">  <Addtraining /></Route>
        <Route path="/Training">  <Training /></Route>
        
         
      </Switch>      
    </Router>

  
    </div>
  );
}

export default App;
