import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Addproject from './Addproject';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

class Project extends Component {

    constructor()
    {
        super(); 
        this.state ={ 
            data :[],
            datas: [],
            ProjectData: [],
            editData : [] ,
            datastatus : [],
            statusType :"",
            projectID :"",
            dataCommand : [],
            command:"",
            Commanddate : "",
            ViewCommandDatas :[],
            dataAdvance : [],
            advanceDate :"",
            advanceAmt : ""
        }

    }

    componentDidMount(){
        this.getAll();
     }

     getAll()
     {
         axios.get("http://localhost:4000/Project").then(res => {
            // console.log(res.data);
             this.setState({
                 data :res.data
             })
         })
     }


     editProduct = data =>{
        //console.log("testting"+data)
       
       this.setState({
           editData :data 
         
       })
       //console.log( this.state.data)
       if(this.state._id!=null)
       {
           this.setState ({
               isEdit : true,
               _id :this.state._id,
               isEdit :this.state.isEdit,
               client_name : this.state.client_name,
               mobile : this.state.mobile,
               email : this.state.email,
               company_name : this.state.company_name,
               project_type : this.state.project_type,
               cost : this.state.cost,
               address : this.state.address,          
               status : this.state.status          
           })
       }
      
    }
// view
     
    ProjectView = data =>{  
         
    axios.get(`http://localhost:4000/Project/${data._id}`).then(res => {   
           console.log(res.data);     
         this.setState({
            ProjectData :res.data
            })            
     })
      //view Command
      axios.get(`http://localhost:4000/ProjectCommand/projectID/${data._id}`).then(res => {  
        // console.log(res.data)             
         this.setState({
             ViewCommandDatas :res.data
            })            
     })

    //  this.getAll();  
}


// Status Coding

TraineStatus = data =>{
    axios.get(`http://localhost:4000/Project/${data._id}`).then(res => {
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

trainingStatusSubmit = event =>
{
        event.preventDefault();
        let data = 
            {               
                status : this.state.status,
                projectID : this.state.datastatus._id               
            } 
            console.log(data)   
            axios.put("http://localhost:4000/Project/update",data).then(res => {
                    this.getAll();
                })              
}


//Commend Coding


ProjectCommand = data =>{
    axios.get(`http://localhost:4000/Project/${data._id}`).then(res => {
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

ProjectCommandSubmit = event =>
{
        event.preventDefault();
        let data = 
            {               
                command : this.state.command,
                Commanddate : this.state.Commanddate,
                projectID : this.state.dataCommand._id               
            } 
           // console.log(data)   
            axios.post("http://localhost:4000/ProjectCommand",data).then(res => {
                    this.getAll();
                })              
}



// Convert (Advance Pay)

ProjectAdvance = data =>{
    axios.get(`http://localhost:4000/Project/${data._id}`).then(res => {
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
ProjectAdvanceSubmit = event =>
{
        event.preventDefault();
        console.log(this.state.dataAdvance)
        let data = 
            {               
                client_name : this.state.dataAdvance.client_name,
                advanceDate : this.state.advanceDate,
                advanceAmt : this.state.advanceAmt,
                projectID : this.state.dataAdvance._id,
                project_type : this.state.dataAdvance.project_type,
                cost   : this.state.dataAdvance.cost,            
            } 
           //console.log(data)   
            axios.post("http://localhost:4000/ProjectAdvance",data).then(res => {
                    this.getAll();
                })              
}
updateProject = data =>{       
    axios.get(`http://localhost:4000/Project/${data._id}`).then(res => {  
         this.setState({
            editData :res.data,
             isEdit : true 
            }) 
            window.location.href=`/AddProject/?id=${this.state.editData._id}` 
     }) 
}


// TraineStatus = data =>{  

//     let statusdata = {
//         status :this.state.status 
//     }   
//     axios.put(`http://localhost:4000/Project/${data._id}`).then(res => {          
//          this.setState({
//              datas :res.statusdata
//             })            
//      })
//      this.getAll();  
// }
    render() {
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Sidebar />
                    <div className="content-page">
                        <div className="content">
                            <br />
                            <div className="app-title"> 
                           <h1> Project List</h1>  
                    </div>
                            <div>
                                <div style={{ marginTop: '-5px' }}>
                                    <Link to="/Addproject" className="btn btn-primary float-right">Add New</Link>
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
                                                                    <th>Mobile</th>
                                                                    <th>Email</th>
                                                                    <th>Company Name</th>
                                                                    <th>Type of Project</th>
                                                                    <th>Cost</th>
                                                                    {/* <th>Address</th> */}
                                                                    <th>Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                
                                                                (
                                                                this.state.data.length >0 ?

                                                                this.state.data.map((Project,index)=> 
                                                         
                                                                <tr key={Project._id}>
                                                                    <td>{index+1}</td>
                                                                    <td>{Project.client_name}</td>
                                                                    <td>{Project.mobile}</td>
                                                                    <td>{Project.email}</td>
                                                                    <td>{Project.company_name}</td>
                                                                    <td>{Project.project_type}</td>
                                                                    <td><NumberFormat value={Project.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                                                                    {/* <td>{Project.address}</td> */}
                                                                    <td>{Project.status}</td>
                                                                    <td>
                                                                    {/* <Link to="/AddProject"     ><button className="btn btn-primary" onClick={() => this.editProduct(Project) }>Edit</button></Link> */}
                                                                        <a href=""  onClick={() => this.ProjectView(Project) }   data-toggle="modal" data-target="#exampleModal1"> <i className="text-info fa fa-eye" /></a>&nbsp; 
                                                                        <a href=""  onClick={() => { this.updateProject(Project) }} ><i className=" text-dark fa fa-pencil" aria-hidden="true"   /></a>&nbsp;
                                                                        <a   data-toggle="modal" data-target="#exampleModal2"><i className=" text-warning fa fa-envelope" aria-hidden="true" /></a>&nbsp;
                                                                        <a   data-toggle="modal" data-target="#exampleModal3"> <i className="text-success fa fa-comment" /></a>&nbsp;
                                                                        <a href="" onClick={() => this.ProjectCommand(Project) }   data-toggle="modal" data-target="#exampleModal4"><i className=" text-primary fa fa-bell" aria-hidden="true" /></a>&nbsp;
                                                                        <a href="" onClick={() => this.TraineStatus(Project) }   data-toggle="modal" data-target="#exampleModalsts" style={{ color: 'yellowgreen' }}> <svg className="bi bi-cursor-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" /></svg></a>&nbsp;
                                                                        <a href="" onClick={() => this.ProjectAdvance(Project) }  data-toggle="modal" data-target="#exampleModal" style={{ color: 'brown' }}> <i className=" fa fa-share" /></a>&nbsp;
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
                                {/* content */}</div>
                        </div></div>

                    <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document" style={{maxWidth:"620px"}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">View Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>

                                {
                                (
                                <div class="modal-body">
            <p> <label>CLIENT NAME :</label> {this.state.ProjectData.client_name}</p>
         <p> <label>MOBILE NO : </label> {this.state.ProjectData.mobile}</p>
         <p><label>EMAIL : </label>{this.state.ProjectData.email}</p>
         <p><label>COMPANY NAME  : </label>{this.state.ProjectData.company_name}</p>
         <p><label>TYPE OF PROJECT  : </label>{this.state.ProjectData.project_type}</p>
         <p> <label>COST : </label><NumberFormat value={this.state.ProjectData.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> </p>
         <p> <label>ADDRESS : </label>{this.state.ProjectData.address}</p>
         <p> <label>STATUS : </label>{this.state.ProjectData.status}</p>

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
                                    <form  onSubmit={this.ProjectAdvanceSubmit}>
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
                                    <form onSubmit={this.trainingStatusSubmit}  > 
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
                                    <form onSubmit={this.ProjectCommandSubmit}   >
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
                </div></div>
        )
    }
}
export default Project;