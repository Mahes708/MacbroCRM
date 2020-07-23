import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

class Course extends Component {

    constructor()
    {
        super(); 
        this.state ={ 
            data :[],
            datas :[],
            editData : [] 
        }

    }
    
    
    componentDidMount(){
        this.getAll();
     }
     getAll()
     {
         axios.get("http://localhost:4000/Course").then(res => {
            // console.log(res.data);
             this.setState({
                 data :res.data
             })
         })
     }
     del = data =>
    {
        var option = window.confirm(`Are you sure Want to Delete ${data.course_name}`)
        if(option)
        {
            axios.delete(`http://localhost:4000/Course/del/${data._id}`).then(res => { 
               // console.log(res);
                this.getAll();  
              })
        }
    }

    viewCourse = data =>{
       
        axios.get(`http://localhost:4000/Course/${data._id}`).then(res => { 
             console.log(res.data)
             this.setState({
                 datas :res.data

                })
                
         })
         this.getAll();  
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
                            <br />
                            <div style={{ marginTop: '-5px' }}>

                                <Link to="/Course_add" className="btn btn-primary float-right">Add New</Link>
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
                                                                <th>Course Name</th>
                                                                <th>Department</th>
                                                                <th>Courses on</th>
                                                                <th>Training Fees</th>
                                                                <th>Duration</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                       
                                                            { 
                                                             (
                                                                    this.state.data.length > 0 ?

                                                                        this.state.data.map((Course, index) =>

                                                                            <tr key={Course._id}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{Course.course_name}</td>
                                                                                <td>{Course.department}</td>

                                                                                <td>{Course.courses}</td>
                                                                                <td>{Course.training_fee}</td>
                                                                                <td>{Course.duration}</td>

                                                                                <td>
                                                                                    <a href data-toggle="modal"  onClick={() => this.viewCourse(Course) } data-target="#exampleModal1"> <i className="text-info fa fa-eye" /></a>&nbsp;
                                                                        <Link to="/Course_add" onClick={event => { this.state.update(Course) }}><i className=" text-dark fa fa-pencil" aria-hidden="true" /></Link>&nbsp;
                                                                        <a href=""> <i className="fa fa-times text-danger" onClick={event => {this.del(Course)}}></i></a>
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
                                    <p> <label>Course Name  : </label>&nbsp; {this.state.datas.course_name}</p>
                                    <p> <label>Department  : </label>&nbsp; {this.state.datas.department}</p>
                                    <p> <label>Aggrement : </label>&nbsp;{this.state.datas.aggrement}</p>
                                    <p><label>Course   : </label>&nbsp;{this.state.datas.courses}</p>
                                <p><label>Training Fees  : </label>&nbsp;{this.state.datas.training_fee}  </p>
                                    <p> <label>Duration  : </label>&nbsp;{this.state.datas.duration}</p>
                                    <p> <label>Certification  : </label>&nbsp;{this.state.datas.certification}</p>
                                    <p> <label>Upgrade  : </label>&nbsp;{this.state.datas.upgrade}</p>
                                    <p> <label>Up skill  : </label>&nbsp;{this.state.datas.up_skill}</p>
                                    <p> <label>Fee pay  : </label>&nbsp;{this.state.datas.fee_pay}</p>



                               
                                </div> 
                                
                                  ) 
                            }
                                 
                               
                            </div>
                        </div>
                        
                    </div>
                    {/* / pop up on view */}

                    <Footer />
                </div></div>

        )
    }
}
export default Course;