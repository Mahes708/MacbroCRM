import React, { Component } from 'react';
import logo from './images/logo.png';
import { Redirect } from "react-router-dom";
import Dashboard from './Dashboard';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        
            super(props)

            const token = localStorage.getItem("token")

            let loggedIn = true
            if(token == null){
                loggedIn = false
            }
            
            this.state={
                data : [],
                email :"",
                password : "",
                error : "",
                loggedIn
            }

            this.onChange = this.onChange.bind(this)
            this.submitForm = this.submitForm.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        this.getAll();
    }
   
    getAll() {
        axios.get("http://localhost:4000/Employee").then(res => {
              console.log(res.data);
            this.setState({
                data: res.data
            })
        })
    }


    submitForm(e){
        e.preventDefault()
        const { email , password } = this.state
        //login magic
      const  emailId =this.state.data.email;
      const  passwords =this.state.data.password;
     
      this.state.data.map((Login, index) =>
{
        if(email === Login.email && password === Login.password){
            localStorage.setItem("token", "hfdddyddydyddtff")
            this.setState({
                loggedIn : true
            })
            
        }
        else if(email=='' && password ==''){
           this.setState({
               error :"Please Enter Email ID and Password"
           })
        }
        else{
            this.setState({
                error :"Invalid Email ID and Password"
            })  
        }
    }) 
}



    render() {
                if(this.state.loggedIn){
                    return <Redirect to="/Dashboard"/> 
                }

                const star = {
                    color: "red",
                    textAlign : "center",
                  
                }

        return (
            <div className="fixed-left">
                 <div className="accountbg">
            
            <div className="content-center">
                <div className="content-desc-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-8">
                                <div className="card">
                                    <div className="card-body">
                
                                        <h3 className="text-center mt-0 m-b-15">
                                            <a href="dashboard.html" className="logo logo-admin"></a><img src={logo} height="50" alt="logo"/>
                                        </h3>
                
                                        <h4 className="text-muted text-center font-18"><b>Sign In</b></h4>

                                        <h5 style={star}>{this.state.error}</h5>
                                        
                
                                        <div className="p-2">
                                            <form className="form-horizontal m-t-20" onSubmit={this.submitForm}>
                
                                                <div className="form-group row">
                                                    <div className="col-12">
                                                        <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.onChange} required="" placeholder="Email ID"/>
                                                    </div>
                                                </div>
                
                                                <div className="form-group row">
                                                    <div className="col-12">
                                                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.onChange} required="" placeholder="Password"/>
                                                    </div>
                                                </div>  
                
                                                <div className="form-group row">
                                                    <div className="col-12">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                <div className="form-group text-center row m-t-20">
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary btn-block waves-effect waves-light" value="Submit" >SUBMIT</button>
                                                    {/* <Link to='/Dashboard' >   <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Log In</button></Link> */}
                                                    </div>
                                                </div>
                
                                                <div className="form-group m-t-10 mb-0 row">
                                                    <div className="col-sm-7 m-t-20">
                                                        <a href="resetpass.html" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</a>
                                                    </div>
                                                    <div className="col-sm-5 m-t-20">
                                                        <a href="register.html" className="text-muted"><i className="mdi mdi-account-circle"></i> Create an account</a>
                                                    </div>
                                                </div>
                                            </form>
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
        );
    }
}

export default Login;