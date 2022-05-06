import React from 'react';
import Highcharts from 'highcharts/highcharts.src.js';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

import { dataset } from 'shared/mockData/pie';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

function PieChart() {
  const tradeByMarketsData = [
    {
      name: 'Exchanges',
      colorByPoint: true,
      data: dataset.data,
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
      text: null,
    },
    tooltip: {
      pointFormat: '<b>{point.y:.1f} BTC</b>',
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
      },
    },
    series: tradeByMarketsData,
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
