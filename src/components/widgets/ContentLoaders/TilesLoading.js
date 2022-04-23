import React from 'react';
import ContentLoader from 'react-content-loader';

const TilesLoader = (props) => (
  <ContentLoader
    width="100%"
    height={160}
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
    {...props}
  >
    <rect x="0" y="37" rx="8" ry="8" width="31%" height="122" />
    <rect x="34%" y="37" rx="8" ry="8" width="31%" height="122" />
    <rect x="68%" y="37" rx="8" ry="8" width="31%" height="122" />
  </ContentLoader>
);

export default TilesLoader;
