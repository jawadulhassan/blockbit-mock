import React from 'react';
import styles from './progress.module.css';

function _Progress({
  progress = 0,
  strokeWidth = 2,
  ballStrokeWidth = 16,
  reduction = 0.25,
  transitionDuration = 0.5,
  transitionTimingFunction = 'ease',
  background = '#dde2e9',
  hideBall = false,
  hideValue = false,
  gradient = [
    {
      stop: 0.0,
      color: '#00bc9b',
    },
    {
      stop: 1,
      color: '#5eaefd',
    },
  ],
  subtitle = '',
  style,
  className,
}) {
  progress = Math.round(progress * 100) / 100;
  const width = 50;
  const center = width / 2;
  const height = 40 || center + center * Math.cos(reduction * Math.PI);
  const [unique] = React.useState(() => Math.random().toString());
  const rotate = 90 + 180 * reduction;
  const r = center - strokeWidth / 2 - ballStrokeWidth / 2;
  const circumference = Math.PI * r * 2;
  const offset = (circumference * (100 - progress * (1 - reduction))) / 100;
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: `${className} ${styles.progress}`,
      style: style,
    },
    /*#__PURE__*/ React.createElement(
      'svg',
      {
        viewBox: `0 0 ${width} ${height}`,
        className: styles.svg,
      },
      /*#__PURE__*/ React.createElement(
        'defs',
        null,
        /*#__PURE__*/ React.createElement(
          'linearGradient',
          {
            id: 'gradient' + unique,
            x1: '0%',
            y1: '0%',
            x2: '0%',
            y2: '100%',
          },
          gradient.map(({ stop, color }) =>
            /*#__PURE__*/ React.createElement('stop', {
              key: stop,
              offset: stop * 100 + '%',
              stopColor: color,
            })
          )
        )
      ),
      !hideValue &&
        /*#__PURE__*/ React.createElement(
          'text',
          {
            x: center,
            y: center,
            textAnchor: 'middle',
            fontSize: '7',
            fontWeight: '600',
            fill: '#041F60',
          },
          progress / 10
        ),
      /*#__PURE__*/ React.createElement(
        'text',
        {
          x: center,
          y: center + (30 * 3) / 4,
          textAnchor: 'middle',
          fill: '#9c9c9c',
        },
        subtitle
      ),
      /*#__PURE__*/ React.createElement('circle', {
        transform: `rotate(${rotate} ${center} ${center})`,
        id: 'path',
        cx: center,
        cy: center,
        r: r,
        strokeWidth: 4,
        strokeDasharray: circumference,
        strokeDashoffset: circumference * reduction,
        fill: 'none',
        stroke: background,
        strokeLinecap: 'round',
      }),
      /*#__PURE__*/ React.createElement('circle', {
        style: {
          transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`,
        },
        transform: `rotate(${rotate} ${center} ${center})`,
        id: 'path',
        cx: center,
        cy: center,
        r: r,
        strokeWidth: 4,
        strokeDasharray: `${circumference}`,
        strokeDashoffset: offset,
        fill: 'none',
        stroke: `url(#gradient${unique})`,
        strokeLinecap: 'round',
      }),
      !hideBall &&
        /*#__PURE__*/ React.createElement('circle', {
          style: {
            transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`,
          },
          transform: `rotate(${rotate} ${center} ${center})`,
          id: 'path',
          cx: center,
          cy: center,
          r: r,
          strokeWidth: ballStrokeWidth,
          strokeDasharray: `1 ${circumference}`,
          strokeDashoffset: offset,
          fill: 'none',
          stroke: `url(#gradient${unique})`,
          strokeLinecap: 'round',
        })
    )
  );
}

export const Progress = /*#__PURE__*/ React.memo(_Progress);
Progress.displayName = 'Progress';
export default Progress;
