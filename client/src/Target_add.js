import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from "axios";

let loggedIn = false
const initial = {
  _id: "",
  User_id: "",
  UserName: "",
  From_date: "",
  To_date: "",
  Target: "",
  User_idError: "",
  UserNameError: "",
  From_dateError: "",
  To_dateError: "",
  TargetError: "",
  data: "",
  selectedEmployeeCode: "",
  dataEmployeeCode: "",
  loggedIn: "",
  Edit_Id: ""
  // isEdit:""
}

class Target_add extends Component {
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
    let User_idError = "";
    let UserNameError = "";
    let From_dateError = "";
    let To_dateError = "";
    let TargetError = "";

    if (!this.state.User_id) {
      User_idError = " * This Field is Required "
    }

    if (!this.state.UserName) {
      UserNameError = " * This Field is Required "
    }
    if (!this.state.From_date) {
      From_dateError = " * This Field is Required "
    }

    if (!this.state.To_date) {
      To_dateError = " * This Field is Required "
    }
    if (!this.state.Target) {
      TargetError = " * This Field is Required ";
    }


    if (User_idError || UserNameError || From_dateError || To_dateError || TargetError) {
      this.setState({ User_idError, UserNameError, From_dateError, To_dateError, TargetError });
      return false;
    }
    return true;

  }


  // form event
  Target = event => {
    event.preventDefault();
    const isValid = this.validate();
    //this.setState(initial);
    // console.log(this.state.name)

    if (isValid) {
      this.setState({ initial, loggedIn: true });
      if (!this.state.Edit_Id) {
        let data = {
          User_id: this.state.User_id,
          UserName: this.state.UserName,
          From_date: this.state.From_date,
          To_date: this.state.To_date,
          Target: this.state.Target
        }
        axios.post("http://localhost:4000/Target", data).then(res => {
          this.setState({ loggedIn: true });
          this.getAll();
        })
      }
      else {
        let data = {
          _id: this.state._id,
          User_id: this.state.User_id,
          UserName: this.state.UserName,
          From_date: this.state.From_date,
          To_date: this.state.To_date,
          Target: this.state.Target
        }
        axios.put("http://localhost:4000/Target/update", data).then(res => {
          this.setState({ loggedIn: true });
          this.getAll();
        })

      }
    }
  }

  componentDidMount(props) {
    this.getAll();
    this.getEmployee();
    this.getEmployeecode();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const Edit_Id = urlParams.get('id')
    this.setState({
      Edit_Id
    })

    axios.get(`http://localhost:4000/Target/${Edit_Id}`).then(res => {
      console.log(res.data)
      this.setState({
        data: res.data,
        _id: res.data._id,
        User_id: res.data.User_id,
        UserName: res.data.UserName,
        From_date: res.data.From_date,
        To_date: res.data.To_date,
        Target: res.data.Target
      })
    })


  }
  getAll() {
    axios.get("http://localhost:4000/Target").then(res => {
      // console.log(res.data);
      this.setState({
        data: res.data
      })
    })
  }


  getEmployee() {
    axios.get("http://localhost:4000/Employee").then(res => {
      console.log(res.data)
      this.setState({
        employeeData: res.data
      })
      //   console.log(res.data)
    })

  }

  setEmployeeName = (id) => {
    this.setState({
      User_id: id.target.value,
    });

    this.state.employeeData.map((item, key) => {
      if (item.Employee_code === id.target.value) {
        this.setState({
          UserName: item.Employee_name,
        });
      }
    });
  }

  getEmployeecode() {
    axios.get("http://localhost:4000/Employee").then(res => {
      this.setState({
        dataEmployeeCode: res.data
      })
    })
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/Target_list" />
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

                    <h1>Add Target</h1>
                  </div>
                </div>

                <div style={{ marginTop: "-5px" }} >
                  <Link to="/Target_list" className="btn btn-primary float-right">View List</Link>
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
                                  <form id="uploadForm" className="product-upload-form" onSubmit={this.Target}>
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Select User <span style={star}><b>*</b></span></label>

                                          <select class="custom-select" value={this.state.User_id} onChange={this.setEmployeeName}  >
                                            <option >Select User Id</option>
                                            {
                                              (
                                                this.state.dataEmployeeCode.length > 0 ?

                                                  this.state.dataEmployeeCode.map((Employees, index) =>

                                                    <option key={index} value={Employees.Employee_code}>{Employees.Employee_code}</option>
                                                  ) :
                                                  (
                                                    <option value="No">No</option>
                                                  )
                                              )
                                            }

                                          </select>  <p id="errquantity" className="em no-margin text-danger" />
                                          <div style={{ color: "red" }}>{this.state.User_idError}</div>
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>User Name <span style={star}><b>*</b></span></label>

                                          <input type="text" name="UserName" className="form-control form-control-lg" value={this.state.UserName} onChange={this.adding} placeholder="Enter User Name..." readOnly />


                                          <p id="errquantity" className="em no-margin text-danger" />
                                          <div style={{ color: "red" }}>{this.state.UserNameError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>From Date <span style={star}><b>*</b></span></label>
                                          <input name="From_date" type="date" className="form-control form-control-
                                          lg" value={this.state.From_date} onChange={this.adding} placeholder="DD/MM/YYYY" />
                                          <p id="errsubcat" className="em no-margin text-danger" />
                                          <div style={{ color: "red" }}>{this.state.From_dateError}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>To Date <span style={star}><b>*</b></span></label>
                                          <input name="To_date" type="date" className="form-control form-control-lg" value={this.state.To_date} onChange={this.adding} placeholder="DD/MM/YYYY" />
                                          <p id="errsubcat" className="em no-margin text-danger" />
                                          <div style={{ color: "red" }}>{this.state.To_dateError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label>Target <span style={star}><b>*</b></span> <span /></label>
                                          <input name="Target" type="text" className="form-control form-control-lg" value={this.state.Target} onChange={this.adding} placeholder="Enter Target..." />
                                          <p id="errtitle" className="em no-margin text-danger" />
                                          <div style={{ color: "red" }}>{this.state.TargetError}</div>
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <div className="form-group">
                                        <label> <br /></label>
                                        <button type="submit" className="btn btn-info btn-block" name="button"> {this.state.Edit_Id ? 'Update' : 'Submit'}</button>
                                        </div>
                                      </div>
                                     
                                    </div></form> 
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> </div>
                    </div></div></div></main>

              <Footer />
            </div></div>
        </div>
      </div>
    );
  }
}


export default Target_add;