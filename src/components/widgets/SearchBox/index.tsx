import React, { FC, useState } from 'react';

import {
  Divider,
  FlexRow,
  LightText,
  BolderText,
  HorizontalDivider,
} from 'shared/commonStyles';

import DateInput from '../../../components/widgets/DateInput';

import { MainWrapper, IconWrapper, FilterWrapper } from './styles';

let filterDefault = {
  risk: false,
  market: false,
  status: false,
  exchange: false,
  strategy: false,
  threshold: false,
};

const SearchBox: FC<any> = ({
  width,
  handleSearch,
  setSelectedFilter = null,
}: any): any => {
  // const [endDate, setEndDate] = useState('');
  // const [startDate, setStartDate] = useState('');
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [filterList, setFilterList] = useState(filterDefault);

  const handleInput = (value) => {
    if (filterList?.risk) {
      setSelectedFilter({ filter: 'risk', value });
    }
    if (filterList?.market) {
      setSelectedFilter({ filter: 'market_name', value });
    }
    if (filterList?.status) {
      setSelectedFilter({ filter: 'status', value });
    }
    if (filterList?.exchange) {
      setSelectedFilter({ filter: 'exchange', value });
    }
    if (filterList?.strategy) {
      setSelectedFilter({ filter: 'strategy', value });
    }
    if (filterList?.threshold) {
      setSelectedFilter({ filter: 'threshold', value });
    }
  };

  const handleDateInput = (event) => {
    const { value, name } = event.target;
    if (name === 'startDate') {
      setSelectedFilter({ filter: 'startDate', value: `${value}T00:00:00` });
    }
    if (name === 'endDate') {
      setSelectedFilter({ filter: 'endDate', value: `${value}T00:00:00` });
    }
  };

  return (
    <MainWrapper width={width}>
      <input
        type="text"
        onChange={(event) => handleInput(event.target.value)}
        placeholder="Search"
        className="border-less"
        style={{ width: '60%' }}
      />
      <IconWrapper>
        <Divider />
        <img
          alt="filter"
          className="pointer"
          src="/static/svgs/filter.svg"
          onClick={(): void => setShowFilterBox(!showFilterBox)}
        />
        <Divider />
        <img
          alt="search"
          className="pointer"
          src="/static/svgs/search.svg"
          onClick={(): void => handleSearch()}
        />
      </IconWrapper>
      {!!showFilterBox && (
        <FilterWrapper>
          <FlexRow justifyContent="space-between" marginBottom="9px">
            <BolderText
              fontWeight="bold"
              fontSize="10px"
              color="#506390"
              lineHeight="107.18%"
            >
              Filter By:
            </BolderText>
            <LightText
              fontWeight="normal"
              fontSize="10px"
              lineHeight="107.18%"
              cursor={true}
              onClick={() => {
                setFilterList(filterDefault);
                setSelectedFilter({ filter: '', value: '' });
                handleSearch();
              }}
            >
              Clear
            </LightText>
          </FlexRow>
          <FlexRow marginBottom="12px">
            <FlexRow alignItems="center" width="50%">
              <input
                id="exchange"
                name="exchange"
                type="checkbox"
                checked={filterList?.exchange}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    exchange: event.target.checked,
                  })
                }
              />
              <LightText
                fontSize="10px"
                marginLeft="8px"
                fontWeight="normal"
                lineHeight="107.18%"
              >
                Exchange
              </LightText>
            </FlexRow>
            <FlexRow alignItems="center" width="50%">
              <input
                id="market"
                name="market"
                type="checkbox"
                checked={filterList?.market}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    market: event.target.checked,
                  })
                }
              />
              <LightText
                fontSize="10px"
                marginLeft="8px"
                fontWeight="normal"
                lineHeight="107.18%"
              >
                Market
              </LightText>
            </FlexRow>
          </FlexRow>
          <FlexRow marginBottom="12px">
            <FlexRow alignItems="center" width="50%">
              <input
                id="risk"
                name="risk"
                type="checkbox"
                checked={filterList?.risk}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    risk: event.target.checked,
                  })
                }
              />
              <LightText
                fontSize="10px"
                marginLeft="8px"
                fontWeight="normal"
                lineHeight="107.18%"
              >
                Risk
              </LightText>
            </FlexRow>
            <FlexRow alignItems="center" width="50%">
              <input
                id="threshold"
                name="threshold"
                type="checkbox"
                checked={filterList?.threshold}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    threshold: event.target.checked,
                  })
                }
              />
              <LightText
                fontSize="10px"
                marginLeft="8px"
                fontWeight="normal"
                lineHeight="107.18%"
              >
                Threshold
              </LightText>
            </FlexRow>
          </FlexRow>
          <FlexRow marginBottom="12px">
            <FlexRow alignItems="center" width="50%">
              <input
                id="strategy"
                name="strategy"
                type="checkbox"
                checked={filterList?.strategy}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    strategy: event.target.checked,
                  })
                }
              />
              <LightText
                fontSize="10px"
                marginLeft="8px"
                fontWeight="normal"
                lineHeight="107.18%"
              >
                Strategy
              </LightText>
            </FlexRow>
            <FlexRow alignItems="center" width="50%">
              <input
                id="status"
                name="status"
                type="checkbox"
                checked={filterList?.status}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    status: event.target.checked,
                  })
                }
              />
              <LightText
                fontSize="10px"
                marginLeft="8px"
                fontWeight="normal"
                lineHeight="107.18%"
              >
                Status
              </LightText>
            </FlexRow>
          </FlexRow>
          <HorizontalDivider marginBottom="8px" />
          <DateInput
            type="text"
            name="startDate"
            placeholder={`Start Date`}
            onChange={(event) => handleDateInput(event)}
          />
          <DateInput
            type="text"
            name="endDate"
            placeholder={`End Date`}
            onChange={(event) => handleDateInput(event)}
          />
        </FilterWrapper>
      )}
    </MainWrapper>
  );
};

export default SearchBox;
