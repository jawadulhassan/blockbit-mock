import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highcharts.src.js';

import { performanceGraphData } from 'shared/mockData/graphData';

import HighchartsExporting from 'highcharts/modules/exporting';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

function PerformanceGraph({ heightProp = '235px' }) {
  // const {performanceGraphData} = props;
  const chartOptions = {
    chart: {
      zoomType: 'x',
      backgroundColor: 'hsl(0deg 0% 98%)',
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: null,
      },
      labels: {
        enabled: false,
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
        name: 'USD to EUR',
        data: performanceGraphData,
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{ style: { height: heightProp } }}
    />
  );
}

export default PerformanceGraph;
