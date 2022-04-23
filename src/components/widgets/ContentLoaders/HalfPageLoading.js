import React from 'react';
import ContentLoader from 'react-content-loader';

const HalfPageLoader = (props) => (
  <ContentLoader
    height={433}
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    style={{ width: '50%', justifyContent: 'center' }}
    {...props}
  >
    <rect x="0" y="30" rx="8" ry="8" width="98%" height="403" />
  </ContentLoader>
);

export default HalfPageLoader;
