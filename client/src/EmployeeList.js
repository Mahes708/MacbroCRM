import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Employee from './Employee';
import axios from 'axios'; 
import img from './images/download.jpg';
import Moment from 'react-moment';


class EmployeeList extends Component {
    constructor()
    {
        super()
        
        this.state ={ 
            employeeData :[],
            datas :[],             
             editData : [],
            isEdit: false,
            message : ""
        }

    }
    
    
    componentDidMount(){
     
        this.getAll();
     }
     getAll()
     { 
         axios.get("http://localhost:4000/Employee").then(res => {
             this.setState({
                employeeData :res.data,
             })
         })
     }
     del = data =>
    {
        var option = window.confirm(`Are you sure Want to Delete ${data.Employee_name}`)
        if(option)
        {
            axios.delete(`http://localhost:4000/Employee/del/${data._id}`).then(res => {
                this.setState({
                    message :"Deleted Successfully"
                 })
               })
        }
    }
    viewEmployee = data =>{       
        axios.get(`http://localhost:4000/Employee/${data._id}`).then(res => { 
             
             this.setState({
                 datas :res.data 
                }) 
         })
         this.getAll();  
    }
    updateEmployee = data =>{       
        axios.get(`http://localhost:4000/Employee/${data._id}`).then(res => { 
             
             this.setState({
                editData :res.data,
                 isEdit : true 
                }) 
                window.location.href=`/Employee/?id=${data._id}` 
         }) 
    }
   
       
    render() {
 
        return (
            
            <div id="wrapper">
                 <Sidebar />
                    <div className="content-page">
                        <div className="content">
                            <Header   />  
               
                <br></br>
                 
                    <div className="app-title">
                        <div>

                           <h1> Employee List</h1>
                        </div>
                    </div>
                 <div style={{marginTop: '-5px'}} >
                        <Link to="/Employee"  className="btn btn-primary float-right">Add New</Link>
                      </div>
                      <br></br>
                      <br></br>
                      {this.state.message ? <h3 style={{color:"red", marginLeft:"500px"}}>{this.state.message}</h3> : null}  
                <div className="page-content-wrapper ">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-30">
                                    <div className="card-body">

                                        <table id="datatable-buttons"
                                            className="table table-striped table-bordered dt-responsive nowrap"
                                            style={{borderCollapse:"collapse", borderSpacing: "0", width:"100%"}}>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Photo</th>
                                                    <th>ID</th> 
                                                    <th>Name</th> 
                                                    <th>Mobile</th>  
                                                    <th>Email</th> 
                                                    <th>DOJ</th> 
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                             <tbody> 
                                                 
                                            {      
                                                                                                    
                                            (
                                            this.state.employeeData.length >0 ?

                                            this.state.employeeData.map((Employee,index)=>
                                                <tr key={Employee._id}>
                                                    <td>{index+1}</td>
                                                    <td>{!Employee.photo ? <img src={process.env.PUBLIC_URL +`/assets/images/download.jpg`} width="50px" height="50px" style={{ borderRadius:'30px' }} />:<img src={process.env.PUBLIC_URL + `/uploads/Employee/${Employee.photo}`} width="50px" height="50px" style={{ borderRadius:'30px' }} />}</td>
                                                    <td>{Employee.Employee_code}</td>
                                                    <td>{Employee.Employee_name}</td>
                                                    <td>{Employee.mobile}</td>                                                   
                                                    <td>{Employee.email }</td> 
                                                    <td><Moment format="DD-MMMM-YYYY ">{Employee.doj}</Moment></td>
                                                    <td>
                                                        <a href="" onClick={() => this.viewEmployee(Employee) } data-toggle="modal" data-target="#exampleModal1"> <i className="text-primary fa fa-eye"></i></a>
                                                        <a href=""  ><i className=" text-dark fa fa-pencil" aria-hidden="true"  onClick={() => this.updateEmployee(Employee) } /></a>  
                                                        <a href=""> <i className="fa fa-times text-danger" onClick={event => {this.del(Employee)}}></i></a>
                                                    </td>
                                                </tr>
                                                ) 
                                                :
                                                (
                                                    <tr><td colSpan={8}> No Data Found</td></tr>
                                                )
                                                )}  

                                            </tbody>
                                        </table>


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
                                 <p>{!this.state.datas.photo ? <img src={process.env.PUBLIC_URL +`/assets/images/download.jpg`} width="50px" height="50px" style={{ borderRadius:'30px' }} />:<img src={process.env.PUBLIC_URL + `/uploads/Employee/${this.state.datas.photo}`} width="50px" height="50px" style={{ borderRadius:'30px' }} />}</p>
                           {/* <p> <img src={process.env.PUBLIC_URL + `/uploads/Employee/${this.state.datas.photo}`} width="70px" height="70px" style={{ borderRadius:'30px' }} /></p> */}
                                 
                                  <p> <label>ID  : </label>&nbsp; {this.state.datas.Employee_code}</p> 
                                    <p> <label>Name  : </label>&nbsp; {this.state.datas.Employee_name}</p>
                                    <p> <label>Mobile No  : </label>&nbsp; {this.state.datas.mobile}</p>
                                    <p><label>Email ID   : </label>&nbsp;{this.state.datas.email}</p>
                                <p><label>Date of Birth  : </label>&nbsp;<Moment format="DD-MMMM-YYYY ">{this.state.datas.dob}</Moment>  </p>
                                    <p> <label>Department  : </label>&nbsp;{this.state.datas.department}</p>
                                    <p> <label>Experience  : </label>&nbsp;{this.state.datas.experience}</p> 
                                    <p><label>Date of Joining  : </label>&nbsp; <Moment format="DD-MMMM-YYYY ">{this.state.datas.doj}</Moment></p>
                                    <p> <label>Location  : </label>&nbsp;{this.state.datas.address}</p>
                                </div> 
                                
                                  ) 
                                  }
                                 
                               
                            </div>
                        </div>
                    </div>

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



                 
        )
    }
}


export default EmployeeList;