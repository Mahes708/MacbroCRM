import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';


class Agreement_feild extends Component {
  render() {
    return (
      <div>
        <main className="app-content">
          <div className="app-title">
            <br />
            <div>
              <h1>Add Agreement</h1>
            </div>
          </div>
          <div style={{ marginTop: '-5px' }}>
            <Link to="/Agreement_list" className="btn btn-primary float-right">View List</Link>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-12">
              <div className="card m-b-30">
                <div className="card-body">
                  <div className="tile">
                    <div className="tile-body" id="app">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="product-upload-inner">{/* product upload inner */}
                            <form id="uploadForm" className="product-upload-form" >
                              <div className="row">
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <label>Trainee ID <span /></label>
                                    <input name="Trainee_id" type="text" className="form-control form-control-lg" placeholder="Enter Trainee ID..." />
                                    <p id="errtitle" className="em no-margin text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <label>Name <span /></label>
                                    <input name="Name" type="text" className="form-control form-control-lg" placeholder="Ramkumar" readOnly />
                                    <p id="errtitle" className="em no-margin text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <label>Type Of Course</label>
                                    <input name="Type_course" type="text" className="form-control form-control-lg" placeholder="Mechanical" readOnly />
                                    <p id="errcode" className="em no-margin text-danger" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <label>Course Duration</label>
                                    <input name="Duration" type="number" className="form-control form-control-lg" placeholder="12 Months" readOnly />
                                    <p id="errcode" className="em no-margin text-danger" />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>Special Comments</label>
                                    <textarea className="form-control form-control-lg" name="Comments" rows={5} defaultValue={""} />
                                    <p id="errcode" className="em no-margin text-danger" />
                                    <input type="submit" name="submit" defaultValue="Submit" className="form-control form-control-lg btn btn-primary" />
                                  </div>
                                </div>
                              </div>
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



class Agreement_add extends Component {
  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div className="content-page">
          <div className="content">
            <Header />
            <Agreement_feild />
          </div>
          <Footer />

        </div>
      </div>
    );
  }
}

export default Agreement_add;