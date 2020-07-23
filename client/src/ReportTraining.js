import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Autocomplete from 'react-autocomplete';

 
class ReportTraining extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            FromDate : "",
            ToDate : "",
            name : "",
            email : "",
            TraineName :[],
            suggestions: [],            
            text: ''
        }
    }
    componentDidMount() {
        this.getAll();
        this.getTraineName();
    }
    getAll() {
        axios.get("http://localhost:4000/Training").then(res => {
            // console.log(res.data);
            this.setState({
                data: res.data
            })
        })
    }
 
    Change = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    TrainingReport = event => {
        
        event.preventDefault(); 

        if((this.state.FromDate!='') &&(this.state.ToDate!='')&&(this.state.text!='') &&(this.state.email!=''))  
        {  
            axios.get(`http://localhost:4000/Training/SearchAll/${this.state.FromDate}/${this.state.ToDate}/${this.state.text}/${this.state.email}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate!='') &&(this.state.ToDate!='')&&(this.state.text=='') &&(this.state.email==''))  
        {  
            axios.get(`http://localhost:4000/Training/SearchDate/${this.state.FromDate}/${this.state.ToDate}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate!='') &&(this.state.ToDate!='')&&(this.state.text!=''))  
        {  
            axios.get(`http://localhost:4000/Training/SearchDateName/${this.state.FromDate}/${this.state.ToDate}/${this.state.text}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate!='') &&(this.state.ToDate!='')&&(this.state.email!=''))  
        {  
            axios.get(`http://localhost:4000/Training/SearchDateEmail/${this.state.FromDate}/${this.state.ToDate}/${this.state.email}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate=='') &&(this.state.ToDate=='')&&(this.state.text!='') &&(this.state.email!=''))
        {  
            axios.get(`http://localhost:4000/Training/SearchNameEmail/${this.state.text}/${this.state.email}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate=='') &&(this.state.ToDate=='')&&(this.state.text=='') &&(this.state.email!=''))  
        {
            axios.get(`http://localhost:4000/Training/SearchEmail/${this.state.email}`).then(res =>
            {
                this.setState({
                    data: res.data
                })          
            })

        }
        else if((this.state.FromDate=='') &&(this.state.ToDate=='')&&(this.state.text!='') &&(this.state.email==''))  
        {
            axios.get(`http://localhost:4000/Training/SearchName/${this.state.text}`).then(res =>
            {
                this.setState({
                    data: res.data
                })
            })            
        
        }
        else
        {
            this.getAll();
        }      
    }
    getTraineName() {
        axios.get("http://localhost:4000/Training").then(res => {
            var name = res.data;
            var value = [];
            var TraineName = [];
            for (var i = 0, l = name.length; i < l; i++) {
                if (name[i]) {
                    value.push(name[i].name);
                    this.setState({
                        TraineName: value
                    });
                }
            }
        })
    }

    onTextChanges = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.TraineName.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestionss = () => {
        let { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) =>
                     (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }
            </ul>
        );
    }




render() 
{
    const { text, suggestions } = this.state;
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
                        <h1> Report Training</h1>
                    </div>
                </div>
                <br />
                <br />
                <div className="page-content-wrapper ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card m-b-30">
                                    <div className="card-body">
                                        <form id="uploadForm" class="product-upload-form" onSubmit={this.TrainingReport}  >
                                            <div class="form-element margin-bottom-20">
                                                <div class="form-group">
                                                    <p id="errpreimg" class="em no-margin text-danger"></p>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label>From Date <span></span></label>
                                                        <input name="FromDate" type="date" class="form-control form-control-lg" placeholder="Enter Name..." onChange={this.Change} />
                                                        <p id="errtitle" class="em no-margin text-danger"></p>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label>To Date<span></span></label>
                                                        <input name="ToDate" type="date" class="form-control form-control-lg" placeholder="Enter Name..."  onChange={this.Change} />
                                                        <p id="errtitle" class="em no-margin text-danger"></p>
                                                    </div>
                                                </div>

                                                <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Name<span></span></label>
                                                                    <input id="query" type="text" class="form-control form-control-lg"  placeholder="Enter Name..."  onChange={this.onTextChanges} value={text}/>
                                                                         {this.renderSuggestionss()}
                                                                    <p id="errtitle" class="em no-margin text-danger"></p>
                                                                </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Email</label>
                                                        <input name="email" type="text" class="form-control form-control-lg" placeholder="Enter Email..."  onChange={this.Change}  />
                                                        <p id="errprice" class="em no-margin text-danger"></p>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group mb-0">
                                                        <input type="submit" class="form-control btn btn-info" placeholder=" " value="Search" style={{ marginTop: '31px' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <table id="datatable-buttons" className="table table-striped table-bordered dt-responsive nowrap" style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>S.NO</th>
                                                    <th>Date</th>
                                                    <th>Photo</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Mobile</th>
                                                    <th>Course</th>
                                                    <th>Fees</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {console.log(this.state.data)}
                                                {

                                                    (
                                                        this.state.data.length > 0 ?

                                                            this.state.data.map((Training, index) =>

                                                                <tr key={Training._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td><Moment format="DD-MMMM-YYYY ">{Training.createdTime}</Moment></td>
                                                                    <td></td>
                                                                    <td>{Training.name}</td>
                                                                    <td>{Training.email}</td>
                                                                    <td>{Training.mobile}</td>
                                                                    <td>{Training.course_offered}</td>
                                                                    <td><NumberFormat value={ Training.fees_offered } displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                                                                    <td>{Training.status}</td>


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
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <Footer />
    </div>
    </div>
   )
  }
}
export default ReportTraining;