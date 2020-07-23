import React, { Component } from 'react';

class Employee extends Component {
    render() {
        return (
            <div>
                <main class="app-content">
                    <br></br>
                    <div class="app-title">
                        <div>
                            <h1>Add Employee</h1>
                        </div>
                    </div>

                    <div style={{ marginTop: '-5px' }} >
                        <a href="userlist.html" class="btn btn-primary float-right">View List</a>
                    </div>

                    <br></br>
                    <br></br>
                    <div class="row">
                        <div class="col-md-12">

                            <div class="card m-b-30">
                                <div class="card-body">
                                    <div class="tile">
                                        <div class="tile-body" id="app">


                                            <div class="row">
                                                <div class="col-lg-12">

                                                    <div class="product-upload-inner">


                                                        <form id="uploadForm" class="product-upload-form">

                                                            <div class="form-element margin-bottom-20">

                                                                <label for="" class="sec-txt">Preview Images
                                                                    <span></span></label>
                                                                <div class="">
                                                                    <table class="table table-striped" id="imgtable">

                                                                    </table>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="btn bg-primary txt-white"
                                                                        style={{ width: '200px', color: 'white', cursor: 'pointer' }}>
                                                                        <input
                                                                            type="file" name="inpFile" id="inpFile" style={{ display: 'none' }} />
                                                                        <i class="fa fa-plus"></i> Add a photo
                                                                    </label>


                                                                    <p id="errpreimg" class="em no-margin text-danger">
                                                                    </p>
                                                                </div>

                                                            </div>
                                                            <div class="image-preview" id="imagepreview">
                                                                <img src="" alt="image preview" class="image-preview__image" />
                                                                <span class="image-preview__default-text"></span>

                                                            </div>

                                                            <div class="row">
                                                                <div class="col-md-3">
                                                                    <div class="form-group">
                                                                        <label>Name <span></span></label>
                                                                        <input name="title" type="text"
                                                                            class="form-control form-control-lg"
                                                                            placeholder="Enter Name..." />
                                                                        <p id="errtitle"
                                                                            class="em no-margin text-danger"></p>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-3">

                                                                    <div class="form-group">
                                                                        <label>Mobile</span></label>
                                                                    <input name="quantity" type="text"
                                                                        class="form-control form-control-lg"
                                                                        placeholder="Enter Mobile..." />
                                                                    <p id="errquantity"
                                                                        class="em no-margin text-danger">
                                                                    </p>

                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                        <label>Email </span></label>
                                                                    <input name="price" type="text"
                                                                        class="form-control form-control-lg"
                                                                        placeholder="Enter Email..." />
                                                                    <p id="errprice"
                                                                        class="em no-margin text-danger">
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        <div class="col-md-3">
                                                            <div class="form-group">
                                                                <label>Password </span></label>
                                                            <input name="price" type="password"
                                                                class="form-control form-control-lg"
                                                                placeholder="Enter Password..." />
                                                            <p id="errprice"
                                                                class="em no-margin text-danger">
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Date of Birth</label>
                                                            <input name="product_code" type="date"
                                                                class="form-control form-control-lg"
                                                                placeholder="DD/MM/YYYY" />

                                                            <p id="errsubcat"
                                                                class="em no-margin text-danger"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Department</label>
                                                            <div >
                                                                <select id="lstFruits" multiple="multiple">
                                                                    <option value="1">Mech</option>
                                                                    <option value="2">IT</option>
                                                                    <option value="3">ECE</option>
                                                                    <option value="4">EEE</option>
                                                                    <option value="5">Civil</option>
                                                                </select>
                                                            </div>
                                                            <p id="errcat" class="em no-margin text-danger"></p>
                                                        </div>
                                                    </div>


                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Experience</label>
                                                            <input name="product_code" type="text"
                                                                class="form-control form-control-lg"
                                                                placeholder="Enter Experience..." />

                                                            <p id="errcode"
                                                                class="em no-margin text-danger"></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label>Date of Joining </label>
                                                            <input name="product_code" type="date"
                                                                class="form-control form-control-lg"
                                                                placeholder="DD-MM-YYYY" />

                                                            <p id="errsubcat"
                                                                class="em no-margin text-danger"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row"> 
                                                    <div class="col-md-3">
                                                        <label>Res.Location</label>
                                                        <textarea class="form-control form-control-lg"
                                                            rows="3"></textarea>
                                                    </div>
                                                    <div class="col-md-2" >
                                                        <label> <br></label>
                                                            <button type="submit" class="btn btn-info btn-block" name="button">Submit</button>
                                                                  </div>
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
                </main >
            </div >
        );
    }
}

export default Employee;