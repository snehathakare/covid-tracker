import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
  legend: {
    display:false,
  },
  elements: {
    points: {
      radius:0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
                  labelColor: function(tooltipItem, data) {
                  return numeral(tooltipItem.value).format("+0,0") 
                         
                  },
              },
   }, 

  scales: {
    
            xAxes: [{
                type:"time",
                time: {
                  format: "MM/DD/YY",
                  tooltipFormat: "ll",
                },
                
            }],

            yAxes: [{
                gridlines: {
                  display: false,
                },

                ticks: {
                  callbacks: function(value, index, values) {
                  return numeral(value).format("0a") ;        
                  },

                },
            }],
        },          
}

function LineGraph({casesType = 'cases'}) {

  const [data, setData] = useState({});

//https://disease.sh/v3/covid-19/historical/all?lastdays=120

//format data to suit chart js line graph format
  const buildChartData = (data, casesType='cases') => {
    const chartData = [];
    let lastDataPoint;

    for(let date in data.cases) {
      if (lastDataPoint){
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        }
        chartData.push(newDataPoint);
      }
      lastDataPoint = data['cases'][date];
    };
    return chartData;
  };


  useEffect(()=> {
    const fetchData = async() => {

     await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    .then(response => response.json())
    .then(data => {

      let chartData = buildChartData(data, 'cases');
      setData(chartData);
    } )
    }

    fetchData();    

  }, [casesType])

  

  return (
    <div>
      {data?.length > 0 && (
          <Line options={options} data={{  
            datasets: [{
              backgroundColor:"rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034",
              data: data}]
          }}
        />
      
      )}
      
    </div>
  );
}

export default LineGraph;