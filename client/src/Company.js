import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Addcompany from './Addcompany';
import axios from 'axios';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

class Company extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      datas: [],
      DataCompanyss: [],
      editData: [],
      datastatus : [],
      statusType :"",
      traineID :"",
      dataCommand : [],
      command:"",
      Commanddate : "",
      ViewCommandDatas :[],
      dataAdvance : [],
      advanceDate :"",
      advanceAmt : ""
    }

  }

  componentDidMount() {
    this.getAll();
  }
  getAll() {
    axios.get("http://localhost:4000/Company").then(res => {
      // console.log(res.data);
      this.setState({
        data: res.data
      })
    })
  }


  editProduct = data => {
    //console.log("testting"+data)

    this.setState({
      editData: data

    })
    //console.log( this.state.data)
    if (this.state._id != null) {
      this.setState({
        isEdit: true,
        _id: this.state._id,
        isEdit: this.state.isEdit,
        client_name: this.state.client_name,
        mobile: this.state.mobile,
        email: this.state.email,
        company_name: this.state.company_name,
        requirement: this.state.requirement,
        no_of_candidate: this.state.no_of_candidate,
        address: this.state.address,
        status: this.state.status

      })
    }

  }

  // view
     
  viewcompany = data =>{  
         
    
    axios.get(`http://localhost:4000/Company/${data._id}`).then(res => {   
           console.log(res.data);     
         this.setState({
          DataCompanyss :res.data
            })            
     })
      //view Command
      axios.get(`http://localhost:4000/CompanyCommand/companyID/${data._id}`).then(res => {  
        // console.log(res.data)             
         this.setState({
             ViewCommandDatas :res.data
            })            
     })

    //  this.getAll();  
}
 
// Status Coding

companyStatus = data =>{
  axios.get(`http://localhost:4000/Company/${data._id}`).then(res => {
       this.setState({
           datastatus :res.data
          })            
   })    
}

addStatus = event => {
        
  const {name,value}=event.target;
  this.setState({
      [name] : value
  })
} 

companyStatusSubmit = event =>
{
        event.preventDefault();
        let data = 
            {               
                status : this.state.status,
                companyID : this.state.datastatus._id               
            } 
            console.log(data)   
            axios.put("http://localhost:4000/Company/update",data).then(res => {
                    this.getAll();
                })              
}

//Commend Coding


CompanyCommand = data =>{
  axios.get(`http://localhost:4000/Company/${data._id}`).then(res => {
       this.setState({
           dataCommand :res.data
          })            
   })    
}
addCommand = event => {
      
  const {name,value}=event.target;
  this.setState({
      [name] : value
  })
} 
companyCommandSubmit = event =>
{
      event.preventDefault();
      // console.log(this.state.command)
      let data = 
          {               
              command : this.state.command,
              Commanddate : this.state.Commanddate,
              companyID : this.state.dataCommand._id               
          } 
// console.log(data)   
axios.post("http://localhost:4000/CompanyCommand",data).then(res => {
  this.getAll();
})              
}




// Convert (Advance Pay)

CompanyAdvance = data =>{
  axios.get(`http://localhost:4000/Company/${data._id}`).then(res => {
       this.setState({
           dataAdvance :res.data
          })            
   })    
}
addAdvance = event => {
      
  const {name,value}=event.target;
  this.setState({
      [name] : value
  })
} 
companyAdvanceSubmit = event =>
{
      event.preventDefault();
      console.log(this.state.dataAdvance)
      let data = 
          {               
            client_name : this.state.dataAdvance.client_name,
              advanceDate : this.state.advanceDate,
              advanceAmt : this.state.advanceAmt,
              companyID : this.state.dataAdvance._id,
              company_name : this.state.dataAdvance.company_name,
              cost   : this.state.dataAdvance.cost,            
          } 
         // console.log(data)   
          axios.post("http://localhost:4000/CompanyAdvance",data).then(res => {
                  this.getAll();
              })              
}
updateCompany = data =>{       
  axios.get(`http://localhost:4000/Company/${data._id}`).then(res => {  
       this.setState({
          editData :res.data,
           isEdit : true 
          }) 
          window.location.href=`/AddCompany/?id=${this.state.editData._id}` 
   }) 
}


