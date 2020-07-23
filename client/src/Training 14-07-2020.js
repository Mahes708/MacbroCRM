import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Addtraining from './Addtraining';
import axios from 'axios';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
 

 
class Training extends Component {
      
    constructor()
    {
        super(); 
        this.state ={ 
            data :[],
            datas :[],
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
    
    
    componentDidMount(){
        this.getAll();
     }
     getAll()
     {
         axios.get("http://localhost:4000/Training").then(res => {
            // console.log(res.data);
             this.setState({
                 data :res.data
             })
         })
     }
    
//View
 
viewTraine = data =>{       
    axios.get(`http://localhost:4000/Training/${data._id}`).then(res => {               
         this.setState({
             datas :res.data
            })            
     })
     //view Command
     axios.get(`http://localhost:4000/TraineCommand/traineID/${data._id}`).then(res => {  
        // console.log(res.data)             
         this.setState({
             ViewCommandDatas :res.data
            })            
     })
}

 

// Status Coding

TraineStatus = data =>{
    axios.get(`http://localhost:4000/Training/${data._id}`).then(res => {
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
                traineID : this.state.datastatus._id               
            } 
            console.log(data)   
            axios.put("http://localhost:4000/Training/update",data).then(res => {
                    this.getAll();
                })              
}

//Commend Coding


TraineCommand = data =>{
    axios.get(`http://localhost:4000/Training/${data._id}`).then(res => {
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
trainingCommandSubmit = event =>
{
        event.preventDefault();
        let data = 
            {               
                command : this.state.command,
                Commanddate : this.state.Commanddate,
                traineID : this.state.dataCommand._id               
            } 
           // console.log(data)   
            axios.post("http://localhost:4000/TraineCommand",data).then(res => {
                    this.getAll();
                })              
}

// Convert (Advance Pay)

TraineAdvance = data =>{
    axios.get(`http://localhost:4000/Training/${data._id}`).then(res => {
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
trainingAdvanceSubmit = event =>
{
        event.preventDefault();
        let data = 
            {               
                traineName : this.state.dataAdvance.name,
                advanceDate : this.state.advanceDate,
                advanceAmt : this.state.advanceAmt,
                traineID : this.state.dataAdvance._id,
                course_offered : this.state.dataAdvance.course_offered,
                fees_offered   : this.state.dataAdvance.fees_offered,            
            } 
           // console.log(data)   
            axios.post("http://localhost:4000/TraineAdvance",data).then(res => {
                    this.getAll();
                })              
}


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
                        <div>

                           <h1> Training List</h1>
                        </div>
                    </div>
                            <div style={{ marginTop: '-5px' }}>
                                 
                                <Link to="/Addtraining"   className="btn btn-primary float-right">Add New</Link>
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
                                                                <th>S.NO</th>
                                                                <th>Name</th>
                                                                <th>Mobile</th>
                                                                <th>Email</th>
                                                                <th> Course</th>
                                                                <th>Fees</th>
                                                                <th> Status</th>
                                                                
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                
                                                                (
                                                                this.state.data.length >0 ?

                                                                this.state.data.map((Training,index)=> 
                                                         
                                                                <tr key={Training._id}>
                                                                    <td>{index+1}</td>
                                                                    <td>{Training.name}</td>
                                                                    <td>{Training.mobile}</td>
                                                                    <td>{Training.email}</td>
                                                                    <td>{Training.course_offered}</td>
                                                                    <td><NumberFormat value={Training.fees_offered} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                                                                    <td>{Training.status}</td>
                                                                    <td>
                                                                    {/* <Link to="/Addtraining" editData="hii"   ><button className="btn btn-primary"  onClick={event => this.update(Training._id)} onClick={() => this.editProduct(Training) } >Edit</button></Link> */}
                                                                        <a href=""  onClick={() => this.viewTraine(Training) }   data-toggle="modal" data-target="#exampleModal1"> <i className="text-info fa fa-eye" /></a>&nbsp;
                                                                        <Link to="/Addtraining" ><i className=" text-dark fa fa-pencil" aria-hidden="true"  /></Link>&nbsp;
                                                                        <a   data-toggle="modal" data-target="#exampleModal2"><i className=" text-warning fa fa-envelope" aria-hidden="true" /></a>&nbsp;
                                                                        <a   data-toggle="modal" data-target="#exampleModal3"> <i className="text-success fa fa-comment" /></a>&nbsp;
                                                                        <a href="" onClick={() => this.TraineCommand(Training) }   data-toggle="modal" data-target="#exampleModal4"><i className=" text-primary fa fa-bell" aria-hidden="true" /></a>&nbsp;
                                                                        <a href="" onClick={() => this.TraineStatus(Training) }   data-toggle="modal" data-target="#exampleModalsts" style={{ color: 'yellowgreen' }}> <svg className="bi bi-cursor-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" /></svg></a>&nbsp;
                                                                        <a href="" onClick={() => this.TraineAdvance(Training) }  data-toggle="modal" data-target="#exampleModal" style={{ color: 'brown' }}> <i className=" fa fa-share" /></a>&nbsp;
                                                                    </td>
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
                          
                        </div></div>

                    <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document" style={{maxWidth:"700px"}}>
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
                                    <p> <label>NAME :</label>&nbsp; {this.state.datas.name}</p>
                                    <p> <label>MOBILE NO : </label> &nbsp; {this.state.datas.mobile}</p>
                                    <p><label>EMAIL : </label> &nbsp; {this.state.datas.email}</p>
                                    <p><label>DATE OF BIRTH : </label>&nbsp; <Moment format="DD-MMMM-YYYY ">{this.state.datas.dob}</Moment> </p>
                                    <p> <label>COLLEGE NAME :</label>&nbsp; {this.state.datas.college}</p>
                                    <p> <label>STUDENT/GRADUATE : </label>&nbsp; {this.state.datas.Student_Graduate}</p>
                                    <p><label>YEAR OF PASSING  : </label> &nbsp; {this.state.datas.passing}</p>
                                    <p> <label>EXPERIANCE : </label>&nbsp; {this.state.datas.experience}</p>
                                    <p> <label>COURSE OFFERED : </label>&nbsp; {this.state.datas.course_offered}</p>
                                    <p><label>FEES OFFERED : </label>&nbsp; <NumberFormat value={this.state.datas.fees_offered} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></p>
                                    <p> <label>STATUS : </label>&nbsp; {this.state.datas.status}</p>
                                    <p><label>ADDRESS : </label>&nbsp; {this.state.datas.address}</p>
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
                                    <form  onSubmit={this.trainingAdvanceSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Name</label>
                                            <input type="text" className="form-control" name="traineName" id="recipient-name"  defaultValue={this.state.dataAdvance.name} disabled />
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
                                    <form >
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
                                    <form  >
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
                                    <form onSubmit={this.trainingCommandSubmit}   >
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
                    


                    <Footer />
                </div></div>

        )
    }
}
export default Training;