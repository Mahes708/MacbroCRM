import React, { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Moment from 'react-moment';



class Target_list extends Component {

    constructor()
    {
        super(); 
        this.state ={ 
            data :[],
            datas :[],
            dataCommand : [],
            command:"",
            Commanddate : "",
            ViewCommandDatas :[],
            editData : [],
            loggedIn : false 
        }
    }
    
    
    componentDidMount(){
        this.getAll();
     }
     getAll()
     {
         axios.get("http://localhost:4000/Target").then(res => {
            // console.log(res.data);
             this.setState({
                 data :res.data
             })
         })
     }
    
    viewTarget = data =>{
       
        axios.get(`http://localhost:4000/Target/${data._id}`).then(res => { 
             //console.log(res.data)
             this.setState({
                 datas :res.data

                })
         })
          //view Command
        axios.get(`http://localhost:4000/TargetCommand/TargetID/${data._id}`).then(res => { 
         this.setState({
             ViewCommandDatas :res.data
            })            
     })
         this.getAll();  
    }

//Commend Coding
TargetCommand = data =>{
    axios.get(`http://localhost:4000/Target/${data._id}`).then(res => {
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
TargetCommandSubmit = event =>
{
        event.preventDefault();
        let data = 
            {               
                command : this.state.command,
                Commanddate : this.state.Commanddate,
                TargetID : this.state.dataCommand._id               
            } 
           // console.log(data)   
            axios.post("http://localhost:4000/TargetCommand",data).then(res => {
                this.setState({                    
                    loggedIn : true                    
                   })    
                    this.getAll();
                })              
}

updateTarget = data =>{       
    axios.get(`http://localhost:4000/Target/${data._id}`).then(res => {  
         this.setState({
            editData :res.data,
             isEdit : true 
            }) 
            window.location.href=`/Target_add/?id=${this.state.editData._id}` 
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

                           <h1> Target List</h1>
                        </div>
                    </div>
                            <div style={{ marginTop: '-5px' }}>

                                <Link to="/Target_add" className="btn btn-primary float-right">Add New</Link>
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
                                                                <th>User Id</th>
                                                                <th>User Name</th>
                                                                <th>From Date</th>
                                                                <th>To Date</th>
                                                                <th>Target</th>
                                                                <th>Action</th>
                                                               
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                       
                                                            { 
                                                             (
                                                                    this.state.data.length > 0 ?

                                                                        this.state.data.map((Target, index) =>

                                                                            <tr key={Target._id}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{Target.User_id}</td>
                                                                                <td>{Target.UserName}</td>
                                                                                <td><Moment format="DD-MMMM-YYYY ">{Target.From_date}</Moment></td>
                                                                                <td><Moment format="DD-MMMM-YYYY ">{Target.To_date}</Moment></td>
                                                                                <td>{Target.Target}</td>

                                                                                <td>
                                                                                    <a href data-toggle="modal"  onClick={() => this.viewTarget(Target) } data-target="#exampleModal1"> <i className="text-info fa fa-eye" /></a>&nbsp;
                                                                                    <a href="" onClick={() => { this.updateTarget(Target) }}><i className=" text-dark fa fa-pencil" aria-hidden="true" /></a>&nbsp;
                                                                                    <a href="" onClick={() => this.TargetCommand(Target) }   data-toggle="modal" data-target="#exampleModal4"><i className=" text-primary fa fa-bell" aria-hidden="true" /></a>&nbsp;
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                        :
                                                                        (
                                                                            <tr> <td colSpan={7}> No Data Found</td> </tr>
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
                                    <p> <label>User Id  : </label>&nbsp; {this.state.datas.User_id}</p>
                                    <p> <label>User Name  : </label>&nbsp; {this.state.datas.UserName}</p>
                                    <p><label>From Date   : </label>&nbsp;<Moment format="DD-MMMM-YYYY ">{this.state.datas.From_date}</Moment></p>
                                    <p><label>To Date : </label>&nbsp;<Moment format="DD-MMMM-YYYY ">{this.state.datas.To_date}</Moment>  </p>
                                    <p> <label>Target  : </label>&nbsp;{this.state.datas.Target}</p>                               
                               
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
                                            )
                                            }                                                        
                                    </tbody>
                                </table>
                                </div> 
                                  ) 
                                }
                                 
                               
                            </div>
                        </div>
                        
                    </div>
                    {/* / pop up on view */}

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
                                    <form onSubmit={this.TargetCommandSubmit}   >
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
export default Target_list;