render() {
    return (
      <div>
        <Header />
        <div id="wrapper">
          <Sidebar />
          <main className="app-content">
            <div className="content-page">
              <div className="content">
                <br></br>
                <div className="app-title"> 
                           <h1> Company List</h1>  
                    </div>

               
                    <div style={{ marginTop: '-5px' }}>
                        <Link to="/Addcompany" className="btn btn-primary float-right">Add New</Link>
                    </div>
                    <br />
                      <br />                      
                <div className="page-content-wrapper ">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card m-b-30">
                          <div className="card-body">
                            <table id="datatable-buttons" className="table table-striped table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                              <thead>
                                <tr>
                                  <th>S.No</th>
                                  <th>Client Name</th>
                                  <th>Company Name</th>
                                  <th>Address</th>                                 
                                  <th>Requirement</th>
                                  <th>No of Candidate</th>
                                  <th>Cost</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {

                                  (
                                    this.state.data.length > 0 ?

                                      this.state.data.map((Company, index) =>

                                        <tr key={Company._id}>
                                          <td>{index + 1}</td>
                                          <td>{Company.client_name}</td>
                                          <td>{Company.company_name}</td>
                                          <td>{Company.address}</td>
                                          <td>{Company.requirement}</td>
                                          <td>{Company.no_of_candidate}</td>
                                          <td><NumberFormat value={Company.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                                          <td>{Company.status}</td>
                                          
                                          <td>
                                            {/* <Link to="/AddCompany"     ><button className="btn btn-primary" onClick={() => this.editProduct(Company) }>Edit</button></Link> */}
                                            <a href="" onClick={() => this.viewcompany(Company)} data-toggle="modal" data-target="#exampleModal1"> <i className="text-info fa fa-eye" /></a>&nbsp;
                                            <a href=""  onClick={() => { this.updateCompany(Company) }} ><i className=" text-dark fa fa-pencil" aria-hidden="true"   /></a>&nbsp;
                                                                        <a   data-toggle="modal" data-target="#exampleModal2"><i className=" text-warning fa fa-envelope" aria-hidden="true" /></a>&nbsp;
                                                                        <a   data-toggle="modal" data-target="#exampleModal3"> <i className="text-success fa fa-comment" /></a>&nbsp;
                                                                        <a href="" onClick={() => this.CompanyCommand(Company) }   data-toggle="modal" data-target="#exampleModal4"><i className=" text-primary fa fa-bell" aria-hidden="true" /></a>&nbsp;
                                                                        <a href="" onClick={() => this.companyStatus(Company) }   data-toggle="modal" data-target="#exampleModalsts" style={{ color: 'yellowgreen' }}> <svg className="bi bi-cursor-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" /></svg></a>&nbsp;
                                                                        <a href="" onClick={() => this.CompanyAdvance(Company) }  data-toggle="modal" data-target="#exampleModal" style={{ color: 'brown' }}> <i className=" fa fa-share" /></a>&nbsp;
                                                                    </td>
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
                      </div> {/* end col */}
                    </div> {/* end row */}
                  </div>{/* container fluid */}
                </div> {/* Page content Wrapper */}
                {/* content */}
              </div></div></main></div>

        <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">View Details</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              {
                
              (
              <div className="modal-body">
                <p> <label> CLIENT NAME :</label>&nbsp; {this.state.DataCompanyss.client_name}</p>
                <p> <label>MOBILE NO : </label> {this.state.DataCompanyss.mobile}</p>
                <p><label>EMAIL : </label> {this.state.DataCompanyss.email}</p>
                <p><label>ADDRESS : </label>  {this.state.DataCompanyss.address}</p>
                <p> <label>COMPANY NAME :</label>  {this.state.DataCompanyss.company_name}</p>
                <p> <label>REQUIREMENTS : </label>   {this.state.DataCompanyss.requirement}</p>
                <p><label>NO OF CANDIDATE : </label>   {this.state.DataCompanyss.no_of_candidate}</p>
                <p><label>Cost : </label>  <NumberFormat value={this.state.DataCompanyss.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> </p>
                <p><label>STATUS : </label>   {this.state.DataCompanyss.status}</p>


                <p><b>Commands :</b></p>
<table  className="table table-striped table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>S.NO</th>
                                                                <th>Date</th>
                                                                <th>Commands</th>                                                               
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                
                                                                (
                                                                this.state.ViewCommandDatas.length >0 ?

                                                                this.state.ViewCommandDatas.map((Command,index)=> 
                                                         
                                                                <tr key={Command._id}>
                                                                    <td>{index+1}</td>
                                                                    <td> <Moment format="DD-MMMM-YYYY ">{Command.Commanddate}</Moment></td>
                                                                    <td>{Command.command}</td>
                                                                   
                                                                </tr>
                                                                ) 
                                                                :
                                                                (
                                                                    <tr><td colSpan="3">No Commands Found</td></tr>
                                                                )
                                                                )}                                                        
                                                        </tbody>
                                                    </table>
                
              </div>
              )
              }

            </div>
          </div>
        </div>
        {/* / pop up on view */}


       {/* Payment */}


       <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Advance</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form  onSubmit={this.companyAdvanceSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Name</label>
                                            <input type="text" className="form-control" name="traineName" id="recipient-name"  defaultValue={this.state.dataAdvance.client_name} disabled />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Date</label>
                                            <input type="date" className="form-control" id="recipient-name" name="advanceDate"  onChange={this.addAdvance} defaultValue />
                                        </div>

                                        {/* <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Upload Photo</label>
                                            <input type="file"   className="form-control" id="recipient-name"   defaultValue="" />
                                        </div> */}

                                        <div className="form-group">
                                            <label htmlFor="message-text" className="col-form-label">Payment</label>
                                            <input type="number" className="form-control" id="message-text" name="advanceAmt" onChange={this.addAdvance} /><br />
                                            <input type="submit" name="submit" defaultValue="Submit" className="form-control btn btn-info" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* /payment */}


        <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Sent Mail</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form action>
                  <label>TO : &nbsp;</label><input type="text" defaultValue name="mail" id="mail" className="form-control form-control-lg" placeholder="ramkumar@macbrotech.com" disabled />
                  <br /><br />
                  <label>MESSAGE :</label>
                  <textarea className="form-control form-control-lg" rows={3} defaultValue={""} /><br />
                  <input type="submit" defaultValue className="form-control form-control-lg btn btn-info" />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="exampleModal3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">MESSAGE </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form action>
                  <label>TO : &nbsp;</label><input type="text" defaultValue name="mail" id="mail" className="form-control form-control-lg" placeholder={7904303267} disabled />
                  <br /><br />
                  <label>MESSAGE :</label>
                  <textarea className="form-control form-control-lg" rows={3} defaultValue={""} /><br />
                  <input type="submit" className="form-control form-control-lg btn btn-info" defaultValue="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>

          {/* status */}

          <div className="modal fade" id="exampleModalsts" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">STATUS </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.companyStatusSubmit}  > 
                                        <label>TYPE : &nbsp;</label>
                                        <select name="status" className="form-control form-control-lg"  onChange={this.addStatus}>
                                            <option>Select Type</option>
                                            <option>ACTIVE</option>
                                            <option>DEACTIVE</option>
                                            <option>HOLD</option>
                                            <option>FOLLOWUP</option>
                                            <option>INPROGRESS</option>
                                        </select><br />
                                        <input type="submit" className="form-control form-control-lg btn btn-info" defaultValue="Submit" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Status */}

                     {/* command */}

                     <div className="modal fade" id="exampleModal4" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">COMMAND</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.companyCommandSubmit}   >
                                        <label>DATE : &nbsp;</label><input type="date" name="Commanddate" id="mail" className="form-control form-control-lg"  onChange={this.addCommand} />
                                        <br /><br />
                                        <label>COMMAND :</label>
                                        <textarea className="form-control form-control-lg" rows={3} defaultValue={""}  name="command"  onChange={this.addCommand}/><br />
                                        <input type="submit" className="form-control form-control-lg btn btn-info" defaultValue="Submit" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* command */}

        <Footer />
      </div>

    )
  }
}
export default Company;