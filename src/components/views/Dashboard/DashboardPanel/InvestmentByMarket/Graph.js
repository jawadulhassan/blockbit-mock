import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts.src.js';

import HighchartsExporting from 'highcharts/modules/exporting';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

const data = {
  data: [4, 2, 3, 7, 1, 5, 3],
  tileValue: 217093.23,
};

function PieChart() {
  const investmentByMarketData = [
    {
      name: 'Exchanges',
      colorByPoint: true,
      data: data?.data,
      point: {
        events: {
          click: function () {
            console.log(this.name);
          },
        },
      },
    },
  ];
  const chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      backgroundColor: 'hsl(0deg 0% 98%)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: `<b style="font-family: Open Sans;font-style: normal;font-weight: bold;font-size: 24px;line-height: 33px;color: #041F60;">$${data?.tileValue}</b><br/><br/><p style="font-family: Open Sans; font-style: normal; font-weight: normal; font-size: 18px; line-height: 25px;color: #041F60;">Investment</p>`,
      verticalAlign: 'middle',
      floating: true,
    },
    tooltip: {
      pointFormat: '<b>{point.y:.1f}</b>',
    },
    // legend: {
    //   enabled: true,
    //   align: 'right',
    //   verticalAlign: 'center',
    //   layout: 'vertical',
    //   x: 0,
    //   y: 150,
    // },
    legend: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        innerSize: '60%',
        allowPointSelect: true,
        cursor: 'pointer',
        colors: [
          '#294077',
          '#1CE0E2',
          '#00DA9D',
          '#EBC844',
          '#1395BA',
          '#5CA793',
        ],
        // dataLabels: {
        //   enabled: true,
        //   format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        //   style: {
        //     textShadow: false,
        //     color: '#212833',
        //     textOutline: false,
        //   },
        // },
        dataLabels: {
          enabled: true,
          formatter: function () {
            this.point.percentage = this.percentage;
            return Highcharts.numberFormat(this.percentage, 0) + '%';
          },
        },
        showInLegend: true,
        marginTop: 80,
      },
    },
    series: investmentByMarketData,
  };

  return (
    <HighchartsReact
      options={chartOptions}
      highcharts={Highcharts}
      containerProps={{ style: { width: '100%' } }}
    />
  );
}

export default PieChart;
