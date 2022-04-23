import React from 'react';

import { widget } from '../../../../../charting_library/charting_library.min';

import Datafeed from './datafeed.js';

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

  widgetCreator = (props) => {
    // const { selectedMarketOptions, orderBookTable: table } = props;
    // const { first, second } = pairDivider(selectedMarketOptions);
    const widgetOptions = {
      user_id: this.props.userId,
      // symbol: `Bitfinex:${first}/${second}`,
      symbol: 'Bitfinex:BTC/USDT',
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
  };

  componentWillUnmount() {
    if (this.chartWidget !== null) {
      this.chartWidget.remove();
      this.chartWidget = null;
    }
  }

  render() {
    return (
      <div
        id={this.props.containerId}
        style={{ height: '411px', width: '100%' }}
      />
    );
  }
}
