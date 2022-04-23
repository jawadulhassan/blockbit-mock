import React, { FC, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { getUserBotInfoEndpoint } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';
import {
  FlexRow,
  BolderText,
  FlexColumn,
  BorderedBottom,
} from 'shared/commonStyles';

import RingStep from 'components/widgets/RingStep';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

import { ComponentBox } from '../styles';

interface IProject {
  tileName: string;
  tileValue: number;
}

const BotsStatus: FC<{}> = () => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [tilesList, setTilesList] = useState<IProject[] | []>([
    {
      tileName: '',
      tileValue: 0,
    },
    {
      tileName: '',
      tileValue: 0,
    },
    {
      tileName: '',
      tileValue: 0,
    },
    {
      tileName: '',
      tileValue: 0,
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
      .get(`${getUserBotInfoEndpoint}?id=${user.userId}`)
      .then((response): void => {
        if (!unmounted.current) {
          const list = response?.data?.data?.records;
          if (list) {
            setTilesList(list);
          }
          setIsLoading(false);
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

  if (isLoading) return <FullPageLoader />;
  return (
    <ComponentBox height="331px">
      <BorderedBottom>
        <FlexRow justifyContent="space-between" alignItems="center">
          <BolderText fontSize="20px" lineHeight="27px">
            Bots
          </BolderText>
        </FlexRow>
      </BorderedBottom>
      <FlexRow
        width="100%"
        marginTop="15px"
        marginBottom="10px"
        alignItems="center"
        justifyContent="space-around"
      >
        <FlexColumn alignItems="center">
          <img alt="bot" className="mb-2" src="/static/svgs/colorful-bot.svg" />
        </FlexColumn>
        <RingStep
          label="Active"
          color="#1CE0E2"
          progress={tilesList[0].tileValue}
        />
        <RingStep
          label="Stop"
          color="#61D7F8"
          progress={tilesList[1].tileValue}
        />
        <RingStep
          color="#429DDB"
          label="Open Trade"
          progress={tilesList[2].tileValue}
        />
        <RingStep
          color="#294077"
          label="Closed Trade"
          progress={tilesList[3].tileValue}
        />
      </FlexRow>
    </ComponentBox>
  );
};

export default BotsStatus;
