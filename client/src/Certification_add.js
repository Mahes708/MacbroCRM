import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

class Certification_content extends Component {
    render() {
        return (
            <div>
                <main className="app-content">
  <div className="app-title">
    <br />
    <div>
      <h1>Add Certification</h1>
    </div>
    <div style={{marginTop: '-5px'}}>
      <Link to="/Certification_list" className="btn btn-primary float-right">View List</Link>
    </div>
    <br />
    <br />
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card m-b-30">
        <div className="card-body">
          <div className="tile">
            <div className="tile-body" id="app">
              <div className="row">
                <div className="col-lg-12">
                  <div className="product-upload-inner">{/* product upload inner */}
                    <form id="uploadForm" className="product-upload-form">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Candidate ID</label>
                            <input name="candidate_id" type="text" className="form-control form-control-lg" defaultValue="MAC-0001" />
                            <p id="errcode" className="em no-margin text-danger" />
                          </div>
                        </div>	 
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Candidate Name <span /></label>
                            <input name="Candidate_name" type="text" className="form-control form-control-lg" placeholder="Ramkumar" readOnly />
                            <p id="errtitle" className="em no-margin text-danger" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Type Of Course</label>
                            <input name="type_course" type="text" className="form-control form-control-lg" placeholder="Mechanical" readOnly />
                            <p id="errcode" className="em no-margin text-danger" />
                          </div>
                        </div>	 
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Course Duration</label>
                            <input name="duration" type="number" className="form-control form-control-lg" placeholder="12 Months" readOnly />
                            <p id="errcode" className="em no-margin text-danger" />
                          </div>
                        </div>	 
                        <div className="col-md-4">
                          <div className="form-group">
                            <label> Grade<span /></label>
                            <input name="grade" type="text" className="form-control form-control-lg" placeholder="Enter Grade..." />
                            <p id="errtitle" className="em no-margin text-danger" />
                          </div>
                        </div>
                      </div>
                      <center> <input type="submit" defaultValue="Submit" name="submit" className="btn btn-primary" /></center>
                    </form>
                  </div>{/* //.product upload inner */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div></main>

            </div>
        );
    }
}


class Certification_add extends Component {
    render() {
        return (
            <div id="wrapper">
            <Sidebar />
            <div className="content-page">
                <div className="content">
                    <Header />                        
                    <Certification_content />
                </div>
                <Footer />

            </div>
        </div> 
        );
    }
}

export default Certification_add;