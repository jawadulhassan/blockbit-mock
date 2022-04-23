import React, { FC, useState } from 'react';

import { Divider, FlexRow, LightText, BolderText } from 'shared/commonStyles';

import { MainWrapper, IconWrapper, FilterWrapper } from './styles';

let filterDefault = {
  assets: false,
  status: false,
  market: false,
  profitLoss: false,
  exchangeName: false,
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
    if (filterList?.profitLoss) {
      setSelectedFilter({ filter: 'profitLoss', value });
    }
    if (filterList?.assets) {
      setSelectedFilter({ filter: 'assets', value });
    }
    if (filterList?.status) {
      setSelectedFilter({ filter: 'status', value });
    }
    if (filterList?.exchangeName) {
      setSelectedFilter({ filter: 'exchangeName', value });
    }
    if (filterList?.market) {
      setSelectedFilter({ filter: 'markets', value });
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
                type="checkbox"
                id="exchangeName"
                name="exchangeName"
                checked={filterList?.exchangeName}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    exchangeName: event.target.checked,
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
                id="assets"
                name="assets"
                type="checkbox"
                checked={filterList?.assets}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    assets: event.target.checked,
                  })
                }
              />
              <LightText
                fontSize="10px"
                marginLeft="8px"
                fontWeight="normal"
                lineHeight="107.18%"
              >
                Assets
              </LightText>
            </FlexRow>
          </FlexRow>
          <FlexRow marginBottom="12px">
            <FlexRow alignItems="center" width="50%">
              <input
                id="profitLoss"
                name="profitLoss"
                type="checkbox"
                checked={filterList?.profitLoss}
                style={{ height: 10, width: 10 }}
                onChange={(event: any): void =>
                  setFilterList({
                    ...filterDefault,
                    profitLoss: event.target.checked,
                  })
                }
              />
              <LightText
                fontSize="10px"
                marginLeft="8px"
                fontWeight="normal"
                lineHeight="107.18%"
              >
                Profit/Loss
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
        </FilterWrapper>
      )}
    </MainWrapper>
  );
};

export default SearchBox;
