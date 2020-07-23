import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
var  total = 0; 
var  totals = 0;  
 

class PaymentProject extends Component {
    
  constructor()
  {
      super(); 
      this.state ={ 
          dataProjectAdvancelist :[],
          PaymentValue:[],
          PaymentAmt:"",
          PaymentDate:"",          
          dataView:[],
          dataViewMain : [] 
               
      }
  }
  componentDidMount(){
    this.getAll();
   }
  getAll()
  {
     axios.get("http://localhost:4000/ProjectAdvance").then(res => {        
         this.setState({
          dataProjectAdvancelist :res.data
         })
     })
  }
   
//Add Payment List

ProjectPaymentAdd = data =>{
  axios.get(`http://localhost:4000/ProjectAdvance/${data._id}`).then(res => {
       this.setState({
        PaymentValue :res.data
          }) 
                     
   })    
}

//Payment onChange

addProjectPayment = event => {
      
  const {name,value}=event.target;
  this.setState({
      [name] : value
  })
   
} 

//Payment Submit

ProjectPaymentSubmit = event =>
{
      event.preventDefault();
      let data = 
          {               
              PaymentDate : this.state.PaymentDate,
              PaymentAmt : this.state.PaymentAmt,
              projectID : this.state.PaymentValue.projectID,
              client_name : this.state.PaymentValue.client_name               
          } 
          // console.log(this.state.PaymentValue)
          axios.put("http://localhost:4000/ProjectAdvance/update",data).then(res => {  })
          axios.post("http://localhost:4000/PaymentProject", data).then(res => { })
          this.getAll();
}

//Payment View
PaymentView = data =>
{
   
  axios.get(`http://localhost:4000/PaymentProject/projectID/${data.projectID}`).then(res => {     
     this.setState({
         dataView :res.data
     })  
 })
 axios.get(`http://localhost:4000/ProjectAdvance/${data._id}`).then(res => { 
  this.setState({
      dataViewMain :res.data
  })  
})

}


