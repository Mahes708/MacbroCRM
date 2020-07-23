import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
var  total = 0; 
var  totals = 0;  
 

class PaymentTraining extends Component {
    
  constructor()
  {
      super(); 
      this.state ={ 
          
          dataAdvance :[],
          dataPayment:[],
          PaymentAmt:"",
          PaymentDate:"",
          dataView:[],
          dataViewMain : "" 
               
      }
  }
  componentDidMount(){
    this.getAll();
   }
  getAll()
  {
     axios.get("http://localhost:4000/TraineAdvance").then(res => {        
         this.setState({
             dataAdvance :res.data
         })
     })
  }
 
//Add Payment List
PaymentAdd = data =>{
  axios.get(`http://localhost:4000/TraineAdvance/${data._id}`).then(res => {
       this.setState({
           dataPayment :res.data
          }) 
                     
   })    
}

//Onchange
addPayment = event => {      
  const {name,value}=event.target;
  this.setState({
      [name] : value
  })
} 

//Add Payment
PaymentSubmit = event =>
{
      event.preventDefault();
      let data = 
          {               
              PaymentDate : this.state.PaymentDate,
              PaymentAmt : this.state.PaymentAmt,
              traineID : this.state.dataPayment.traineID,
              traineName : this.state.dataPayment.traineName               
          } 
         // console.log(data)
          axios.put("http://localhost:4000/TraineAdvance/update",data).then(res => {  })
          axios.post("http://localhost:4000/Payment", data).then(res => { })
 this.getAll();
}

//Payment View
PaymentView = data =>
{
  // console.log(data)
  axios.get(`http://localhost:4000/Payment/traineID/${data.traineID}`).then(res => {    
     this.setState({
         dataView :res.data
     })  
 })
 axios.get(`http://localhost:4000/TraineAdvance/${data._id}`).then(res => {    
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
                    <h1> Training Payment</h1>  
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
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Original Amount</th>
                    <th>Paid Amount</th>
                    <th>Balance Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                
                  { 
                  (  
                  this.state.dataAdvance.length >0 ?
                  this.state.dataAdvance.map((Payments,index)=>  

                  <tr key={Payments._id}>                   
                      <td>{index+1}</td>
                      <td></td>
                      <td>{Payments.traineName}</td>

                      <td>{Payments.course_offered}</td>
                      <td><NumberFormat value={Payments.fees_offered } displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                      <td>
                         
                       
                       {   total=0,

                        Payments.payment.map(part =>
                          { 
                            total  += part.PaymentAmt;  
                          }
                        )} 
                       
                       <NumberFormat value= {total +Payments.advanceAmt }  displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> 
                     </td>
                      <td> <NumberFormat value= {Payments.fees_offered - (total +Payments.advanceAmt) }  thousandsGroupStyle="lakh" displayType={'text'} thousandSeparator={true} prefix={'₹'} /></td>
                      <td>
                          <a href="#" onClick={() => this.PaymentAdd(Payments) }  data-toggle="modal" data-target="#exampleModal"> <i className="text-success fa fa-plus" /></a>&nbsp;
                          <a href="#" onClick={() => this.PaymentView(Payments) }  data-toggle="modal" data-target="#exampleModal1"> <i className="text-primary fa fa-eye" /></a>&nbsp;&nbsp;
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
        <form  onSubmit={this.PaymentSubmit}>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Name</label>
            <input type="text" className="form-control" name="TraineName" onChange={this.addPayment} id="recipient-name" defaultValue={this.state.dataPayment.traineName} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Date</label>
            <input type="date" name="PaymentDate"  className="form-control" onChange={this.addPayment} id="recipient-name" defaultValue />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Upload Photo</label>
            <input type="file" value="" name="" className="form-control" id="recipient-name" defaultValue />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Original Amount</label>
            <input type="text" className="form-control" name="Amount"   id="recipient-name" defaultValue={this.state.dataPayment.fees_offered} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Payment</label>
            <input type="number" name="PaymentAmt" className="form-control"  onChange={this.addPayment}id="message-text" /><br />
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
        
          <p><label>NAME : </label>&nbsp;{this.state.dataViewMain.traineName}</p>
          <p><label>Course :</label> &nbsp;{this.state.dataViewMain.course_offered}</p> 
         
            
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
            <p><strong>Original Amount :</strong>&nbsp;<NumberFormat value={this.state.dataViewMain.fees_offered} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> </p>
            <p><strong>Advance Amount :</strong>&nbsp;<NumberFormat value= {this.state.dataViewMain.advanceAmt}displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> </p>
            <p><strong>Paid Amount :</strong>&nbsp;<NumberFormat value= {totals }displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /> </p>
            <p><strong>Balance Amount :</strong> &nbsp;<NumberFormat value={this.state.dataViewMain.fees_offered - (this.state.dataViewMain.advanceAmt +totals)} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></p>
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

export default PaymentTraining;
