import React from 'react';
import Highcharts from 'highcharts/highcharts.src.js';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

import { dataset } from 'shared/mockData/pie';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

function MarketTradesByWeek() {
  const chartOptions = {
    chart: {
      type: 'column',
      dashStyle: 'Dash',
      plotAreaWidth: '100%',
      backgroundColor: 'hsl(0deg 0% 98%)',
    },
    position: {
      verticalAlign: 'right',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: dataset.xData.map((date) => {
        return Highcharts.dateFormat('%Y-%m-%d', new Date(date).getTime());
      }),
      crosshair: true,
    },
    plotOptions: {
      column: {
        borderRadius: 5,
      },
      series: {
        dataLabels: {
          enabled: false,
        },
        color: '#294077',
      },
    },
    tooltip: {
      borderRadius: 7,
      borderColor: '#fff',
      background: '#FFFFFF',
      boxShadow: '0px 1px 4px rgba(107, 104, 104, 0.18)',
    },
    yAxis: {
      min: 0,
      title: null,
      lineWidth: 1,
      gridLineDashStyle: 'Dash',
    },
    title: null,
    series: [
      {
        name: 'Trades',
        data: dataset.data,
        borderRadiusTopLeft: '20px',
        borderRadiusTopRight: '20px',
      },
    ],
  };

  return (
    <HighchartsReact
      options={chartOptions}
      highcharts={Highcharts}
      containerProps={{ style: { height: 265, width: '100%' } }}
    />
  );
}

export default MarketTradesByWeek;
