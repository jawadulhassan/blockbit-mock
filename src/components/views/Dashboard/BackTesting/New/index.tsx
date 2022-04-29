import React, { useState, FC } from 'react';
import { Label } from 'reactstrap';
// import isEmpty from 'lodash/isEmpty';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import {
  FlexRow,
  BolderText,
  FlexColumn,
  ErrorMessage,
  ScreenWrapper,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import Loader from 'components/widgets/Loader';
import Slider from 'components/widgets/Slider';
import Dropdown from 'components/widgets/Dropdown';
import TextInput from 'components/widgets/TextInput';
import ScreenHeader from 'components/widgets/ScreenHeader';

import BacktestProgress from 'components/modals/BacktestProgress';

import NewGraph from '../NewGraph';

const riskFormatter = (risk: any): any => {
  switch (risk) {
    case 100:
      return 3;
    case 50:
      return 2;
    case 0:
      return 1;
    default:
      return 1;
  }
};

const gridFormatter = (risk: any): any => {
  switch (risk) {
    case 100:
      return 5;
    case 50:
      return 10;
    case 0:
      return 20;
    default:
      return 20;
  }
};

const BackTesting: FC<any> = ({
  userQuota,
  selectedStep,
  setSelectedStep,
}: any): any => {
  const { addToast } = useToasts();
  const { handleSubmit, register, errors } = useForm();

  const [riskValue, setRiskValue] = useState(100);
  const [marketList] = useState(['BTC', 'USDT', 'ETH', 'POL']);
  const [isLoading] = useState(false);
  const [strategyList] = useState(['Grid']);
  const [exchangeList] = useState([
    'Binance',
    'Bitfinix',
    'Houbai',
    'Ethereum',
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDateError, setIsDateError] = useState(false);

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  const toggleModal = (): any => setIsModalOpen(!isModalOpen);
  const handleRisk = (value: any): void => setRiskValue(value);

  const onSubmit = (values: any): void => {
    if (values.startDate > values.endDate) {
      setIsDateError(true);
      return;
    }

    const user = {
      userId: 7,
    };
    const {
      amount,
      market,
      endDate,
      lowBound,
      highBound,
      startDate,
      exchange: selectedExchange,
    } = values;
    const foundMarket = {
      marketID: 4,
      marketType: 'Binance',
      market,
      instrumentsymbolcode: 'BTC',
    };
    const marketID = foundMarket.marketID;
    const marketType = String(foundMarket.marketType);
    const instrumentsymbolcode = foundMarket.instrumentsymbolcode;
    const foundExchange = {
      exchangeID: 4,
      selectedExchange,
    };

    const status = 1;
    const requestID = 0;
    const tradingStrategy = 1;
    const tradeDate = new Date();
    const clientID = user.userId;
    const lastUpdatedTime = new Date();
    const gridCount = gridFormatter(riskValue);
    const riskProfile = riskFormatter(riskValue);
    const exchange = String(foundExchange.exchangeID);

    const requestBody = {
      status,
      endDate,
      marketID,
      clientID,
      exchange,
      startDate,
      tradeDate,
      requestID,
      gridCount,
      marketType,
      riskProfile,
      tradingStrategy,
      lastUpdatedTime,
      instrumentsymbolcode,
      amount: Number(amount),
      lowBound: Number(lowBound),
      highBound: Number(highBound),
    };
    if (userQuota?.availableTests < 1) {
      console.log('requestBody: ', requestBody);
      notificationHandler('You have exhausted your quota.', 'error');
    }
    console.log('requestBody: ', requestBody);
    notificationHandler(
      'Your BackTest has been queued, successfully.',
      'success'
    );
    setSelectedStep(1);
  };

  const date = new Date();
  const dateToday = date.toLocaleDateString().split('/').reverse().join('-');
  date.setMonth(date.getMonth() - 1);
  const dateAMonthAgo = date
    .toLocaleDateString()
    .split('/')
    .reverse()
    .join('-');

  return (
    <ScreenWrapper>
      <ScreenHeader
        withCaret={true}
        header="Backtesting"
        buttonLabel="New Backtesting"
        onClick={(): any => setSelectedStep(2)}
        headingClickHandler={(): any => setSelectedStep(1)}
        subheadingClickHandler={(): any => setSelectedStep(2)}
        subheading={selectedStep === 2 ? 'New BackTest' : null}
      />
      {!!isModalOpen && (
        <BacktestProgress
          open={isModalOpen}
          toggle={toggleModal}
          setSelectedStep={setSelectedStep}
        />
      )}
      {!!isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexColumn marginTop="26px" width="100%" alignItems="center">
          <NewGraph />
          <BolderText marginTop="28px">New Testing</BolderText>
          <FlexRow width="85%" marginTop="30px" justifyContent="space-between">
            <Dropdown
              width="48%"
              name="exchange"
              label="Exchange"
              register={register}
              options={exchangeList}
              value={exchangeList[0]}
            />
            <Dropdown
              width="48%"
              name="strategy"
              label="Strategy"
              register={register}
              options={strategyList}
              value={strategyList[0]}
            />
          </FlexRow>
          <FlexRow width="85%" marginTop="30px" justifyContent="space-between">
            <Dropdown
              width="48%"
              name="market"
              label="Market"
              register={register}
              options={marketList}
              value={marketList[0]}
            />
            <FlexColumn width="48%">
              <TextInput
                width="100%"
                name="amount"
                label="Investment"
                isError={errors.amount}
                placeholder="1000"
                paddingTop="0px"
                register={register({
                  required: true,
                  pattern: {
                    value: /^\d+$/i,
                    message: 'Only digits required.',
                  },
                })}
              />
              {!!errors.amount && (
                <ErrorMessage>{errors.amount.message}</ErrorMessage>
              )}
            </FlexColumn>
          </FlexRow>
          <FlexRow width="85%" marginTop="30px" justifyContent="space-between">
            <Slider
              width="48%"
              sliderMax="High"
              sliderMin="Beginner"
              threeOptions="Medium"
              sliderValue={riskValue}
              label="Risk Threshold"
              handleChange={handleRisk}
            />
            <FlexRow justifyContent="space-between" width="48%">
              <FlexColumn width="48%">
                <Label className="dropdown-label">"Start Date"</Label>
                <TextInput
                  type="date"
                  max={dateToday}
                  name="startDate"
                  min={dateAMonthAgo}
                  onChange={(): void => {
                    if (isDateError) {
                      setIsDateError(false);
                    }
                  }}
                  placeholder={`Start Date`}
                  isError={errors.startDate}
                  register={register({
                    required: true,
                  })}
                />
                {!!isDateError && (
                  <ErrorMessage>
                    Start Date has to be less than End Date
                  </ErrorMessage>
                )}
              </FlexColumn>

              <FlexColumn width="48%">
                <Label className="dropdown-label">"End Date"</Label>
                <TextInput
                  type="date"
                  name="endDate"
                  max={dateToday}
                  min={dateAMonthAgo}
                  onChange={(): void => {
                    if (isDateError) {
                      setIsDateError(false);
                    }
                  }}
                  placeholder={`End Date`}
                  isError={errors.endDate}
                  register={register({
                    required: true,
                  })}
                />
              </FlexColumn>
            </FlexRow>
          </FlexRow>
          <FlexRow
            width="85%"
            marginTop="30px"
            marginBottom="30px"
            justifyContent="space-between"
          >
            <FlexRow justifyContent="space-between" width="48%">
              <FlexColumn width="48%">
                <TextInput
                  width="100%"
                  name="lowBound"
                  label="Low Bound"
                  placeholder="15000"
                  isError={errors.lowBound}
                  register={register({
                    required: true,
                    pattern: {
                      value: /^\d+$/i,
                      message: 'Only digits required.',
                    },
                  })}
                />
                {!!errors.lowBound && (
                  <ErrorMessage>{errors.lowBound.message}</ErrorMessage>
                )}
              </FlexColumn>
              <FlexColumn width="48%">
                <TextInput
                  width="100%"
                  name="highBound"
                  label="High Bound"
                  placeholder="19000"
                  isError={errors.highBound}
                  register={register({
                    required: true,
                    pattern: {
                      value: /^\d+$/i,
                      message: 'Only digits required.',
                    },
                  })}
                />
                {!!errors.highBound && (
                  <ErrorMessage>{errors.highBound.message}</ErrorMessage>
                )}
              </FlexColumn>
            </FlexRow>
            <FlexRow justifyContent="space-between" width="48%" />
          </FlexRow>
          <Button
            type="submit"
            icon="arrow.svg"
            label="Start Backtesting"
            onClick={handleSubmit(onSubmit)}
          />
        </FlexColumn>
      </form>
    </ScreenWrapper>
  );
};

export default BackTesting;
