import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [UserName, setUserName] = useState('');
  const [TypeOflead, setTypeOflead] = useState('');
 

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onChangeval = e => {
    setUserName(e.target.value);  
  }
  const onChangelead = e => {
    setTypeOflead(e.target.value);  
  }
 
  const onSubmit = async e => {
    e.preventDefault();
 
 const data = {
      UserName :UserName,
      TypeOflead :TypeOflead
    }
   const formData = new FormData();
   formData.append('file', file);
    try { 
 
      const res = await axios.post('http://localhost:4000/ExcelData/upload', formData,data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      })  
      const { UserName, TypeOflead, fileName, filePath } = res.data;

      setUploadedFile({ UserName, TypeOflead, fileName, filePath });

      setMessage('File Uploaded')
    }
     catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  // axios.get("http://localhost:4000/Employee").then(res => {     
  //   this.setState({
  //     dataEmployeeCode: res.data
  //   })     
  // })


  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <div>
        <div id="wrapper">
          <Sidebar />
          <div className="content-page">

            <Header />
            <div className="content">

              <main className="app-content">

                <br></br>
                <div className="app-title">
                  <div>

                    <h1>Excel Data Upload</h1>
                  </div>
                </div>
                <br></br>
                <br></br>
                <div className="row">
                  <div className="col-md-12">

                    <div className="card m-b-30">
                      <div className="card-body">
                        <div className="tile">
                          <div className="tile-body" id="app">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="product-upload-inner">
                                  {/* <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>
        <Progress percentage={uploadPercentage} />
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form> */}
                                  <form id="uploadForm" class="product-upload-form" onSubmit={onSubmit}>
                                    <div class="row">
                                      <div class="col-md-4">
                                        <div class="form-group">
                                          <label> User Name</label>

                                          <select class="custom-select" name="UserName" onChange={onChangeval}>
                                            <option selected>Select User name</option>
                                            <option  >user-1</option>
                                            <option  >user-2</option>
                                            <option  >user-3</option>
                                          </select>
                                          <p id="errquantity" class="em no-margin text-danger"></p>
                                        </div>
                                      </div>
                                      <div class="col-md-4">
                                        <div class="form-group">
                                          <label>Type Of Lead</label>

                                          <select class="custom-select" name="TypeOflead" onChange={onChangelead}>
                                            <option selected>Select Type</option>
                                            <option  >Training</option>
                                            <option  >Projects</option>
                                            <option  >Company</option>
                                          </select>
                                          <p id="errquantity" class="em no-margin text-danger"></p>
                                        </div>
                                      </div>
                                      <div class="col-md-4">
                                        <div class="form-group" style={{ marginTop: '32px' }}>
                                          <input type="file" accept="application/vnd.ms-excel" onChange={onChange} />
                                        </div>
                                      </div>
                                      <div class="col-md-2" style={{ marginLeft: '400px' }} >

                                        <button type="submit" class="btn btn-info btn-block" name="button">Submit</button>
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
              </main>
            </div>
          </div>
        </div>

      </div >
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;




/*class Excel_upload extends Component {
  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div className="content-page">
          <div className="content">
            <Header />
            <FileUpload />
          </div>
          <Footer />

        </div>
      </div>
    );
  }
}

export default Excel_upload;*/