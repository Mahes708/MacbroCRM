import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class Chart_Graph extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        Trainingdata : [],
        series : [],
        
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
          },
          yaxis: {
            title: {
              text: '₹ (thousands)'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "₹ " + val + " thousands"
              }
            }
          }
        },
      
      
      };
    }
    componentDidMount() 
    {
       var year ='2020'
       var FromDate
       var ToDate
       var TotalValue = []
       for(var i= 1;i<=12;i++)
       {
          if(i<=9)
          {
            FromDate = year + "-0" + i +"-1";
            ToDate   = year + "-0" + i +"-31";
          }
          else
          {
              FromDate = year + "-" + i +"-1";
              ToDate   = year + "-" + i +"-31";
          }
          //console.log(FromDate) 
          
          axios.get(`http://localhost:4000/Payment/Graph/${FromDate}/${ToDate}`).then(res => 
          {
            console.log(res.data)
              this.setState({  Trainingdata: res.data   })
          })
                
      }
     
    
   }
  

    render() {
      console.log(this.state.Trainingdata)
      this.state.series = [{
        name: 'Training',
       // data: this.state.Trainingdata
       data : [0,0,10000,20000,30000,45000,75000,100000,120000,0,0,0]
      }, {
        name: 'Project',
        data: [0,0,5000,30000,20000,40000,65000,86000,80000,0,0,0]
      }, {
        name: 'Company',
        data: [0,0,7000,25000,40000,50000,70000,90000,100000,0,0,0]
      }]
        return (

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={500} />
</div>


      );
    }
  }

  const domContainer = document.querySelector('#app');
  export default Chart_Graph;