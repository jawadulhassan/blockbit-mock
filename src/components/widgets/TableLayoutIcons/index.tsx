import React, { FC } from 'react';

import { FlexRow } from 'shared/commonStyles';

const TableLayoutIcons: FC<any> = ({ layout, setLayout }: any): any => {
  if (layout === 'grid') {
    return (
      <FlexRow>
        <img
          alt="grid-active"
          className="pointer"
          src="/static/svgs/grid-active.svg"
          onClick={(): any => setLayout('grid')}
        />
        <img
          alt="list"
          className="ml-2 pointer"
          src="/static/svgs/list.svg"
          onClick={(): any => setLayout('list')}
        />
      </FlexRow>
    );
  }
  if (layout === 'list') {
    return (
      <FlexRow>
        <img
          alt="grid"
          className="pointer"
          src="/static/svgs/grid.svg"
          onClick={(): any => setLayout('grid')}
        />
        <img
          alt="list-active"
          className="ml-2 pointer"
          src="/static/svgs/list-active.svg"
          onClick={(): any => setLayout('list')}
        />
      </FlexRow>
    );
  }
};

export default TableLayoutIcons;
