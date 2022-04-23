import React from 'react';
import ContentLoader from 'react-content-loader';

const FullPageLoader = (props) => (
  <ContentLoader
    width="100%"
    height={433}
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    style={{ width: '100%' }}
    {...props}
  >
    <rect x="0" y="30" rx="10" ry="10" width="100%" height="403" />
  </ContentLoader>
);

export default FullPageLoader;
