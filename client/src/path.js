import React, { Component } from 'react';
import {Helmet} from "react-helmet";

 
class Application extends Component {
  render () {
    return (
        <div className="application">
                                <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        <link rel="stylesheet" href="./assets/css/bootstrap.min.css" />
<link rel="stylesheet" href="./assets/css/icons.css" />
<link rel="stylesheet" href="./assets/css/style.css" /> 
<script src="./assets/js/jquery.min.js"></script>
<script src=" ./assets/js/bootstrap.bundle.min.js"></script>
<script src="./assets/js/modernizr.min.js"></script>
<script src="./assets/js/detect.js"></script>
<script src="./assets/js/fastclick.js"></script>
<script src="./assets/js/jquery.slimscroll.js"></script>
<script src="./assets/js/jquery.blockUI.js"></script>
<script src="./assets/js/waves.js"></script>
<script src="./assets/js/jquery.nicescroll.js"></script>
<script src="./assets/js/jquery.scrollTo.min.js"></script> 

<script src="./assets/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="./assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

<script src="./assets/plugins/datatables/dataTables.buttons.min.js"></script>
<script src="./assets/plugins/datatables/buttons.bootstrap4.min.js"></script>
<script src="./assets/plugins/datatables/jszip.min.js"></script>
<script src="./assets/plugins/datatables/pdfmake.min.js"></script>
<script src="./assets/plugins/datatables/vfs_fonts.js"></script>
<script src="./assets/plugins/datatables/buttons.html5.min.js"></script>
<script src="./assets/plugins/datatables/buttons.print.min.js"></script>
<script src="./assets/plugins/datatables/buttons.colVis.min.js"></script>

<script src="./assets/plugins/datatables/dataTables.responsive.min.js"></script>
<script src="./assets/plugins/datatables/responsive.bootstrap4.min.js"></script>


<script src="./assets/pages/datatables.init.js"></script>

<script src="./assets/js/app.js"></script>
    </Helmet>
             
        </div>
    );
  }
};
export default Application;






