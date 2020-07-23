import React, { Fragment, useState, useEffect } from 'react';
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
  const [dataEmployeeCode, setdataEmployeeCode] = useState('');
  const [err, setError] = useState('');
  


  useEffect(() => {
    axios.get('http://localhost:4000/Employee')
      .then(res => {
        setdataEmployeeCode(res.data);

      })
      .catch(err => {
        setError(err.message);

      })
  }, []);

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
    const formData = new FormData()
    formData.append('file', file)
    formData.append('UserName', UserName)
    formData.append('TypeOflead', TypeOflead)
 
if(TypeOflead=='Training')
{
  try {
    const res = await axios.post('http://localhost:4000/ExcelDataTraining/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        document.getElementById("progressbar").style.display = "block";
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 10000); 
       
      }
    });
      setMessage("File Uploaded") 
    const { data } = res.data; 
    window.location.reload(true);
  
   
  }
  catch (err) {
    if (err.response.status === 500) {
      setMessage('There was a problem with the server');
    } else {
      setMessage(err.response.data.msg);
    }
  }
  
}
 
else if(TypeOflead=='Project')
{
  
  try {
    const res = await axios.post('http://localhost:4000/ExcelDataProject/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        document.getElementById("progressbar").style.display = "block";
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 10000);
      }
    })
    const { fileName, filePath } = res.data;

    setUploadedFile({ fileName, filePath });

    setMessage('File Uploaded');
    window.location.reload(true);
  }
  catch (err) {
    if (err.response.status === 500) {
      setMessage('There was a problem with the server');
    } else {
      setMessage(err.response.data.msg);
    }
  }
}
 
else if(TypeOflead=='Company')
{
  
  try {
    const res = await axios.post('http://localhost:4000/ExcelDataCompany/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }, 
     
      onUploadProgress: progressEvent => { 
        document.getElementById("progressbar").style.display = "block";
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );      
        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 10000);
      }
    })
    const { fileName, filePath } = res.data;

    setUploadedFile({ fileName, filePath });

    setMessage('File Uploaded');
    window.location.reload(true);
  }
  catch (err) {
    if (err.response.status === 500) {
      setMessage('There was a problem with the server');
    } else {
      setMessage(err.response.data.msg);
    }
  }
}

}
    


console.log(message)

  return (
   
    <Fragment>
     
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
                {message ? <h3 style={{color:"green", marginLeft:"500px"}}>File Uploaded Successfully</h3> : null}
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
                                            {
                                              (
                                                dataEmployeeCode.length > 0 ?

                                                  dataEmployeeCode.map((Employees, index) =>

                                                    <option key={index} value={Employees.Employee_name}>{Employees.Employee_name} ({Employees.Employee_code})</option>
                                                  ) :
                                                  (
                                                    <option value="No">No</option>
                                                  )
                                              )
                                            }
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
                                            <option  >Project</option>
                                            <option  >Company</option>
                                          </select>
                                          <p id="errquantity" class="em no-margin text-danger"></p>
                                        </div>
                                      </div>
                                      <div class="col-md-4">
                                      <label>Excel Upload</label>
                                        <div class="form-group">
                                          <input type="file"accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={onChange} />
                                        </div>
                                      </div>
                                      <div class="col-md-6" id="progressbar" style={{ marginLeft: '300px', display:"none" }}>                                       
                                      <Progress percentage={uploadPercentage}   />                                      
                                      </div>
                                      <br></br>
                                      <br></br>                                      
                                      <div class="col-md-2" style={{ marginLeft: '500px' }} >
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
    </Fragment>
  );
};

export default FileUpload;


