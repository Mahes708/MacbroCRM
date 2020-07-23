import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Autocomplete from 'react-autocomplete';

class ReportProject extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            FromDate : "",
            ToDate : "",
            name : "",
            email : "",
            clientName :[],
            suggestions: [],            
            text: ''
        }
    }
    componentDidMount() {
        this.getAll();
        this.getClientName();
    }
    getAll() {
        axios.get("http://localhost:4000/Project").then(res => {
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

    ProjectReport = event => {
        
        event.preventDefault(); 

        if((this.state.FromDate!='') &&(this.state.ToDate!='')&&(this.state.text!='') &&(this.state.email!=''))  
        {  
            axios.get(`http://localhost:4000/Project/SearchAll/${this.state.FromDate}/${this.state.ToDate}/${this.state.text}/${this.state.email}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate!='') &&(this.state.ToDate!='')&&(this.state.text=='') &&(this.state.email==''))  
        {  
            axios.get(`http://localhost:4000/Project/SearchDate/${this.state.FromDate}/${this.state.ToDate}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate!='') &&(this.state.ToDate!='')&&(this.state.text!=''))  
        {  
            axios.get(`http://localhost:4000/Project/SearchDateName/${this.state.FromDate}/${this.state.ToDate}/${this.state.text}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate!='') &&(this.state.ToDate!='')&&(this.state.email!=''))  
        {  
            axios.get(`http://localhost:4000/Project/SearchDateEmail/${this.state.FromDate}/${this.state.ToDate}/${this.state.email}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate=='') &&(this.state.ToDate=='')&&(this.state.text!='') &&(this.state.email!=''))
        {  
            axios.get(`http://localhost:4000/Project/SearchNameEmail/${this.state.text}/${this.state.email}`).then(res =>
            {
                this.setState({
                    data: res.data
                })           
            })
        }
        else if((this.state.FromDate=='') &&(this.state.ToDate=='')&&(this.state.text=='') &&(this.state.email!=''))  
        {
            axios.get(`http://localhost:4000/Project/SearchEmail/${this.state.email}`).then(res =>
            {
                this.setState({
                    data: res.data
                })          
            })

        }
        else if((this.state.FromDate=='') &&(this.state.ToDate=='')&&(this.state.text!='') &&(this.state.email==''))  
        {
            axios.get(`http://localhost:4000/Project/SearchName/${this.state.text}`).then(res =>
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
    getClientName() {
        axios.get("http://localhost:4000/Project").then(res => {
            var name = res.data;
            var value = [];
            var clientName = [];
            for (var i = 0, l = name.length; i < l; i++) {
                if (name[i]) {
                    value.push(name[i].client_name);
                    this.setState({
                        clientName: value
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
            suggestions = this.state.clientName.sort().filter(v => regex.test(v))
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
    console.log(text)
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
                        <h1> Report Project</h1>
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
                                        <form id="uploadForm" class="product-upload-form" onSubmit={this.ProjectReport}  >
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
                                                    <th>Client Name</th>
                                                    <th>Mobile</th>
                                                    <th>Email</th>
                                                    <th>Company Name</th>
                                                    <th>Project</th>
                                                    <th>Cost</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {console.log(this.state.data)}
                                                {

                                                    (
                                                        this.state.data.length > 0 ?

                                                            this.state.data.map((Project, index) =>

                                                                <tr key={Project._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td><Moment format="DD-MMMM-YYYY ">{Project.createdTime}</Moment></td>
                                                                    <td>{Project.client_name}</td>
                                                                    <td>{Project.mobile}</td>
                                                                    <td>{Project.email}</td>
                                                                    <td>{Project.company_name}</td>
                                                                    <td>{Project.project_type}</td>
                                                                    <td><NumberFormat value={Project.cost} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix={'₹'} /></td>
                                                                    <td>{Project.status}</td>


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
export default ReportProject;