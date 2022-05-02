import React from 'react';
import Highcharts from 'highcharts/highcharts.src.js';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

const dataset = {
  xData: [
    '2020-10-01T19:30:00.000Z',
    '2020-10-02T19:30:00.000Z',
    '2020-10-03T19:30:00.000Z',
    '2020-10-04T19:30:00.000Z',
    '2020-10-05T19:30:00.000Z',
  ],
  data: [4, 2, 3, 1, 5],
};

function AverageProfitPercentage() {
  const profitChartOptions = {
    chart: {
      type: 'column',
      dashStyle: 'Dash',
      backgroundColor: 'hsl(0deg 0% 98%)',
    },
    title: null,
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
    yAxis: {
      min: 0,
      title: null,
      lineWidth: 1,
      labels: {
        format: '{value}%',
      },
      gridLineDashStyle: 'Dash',
    },
    tooltip: {
      borderRadius: 7,
      borderColor: '#fff',
      background: '#FFFFFF',
      boxShadow: '0px 1px 4px rgba(107, 104, 104, 0.18)',
    },
    plotOptions: {
      column: {
        borderRadius: 5,
      },
      series: {
        dataLabels: {
          enabled: false,
        },
        color: '#1395BA',
      },
    },

    series: [
      {
        borderRadiusTopLeft: 12,
        borderRadiusTopRight: 12,
        name: 'Profits',
        data: dataset.data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={profitChartOptions}
        containerProps={{ style: { height: 265, width: '100%' } }}
      />
    </div>
  );
}

export default AverageProfitPercentage;
