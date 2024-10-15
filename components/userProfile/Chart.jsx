"use client"
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const Chart= () => {
  const [chartData] = useState({
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 71, 49, 32, 69]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        yaxis: {
          lines: {
            show: true,
            color: '#000000',  // Red color for horizontal grid lines
          }
        },
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4','Week 5','Week 6','Week 7'],
        axisTicks: {
          color: '#000000' // Change this to your desired color
        },
        axisBorder: {
          color: '#000000' // Change this to your desired color
        }
      },

    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};


