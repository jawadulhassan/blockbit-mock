import React, { FC } from 'react';
import ReactLoading from 'react-loading';

const Loader: FC<any> = (): any => {
  return (
    <div className="app-loader">
      <ReactLoading type="bubbles" color="#132b66" height={100} width={100} />
    </div>
  );
};

export const SmallerLoader: FC<any> = (): any => {
  return (
    <div className="small-loader">
      <ReactLoading
        type="spinningBubbles"
        color="#132b66"
        height={60}
        width={60}
      />
    </div>
  );
};

export default Loader;
