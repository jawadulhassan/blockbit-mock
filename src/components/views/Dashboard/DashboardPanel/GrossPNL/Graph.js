import React from 'react';
import { format } from 'date-fns';
import Highcharts from 'highcharts/highcharts.src.js';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

function PNLGraph({ heightProp = '250px', chartData }) {
  const chartOptions = {
    chart: {
      zoomType: 'x',
      plotAreaWidth: '100%',
      backgroundColor: 'hsl(0deg 0% 98%)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function () {
          return format(new Date(this.value * 1000), 'yyyy-MM-dd');
        },
      },
    },
    yAxis: {
      lineWidth: 1,
      gridLineWidth: 0,
      title: {
        text: null,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get('rgba'),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: 'area',
        data: chartData,
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{ style: { height: heightProp, width: '100%' } }}
    />
  );
}

export default PNLGraph;