    render() {
        return (
            <div>
                 <div id="wrapper">
                 <Sidebar />
                 <div className="content-page">
                 <Header />  
                 <div className="content">
                 <br /> 
  <div className="app-title"> 
                           <h1> Project Payment</h1>  
                    </div><br />
  <div className="page-content-wrapper ">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card m-b-30">
            <div className="card-body">
              <table id="datatable-buttons" className="table table-striped table-bordered dt-responsive nowrap" style={{borderCollapse: 'collapse', borderSpacing: 0, width: '100%'}}>
                <thead>
                  <tr>
                    <th>S.NO</th>
                    <th>Client Name</th> 
                    <th>Project Name </th>
                    <th>Original Amount</th>
                    <th>Paid Amount</th>
                    <th>Balance Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                
                  { 
                  (  
                  this.state.dataProjectAdvancelist.length >0 ?
                  this.state.dataProjectAdvancelist.map((Project,index)=>  

                  <tr key={Project._id}>                   
                      <td>{index+1}</td>
                      <td>{Project.client_name}</td>
                      <td>{Project.project_type}</td>
                      <td><NumberFormat value={Project.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                      <td>
                         
                       
                       {   total=0,

                          Project.payment.map(part =>
                          { 
                            total  += part.PaymentAmt;  
                          }
                        )} 
                       
                       <NumberFormat value={total + Project.advanceAmt } displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> 
                     </td>
                      <td><NumberFormat value={Project.cost - (total +Project.advanceAmt) } displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td> 
                      <td>
                          <a href="#" onClick={() => this.ProjectPaymentAdd(Project) }  data-toggle="modal" data-target="#exampleModal"> <i className="text-success fa fa-plus" /></a>&nbsp;
                          <a href="#" onClick={() => this.PaymentView(Project) }  data-toggle="modal" data-target="#exampleModal1"> <i className="text-primary fa fa-eye" /></a>&nbsp;&nbsp;
                          <a href="#" data-toggle="modal" data-target="#exampleModalm"><i className=" text-danger fa fa-envelope" aria-hidden="true" /></a>&nbsp;
                          <a href="#" data-toggle="modal" data-target="#exampleModal3"> <i className="text-warning fa fa-comment" /></a>&nbsp;
                          <a href="#" data-toggle="modal" data-target="#exampleModal2"><i className=" text-dark fa fa-pencil" aria-hidden="true" /></a>&nbsp;
                          <a href="#"><i className=" text-info fa fa-print" aria-hidden="true" /></a>
                        </td>
                  </tr>
                  ) 
                  :
                  (
                      <tr><td colSpan="87">No Data Found</td></tr>
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
</div>
</div>
</div>
{/* pop on Convert */}
<div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Payment</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <form  onSubmit={this.ProjectPaymentSubmit}>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Client Name</label>
            <input type="text" className="form-control" name="TraineName"   id="recipient-name" defaultValue={this.state.PaymentValue.client_name} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Date</label>
            <input type="date" name="PaymentDate"  className="form-control" onChange={this.addProjectPayment} id="recipient-name" defaultValue />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Original Amount</label>
            <input type="text" className="form-control" name="amount"   id="recipient-name" defaultValue={this.state.PaymentValue.cost} disabled />
          </div>
          
          <div className="form-group"> 
            <label htmlFor="message-text" className="col-form-label">Payment</label>
            <input type="number" name="PaymentAmt" className="form-control"  onChange={this.addProjectPayment}id="message-text" /><br />
            <input type="submit" name="submit" defaultValue="Submit" className="form-control btn btn-info" />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/* / pop on Convert */}
{/* pop on edit */}
<div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Advance</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <form action="payment.html">
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Name</label>
            <input type="text" className="form-control" id="recipient-name" defaultValue="" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Payment</label>
            <input type="number" className="form-control" id="message-text" defaultValue={10000} /><br />
            <input type="submit" name="submit" defaultValue="Submit" className="form-control btn btn-info" />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/* / pop on edit */}
<div>
    {/* pop up on view */}
<div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">View Details</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        
        <p><label>Client Name : </label>&nbsp;{this.state.dataViewMain.client_name}</p>
        <p><label>Project Type :</label> &nbsp;{this.state.dataViewMain.project_type}</p> 
       
          
      <table  className="table table-striped table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
          <thead>
              <tr>
                  <th>S.NO</th>
                  <th>Date</th>
                  <th>Amount</th>                                                               
              </tr>
          </thead>
          <tbody> 
           { totals=0,
                (  
                  this.state.dataView.length >0 ?
                  this.state.dataView.map((Pay,index)=> 
                 
                    <tr key={Pay._id}>                   
                      <td>{index+1}</td> 
                      <td><Moment format="DD-MMMM-YYYY ">{Pay.PaymentDate}</Moment></td>
                      <td><NumberFormat value={Pay.PaymentAmt} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                       <div style={{display:'none'}}> {totals  +=Pay.PaymentAmt} </div>
                    </tr> 
                ) 
                :
                (
                    <tr><td colSpan="3">No Data Found</td></tr>
                )
                )
                }
                  <tr>
                        <td colSpan="2" style={{textAlign:'Right'}} >Total</td>
                        <td ><NumberFormat value={totals} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                  </tr>
          </tbody>
      </table> 
          <p><strong>Original Amount :</strong>&nbsp;<NumberFormat value={this.state.dataViewMain.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> </p>
          <p><strong>Advance Amount :</strong>&nbsp;<NumberFormat value= {this.state.dataViewMain.advanceAmt}displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> </p>
          <p><strong>Paid Amount :</strong>&nbsp;<NumberFormat value= {totals }displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> </p>
          <p><strong>Balance Amount :</strong> &nbsp;<NumberFormat value={this.state.dataViewMain.cost - (this.state.dataViewMain.advanceAmt +totals)} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></p>
     </div>
    </div>
  </div>
  <Footer />
</div>
{/* / pop up on view */}

{/* pop up on message */}
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
          <label>TO : &nbsp;</label><input type="text" name="mail" id="mail" className="form-control form-control-lg" placeholder={7904303267} disabled />
          <br /><br />
          <label>MESSAGE :</label> 
          <textarea className="form-control form-control-lg" rows={3} defaultValue={""} /><br />
          <input type="submit" className="form-control form-control-lg btn btn-info" defaultValue="Submit" />
        </form>
      </div>
    </div>
  </div>
</div>
{/* / pop up on message */}

{/* pop up on mail */}
<div className="modal fade" id="exampleModalm" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          <label>TO : &nbsp;</label><input type="text" name="mail" id="mail" className="form-control form-control-lg" placeholder="ramkumar@macbrotech.com" disabled />
          <br /><br />
          <label>MESSAGE :</label> 
          <textarea className="form-control form-control-lg" rows={3} defaultValue={""} /><br />
          <input type="submit" className="form-control form-control-lg btn btn-info" defaultValue="Submit" />
        </form>
      </div>
    </div>
  </div>
</div>
{/* / pop up on mail */}


</div> 

  </div>
        );
    }
}

export default PaymentProject;
