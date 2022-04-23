import React, { FC, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FlexRow } from 'shared/commonStyles';
import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { getUserTilesDataEndpoint } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';

import CardWidget from 'components/widgets/CardWidget';
import TilesLoader from 'components/widgets/ContentLoaders/TilesLoading';

interface IProject {
  tileName: string;
  tilePercentage: number;
  tileValue: number;
}

const Tiles: FC<{}> = () => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [tilesList, setTilesList] = useState<IProject[] | []>([
    {
      tileName: '',
      tileValue: 0,
      tilePercentage: 0,
    },
    {
      tileName: '',
      tileValue: 0,
      tilePercentage: 0,
    },
    {
      tileName: '',
      tileValue: 0,
      tilePercentage: 0,
    },
  ]);

  useEffect((): any => {
    getUserTiles();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserTiles(): Promise<any> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(`${getUserTilesDataEndpoint}?id=${user.userId}`)
      .then((response): void => {
        if (!unmounted.current) {
          const list = response?.data?.data?.records;
          if (list) {
            setTilesList(list);
            setIsLoading(false);
          }
        }
      })
      .catch((err): void => {
        if (!unmounted.current) {
          setIsLoading(false);
          if (err.response.status === 401) {
            localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
            localStorage.setItem(StorageConstants.USER_DATA, '');
            history.push(ROUTE_CONSTANTS.LOGIN);
          }
        }
      });
  }

  if (isLoading) return <TilesLoader />;
  return (
    <FlexRow width="100%" marginTop="21px" justifyContent="space-between">
      <CardWidget
        label="Pnl"
        value={`$ ${tilesList[0]?.tileValue}`}
        icon="pnl-icon"
        alteration={`${tilesList[0]?.tilePercentage}`}
      />
      <CardWidget
        label="Trade Volume"
        value={`$ ${tilesList[1]?.tileValue}`}
        icon="trade-icon"
        alteration={`${tilesList[1]?.tilePercentage}`}
      />
      <CardWidget
        label="Fee"
        value={`$ ${tilesList[2]?.tileValue}`}
        icon="fee-icon"
        alteration={`${tilesList[2]?.tilePercentage}`}
      />
    </FlexRow>
  );
};

export default Tiles;
