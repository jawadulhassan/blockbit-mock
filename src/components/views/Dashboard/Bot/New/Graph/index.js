import React from 'react';

import { widget } from 'charting_library/charting_library.min';

import { pairDivider } from 'shared/helpers';
import Datafeed from 'shared/tradingView/datafeed.js';

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export default class ChartContainer extends React.PureComponent {
  static defaultProps = {
    interval: 'D',
    autosize: true,
    fullscreen: false,
    datafeedUrl: Datafeed,
    userId: 'public_user_id',
    clientId: 'tradingview.com',
    symbol: 'Bitfinex:BTC/USDT',
    chartsStorageApiVersion: '1.1',
    containerId: 'tv_chart_container',
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
  };

  chartWidget = null;

  componentDidMount() {
    this.widgetCreator(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedMarket !== this.props.selectedMarket) {
      this.widgetCreator(nextProps);
    }
  }

  widgetCreator = (props) => {
    const { selectedMarket } = props;
    const { first, second } = pairDivider(selectedMarket);
    const widgetOptions = {
      user_id: this.props.userId,
      symbol: `Bitfinex:${first}/${second}`,
      autosize: this.props.autosize,
      interval: this.props.interval,
      client_id: this.props.clientId,
      datafeed: this.props.datafeedUrl,
      fullscreen: this.props.fullscreen,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: getLanguageFromURL() || 'en',
      enabled_features: ['study_templates'],
      studies_overrides: this.props.studiesOverrides,
      charts_storage_url: this.props.chartsStorageUrl,
      disabled_features: ['use_localstorage_for_settings'],
      charts_storage_api_version: this.props.chartsStorageApiVersion,
    };
    this.chartWidget = new widget(widgetOptions);
    this.plottingGraph();
  };

  plottingGraph = () => {
    const date = new Date();
    const dateToday = parseInt(date.getTime().toFixed(0));
    date.setMonth(date.getMonth() - 1);
    const dateAMonthAgo = parseInt(date.getTime().toFixed(0));

    this.chartWidget.onChartReady(() => {
      this.chartWidget
        .activeChart()
        .setVisibleRange(
          { from: dateAMonthAgo, to: dateToday },
          { percentRightMargin: 20 }
        )
        .then(() => console.log('New visible range is applied'));
    });
  };

  componentWillUnmount() {
    if (this.chartWidget !== null) {
      this.chartWidget.remove();
      this.chartWidget = null;
    }
  }

  render() {
    return <div id={this.props.containerId} style={{ height: '411px' }} />;
  }
}
