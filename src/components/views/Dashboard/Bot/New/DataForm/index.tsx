import React, {
  FC,
  useRef,
  useState,
  Fragment,
  useEffect,
  useContext,
} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Label, CustomInput } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import SelectedTabContext from 'shared/contexts/selectedTabContext';
import {
  FlexRow,
  FlexColumn,
  ErrorMessage,
  SecondaryButton,
} from 'shared/commonStyles';
import {
  pairDivider,
  pairValuesGetter,
  getNamesFromList,
  cryptoPairDivider,
  balanceCalculator,
  getSelectedItemIdFromList,
  tradeOrdersGeneratorTable,
} from 'shared/helpers';
import {
  createBotEndpoint,
  addExchangeEndpoint,
  validateKeysEndpoint,
  getAvailableMarketsEndpoint,
  getAvailableStrategiesEndpoint,
  getAvailableExchangesWithStatusEndpoint,
} from 'shared/endPoints';

import BotPermissionModal from 'components/modals/BotPermission';

import Loader from 'components/widgets/Loader';
import Button from 'components/widgets/Button';
import Slider from 'components/widgets/Slider';
import Dropdown from 'components/widgets/Dropdown';
import TextInput from 'components/widgets/TextInput';
import SuccessAlert from 'components/widgets/SuccessAlert';

import {
  StepText,
  StepNumber,
  MainWrapper,
  StepWrapper,
  DashedBorder,
} from './styles';

const BASE_URL = 'https://api.cryptonator.com/api/ticker/';

const experienceFormatter = (stage: any): any => {
  switch (stage) {
    case 100:
      return 'expert';
    case 50:
      return 'intermediate';
    case 0:
      return 'beginner';
    default:
      return 'beginner';
  }
};

const StepHandler: FC<any> = (props: any): any => {
  const {
    botFormData,
    selectedStep,
    setParentStep,
    setBotFormData,
    setSelectedStep,
    setDisplaySuccess,
    setSelectedMarket,
  } = props;
  switch (selectedStep) {
    case 1:
      return (
        <FirstStep
          botFormData={botFormData}
          setBotFormData={setBotFormData}
          setSelectedStep={setSelectedStep}
        />
      );
    case 2:
      return (
        <SecondStep
          botFormData={botFormData}
          setBotFormData={setBotFormData}
          setSelectedStep={setSelectedStep}
          setDisplaySuccess={setDisplaySuccess}
          setSelectedMarket={setSelectedMarket}
        />
      );
    case 3:
      return (
        <ThirdStep
          botFormData={botFormData}
          setParentStep={setParentStep}
          setBotFormData={setBotFormData}
          setSelectedStep={setSelectedStep}
        />
      );
    default:
      return (
        <FirstStep
          botFormData={botFormData}
          setBotFormData={setBotFormData}
          setSelectedStep={setSelectedStep}
        />
      );
  }
};

const DataForm: FC<any> = ({
  setSelectedMarket,
  setSelectedStep: setParentStep,
}: any): any => {
  const [botFormData, setBotFormData] = useState({});
  const [selectedStep, setSelectedStep] = useState(1);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  return (
    <MainWrapper>
      {!!displaySuccess && (
        <SuccessAlert
          setDisplaySuccess={setDisplaySuccess}
          message="Your exchange is successfully added/validated."
        />
      )}
      <DashedBorder />
      <FlexRow justifyContent="space-between" width="125%">
        <FlexColumn alignItems="center">
          <StepWrapper active={selectedStep === 1 || selectedStep > 1}>
            <StepNumber>1</StepNumber>
          </StepWrapper>
          <StepText active={selectedStep === 1 || selectedStep > 1}>
            Connect Exchange
          </StepText>
        </FlexColumn>
        <FlexColumn alignItems="center">
          <StepWrapper active={selectedStep === 2 || selectedStep > 2}>
            <StepNumber>2</StepNumber>
          </StepWrapper>
          <StepText active={selectedStep === 2 || selectedStep > 2}>
            Choose Market
          </StepText>
        </FlexColumn>
        <FlexColumn alignItems="center">
          <StepWrapper active={selectedStep === 3}>
            <StepNumber>3</StepNumber>
          </StepWrapper>
          <StepText active={selectedStep === 3}>Manage Risks</StepText>
        </FlexColumn>
      </FlexRow>
      <StepHandler
        botFormData={botFormData}
        selectedStep={selectedStep}
        setParentStep={setParentStep}
        setBotFormData={setBotFormData}
        setSelectedStep={setSelectedStep}
        setDisplaySuccess={setDisplaySuccess}
        setSelectedMarket={setSelectedMarket}
      />
    </MainWrapper>
  );
};

export default DataForm;

const FirstStep: FC<any> = ({
  botFormData,
  setBotFormData,
  setSelectedStep,
}: any): any => {
  const history = useHistory();
  const unmounted = useRef(false);
  const { addToast } = useToasts();
  const { handleSubmit, register, errors } = useForm();

  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeList, setExchangeList] = useState([]);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [displayKeyFields, setDisplayKeyFields] = useState(false);

  const onTermsToggle = (event) => {
    const { checked } = event.target;
    setTermsAgreed(checked);
  };

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  useEffect((): any => {
    getAvailableExchangeList();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: any): void => {
    const foundExchange = getSelectedItemIdFromList(
      exchangeList,
      values.exchange,
      'description'
    );
    setBotFormData({
      ...botFormData,
      apiKey,
      name: values.name,
      apiSecret: secretKey,
      exchangeID: foundExchange.exchangeID,
    });
    setSelectedStep(2);
  };

  const onExchangeAddition = (values: any): void => {
    const { exchange, apiSecret, apiKey, name } = values;
    setIsLoading(true);
    const foundExchange = getSelectedItemIdFromList(
      exchangeList,
      exchange,
      'description'
    );
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const clientID = user.userId;
    const requestBody = {
      apiKey,
      clientID,
      apiSecret,
      exchangeID: foundExchange.exchangeID,
    };
    apiClient(userToken)
      .post(addExchangeEndpoint, requestBody)
      .then((): void => {
        setIsLoading(false);
        setBotFormData({
          ...botFormData,
          apiKey,
          name: name,
          apiSecret: secretKey,
          exchangeID: foundExchange.exchangeID,
        });
        setSelectedStep(2);
        notificationHandler(
          'Your exchange has been added, successfully.',
          'success'
        );
      })
      .catch((err: any): void => {
        const errorMessage = err.response.data.message;
        setIsLoading(false);
        notificationHandler(errorMessage, 'error');
      });
  };

  async function getAvailableExchangeList(): Promise<any> {
    setIsLoading(true);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const user = !!userData && JSON.parse(userData);
    const clientID = user.userId;
    apiClient(userToken)
      .get(`${getAvailableExchangesWithStatusEndpoint}?id=${clientID}`)
      .then((response: any): any => {
        const list = response?.data?.data?.records;
        if (list) {
          setExchangeList(list);
          if (!list[0].status) {
            setDisplayKeyFields(true);
          }
          if (list[0].status) {
            setDisplayKeyFields(false);
            setApiKey(list[0].apiKey);
            setSecretKey(list[0].apiSecret);
          }
        }
        setIsLoading(false);
      })
      .catch((err: any): any => {
        setIsLoading(false);
        if (err.response.status === 401) {
          localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
          localStorage.setItem(StorageConstants.USER_DATA, '');
          history.push(ROUTE_CONSTANTS.LOGIN);
        }
      });
  }

  const handleExchangeSelection = (event) => {
    const { value } = event.target;
    const foundExchange = getSelectedItemIdFromList(
      exchangeList,
      value,
      'description'
    );
    if (!foundExchange?.status) {
      setApiKey('');
      setSecretKey('');
      setDisplayKeyFields(true);
    }
    if (foundExchange?.status) {
      setDisplayKeyFields(false);
      setApiKey(foundExchange.apiKey);
      setSecretKey(foundExchange.apiSecret);
    }
  };

  const EXCHANGE_LIST = getNamesFromList(exchangeList, 'description');
  return (
    <FlexColumn width="100%" alignItems="center" marginTop="60px">
      {!!isLoading && <Loader />}
      <TextInput
        width="65%"
        name="name"
        placeholder={`Bot Name`}
        isError={errors.name}
        register={register({
          required: true,
        })}
      />
      <Dropdown
        width="65%"
        name="exchange"
        label="Exchange"
        options={EXCHANGE_LIST}
        register={register}
        onChange={(event) => handleExchangeSelection(event)}
      />
      {!!displayKeyFields && (
        <Fragment>
          <TextInput
            width="65%"
            name="apiSecret"
            placeholder={`Security Key`}
            isError={errors.apiSecret}
            onChange={(event) => setSecretKey(event.target.value)}
            register={register({
              required: true,
            })}
          />
          <TextInput
            width="65%"
            name="apiKey"
            placeholder={`API Key`}
            isError={errors.apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            register={register({
              required: true,
            })}
          />
        </Fragment>
      )}

      <div className="d-flex flex-row mt-4 mb-4">
        <CustomInput
          id="cb-3"
          type="checkbox"
          name="term_and_condition"
          onChange={(event) => onTermsToggle(event)}
        />
        <Label
          for="term_and_condition"
          className="checkbox-term"
          style={{ textAlign: 'left' }}
        >
          I authorize <strong>Blockbit</strong> to save keys for next time
          exchange connectivity.
        </Label>
      </div>
      <Button
        label="Next"
        icon="arrow.svg"
        disabled={!termsAgreed}
        onClick={
          !!displayKeyFields
            ? handleSubmit(onExchangeAddition)
            : handleSubmit(onSubmit)
        }
      />
    </FlexColumn>
  );
};

const SecondStep: FC<any> = ({
  botFormData,
  setBotFormData,
  setSelectedStep,
  setDisplaySuccess,
  setSelectedMarket,
}: any): any => {
  const { addToast } = useToasts();
  const { handleSubmit, register } = useForm();

  const [marketList, setMarketList] = useState([]);
  const [strategyList, setStrategyList] = useState([]);
  const [marketWallets, setMarketWallets] = useState([]);
  const [experienceValue, setExperienceValue] = useState(100);

  const handleExperience = (value: any): void => setExperienceValue(value);

  useEffect((): void => {
    validatingKeysFunc();
    getAvailableMarketList(botFormData?.exchangeID);
    getAvailableStrategyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  const validatingKeysFunc = (): void => {
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const clientID = user.userId;
    const requestBody = {
      clientID,
      apiKey: botFormData?.apiKey,
      apiSecret: botFormData?.apiSecret,
      exchangeID: botFormData.exchangeID,
    };
    apiClient(userToken)
      .post(validateKeysEndpoint, requestBody)
      .then((response: any): void => {
        const wallets = response?.data?.data?.wallets;
        setMarketWallets(wallets);
        notificationHandler(
          'Your exchange has been validated, successfully.',
          'success'
        );
        setDisplaySuccess(true);
      })
      .catch((err: any): void => {
        const errorMessage = err.response.data.message;
        notificationHandler(errorMessage, 'error');
      });
  };

  const onSubmit = (values: any): void => {
    const foundMarket = getSelectedItemIdFromList(
      marketList,
      values.marketID,
      'instrumentsymbolcode'
    );
    let { first, second } = pairDivider(foundMarket.instrumentsymbolcode);
    let {
      firstMarketTotalBalance,
      secondMarketTotalBalance,
    } = pairValuesGetter(first, second, marketWallets);

    const foundStrategy = getSelectedItemIdFromList(
      strategyList,
      values.strategyID,
      'name'
    );
    const tradingExperience = experienceFormatter(experienceValue);
    setBotFormData({
      ...botFormData,
      ...values,
      tradingExperience,
      firstMarketTotalBalance,
      secondMarketTotalBalance,
      marketID: foundMarket.marketID,
      strategyID: foundStrategy.tradingStrategyID,
      marketSymbol: foundMarket.instrumentsymbolcode,
    });
    setSelectedStep(3);
    setDisplaySuccess(false);
  };

  async function getAvailableMarketList(exchangeId: any): Promise<any> {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const response = await apiClient(userToken).get(
      `${getAvailableMarketsEndpoint}?id=${exchangeId}`
    );
    const list = !!response && response?.data?.data?.records;
    if (list) {
      setMarketList(list);
    }
  }

  async function getAvailableStrategyList(): Promise<any> {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const response = await apiClient(userToken).get(
      getAvailableStrategiesEndpoint
    );
    const list = !!response && response?.data?.data?.records;
    if (list) {
      setStrategyList(list);
    }
  }

  const MARKET_LIST = getNamesFromList(marketList, 'instrumentsymbolcode');
  const STRATEGY_LIST = getNamesFromList(strategyList, 'name');
  return (
    <FlexColumn width="100%" alignItems="center" marginTop="60px">
      <Dropdown
        width="65%"
        label="Market"
        name="marketID"
        options={MARKET_LIST}
        register={register}
        onChange={(event) => {
          setSelectedMarket(event.target.value);
        }}
      />
      <Slider
        width="65%"
        sliderMax="Expert"
        sliderMin="Beginner"
        label="Trading Experience"
        threeOptions="Intermediate"
        sliderValue={experienceValue}
        handleChange={handleExperience}
      />
      <Dropdown
        width="65%"
        label="Strategy"
        name="strategyID"
        options={STRATEGY_LIST}
        register={register}
      />
      <Button
        label="Next"
        marginTop="32px"
        icon="arrow.svg"
        onClick={handleSubmit(onSubmit)}
      />
    </FlexColumn>
  );
};

const ThirdStep: FC<any> = ({ botFormData, setParentStep }: any): any => {
  let tabContext: any = {};
  const { addToast } = useToasts();
  tabContext = useContext(SelectedTabContext);
  const { handleSubmit, register, errors } = useForm();

  const [isError, setIsError] = useState(false);
  const [riskValue, setRiskValue] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [investmentValue, setInvestmentValue] = useState(60);
  const [isAskingPermission, setIsAskingPermission] = useState(false);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [recurringValues, setRecurringValues] = useState({
    numberOfGrids: 0,
    gridRiskProfileBoundLow: 0,
    gridRiskProfileBoundHigh: 0,
  });

  const handleRisk = (value: any): void => setRiskValue(value);
  const handleInvestment = (value: any): void => setInvestmentValue(value);
  const togglePermissionModal = (): void =>
    setOpenPermissionModal(!openPermissionModal);

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  async function handlePostOrder(values: any): Promise<any> {
    const {
      numberOfGrids,
      gridRiskProfileBoundLow,
      gridRiskProfileBoundHigh,
    } = values;
    const {
      name,
      marketID,
      exchangeID,
      marketSymbol,
      firstMarketTotalBalance,
      secondMarketTotalBalance,
    } = botFormData;
    const modifiedMarket = cryptoPairDivider(botFormData.marketSymbol);
    const tickerPrice = await startUpdatingData(modifiedMarket);
    let totalInvestmentBalance = await balanceCalculator(
      firstMarketTotalBalance,
      secondMarketTotalBalance,
      tickerPrice.ticker.price,
      investmentValue
    );
    let { calculatedGridValue } = tradeOrdersGeneratorTable({
      totalInvestmentBalance,
      numberOfGrids: Number(numberOfGrids),
      tickerPrice: Number(tickerPrice.ticker.price),
      lowerThreshold: Number(gridRiskProfileBoundLow),
      higherThreshold: Number(gridRiskProfileBoundHigh),
    });

    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const clientId = user.userId;
    const botObj = {
      clientId,
      Name: name,
      accountId: null,
      marketId: marketID,
      market: marketSymbol,
      riskProfile: riskValue,
      exchangeId: exchangeID,
      algoTradingPlanId: null,
      externalUserId: clientId,
      grid: calculatedGridValue,
      userPermissionGranted: false,
      investment: totalInvestmentBalance,
      numberOfGrids: Number(numberOfGrids),
      tradeWallet: firstMarketTotalBalance,
      currencyWallet: secondMarketTotalBalance,
      ticker: Number(tickerPrice.ticker.price),
      investmentPercentage: Number(investmentValue),
      gridRiskProfileBoundLow: Number(gridRiskProfileBoundLow),
      gridRiskProfileBoundHigh: Number(gridRiskProfileBoundHigh),
    };

    setIsSubmitting(true);
    apiClient(userToken)
      .post(createBotEndpoint, botObj)
      .then((): void => {
        notificationHandler('Bot has been created, successfully', 'success');
        setParentStep(1);
        setIsSubmitting(false);
      })
      .catch((err: any): void => {
        setIsSubmitting(false);
        if (err.response.status === 412) {
          setRecurringValues({
            numberOfGrids,
            gridRiskProfileBoundLow,
            gridRiskProfileBoundHigh,
          });
          togglePermissionModal();
          return;
        }
        const errorMessage = err.response.data.message;
        notificationHandler(errorMessage, 'error');
        setIsError(errorMessage);
      });
  }

  async function handlePostPermissionedOrder() {
    setIsAskingPermission(true);
    const {
      numberOfGrids,
      gridRiskProfileBoundLow,
      gridRiskProfileBoundHigh,
    } = recurringValues;
    const {
      name,
      marketID,
      exchangeID,
      marketSymbol,
      firstMarketTotalBalance,
      secondMarketTotalBalance,
    } = botFormData;
    const modifiedMarket = cryptoPairDivider(botFormData.marketSymbol);
    const tickerPrice = await startUpdatingData(modifiedMarket);
    let totalInvestmentBalance = await balanceCalculator(
      firstMarketTotalBalance,
      secondMarketTotalBalance,
      tickerPrice.ticker.price,
      investmentValue
    );
    let { calculatedGridValue } = tradeOrdersGeneratorTable({
      totalInvestmentBalance,
      numberOfGrids: Number(numberOfGrids),
      tickerPrice: Number(tickerPrice.ticker.price),
      lowerThreshold: Number(gridRiskProfileBoundLow),
      higherThreshold: Number(gridRiskProfileBoundHigh),
    });

    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const clientId = user.userId;
    const botObj = {
      clientId,
      Name: name,
      accountId: null,
      marketId: marketID,
      market: marketSymbol,
      riskProfile: riskValue,
      exchangeId: exchangeID,
      algoTradingPlanId: null,
      externalUserId: clientId,
      grid: calculatedGridValue,
      userPermissionGranted: true,
      investment: totalInvestmentBalance,
      numberOfGrids: Number(numberOfGrids),
      tradeWallet: firstMarketTotalBalance,
      currencyWallet: secondMarketTotalBalance,
      ticker: Number(tickerPrice.ticker.price),
      investmentPercentage: Number(investmentValue),
      gridRiskProfileBoundLow: Number(gridRiskProfileBoundLow),
      gridRiskProfileBoundHigh: Number(gridRiskProfileBoundHigh),
    };

    apiClient(userToken)
      .post(createBotEndpoint, botObj)
      .then((): void => {
        notificationHandler('Bot has been created, successfully', 'success');
        setParentStep(1);
        setIsAskingPermission(false);
        togglePermissionModal();
      })
      .catch((err: any): void => {
        setIsAskingPermission(false);
        if (err.response.status === 406) {
          notificationHandler(
            'You do not have enough balance to create bot.',
            'error'
          );
          togglePermissionModal();
          return;
        }
        const errorMessage = err.response.data.message;
        notificationHandler(errorMessage, 'error');
        setIsError(errorMessage);
      });
  }

  async function startUpdatingData(market: any): Promise<any> {
    const response = await fetch(BASE_URL + market, {
      mode: 'cors',
    });

    const parsedResponse = response.json();
    return parsedResponse;
  }

  return (
    <Fragment>
      {!!openPermissionModal && (
        <BotPermissionModal
          open={openPermissionModal}
          toggle={togglePermissionModal}
          isSubmitting={isAskingPermission}
          market={botFormData?.marketSymbol}
          onClick={() => handlePostPermissionedOrder()}
        />
      )}
      <FlexColumn width="100%" alignItems="center" marginTop="60px">
        {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
        <Slider
          width="65%"
          sliderMax="High"
          sliderMin="Beginner"
          threeOptions="Medium"
          sliderValue={riskValue}
          label="Risk Threshold"
          handleChange={handleRisk}
        />
        <FlexRow justifyContent="space-between" width="65%">
          <TextInput
            width="48%"
            name="gridRiskProfileBoundLow"
            placeholder={`Min. Price (USDT)`}
            isError={errors.gridRiskProfileBoundLow}
            register={register({
              required: true,
            })}
          />
          <TextInput
            width="48%"
            name="gridRiskProfileBoundHigh"
            placeholder={`Max Price (USDT)`}
            isError={errors.gridRiskProfileBoundHigh}
            register={register({
              required: true,
            })}
          />
        </FlexRow>
        <Slider
          width="65%"
          sliderMin="2%"
          sliderMax="95%"
          label="Investment (USDT)"
          sliderValue={investmentValue}
          handleChange={handleInvestment}
          sliderPercentage={investmentValue}
        />
        <FlexRow justifyContent="space-between" width="65%">
          <TextInput
            min={0}
            max={20}
            width="48%"
            type="number"
            defaultValue={10}
            name="numberOfGrids"
            placeholder={`Number of Grids`}
            isError={errors.numberOfGrids}
            register={register({
              required: true,
            })}
          />
        </FlexRow>
        <FlexRow justifyContent="space-between" width="230px">
          <SecondaryButton
            marginTop="15px"
            disabled={isSubmitting}
            onClick={() => tabContext.setSelectedTab('backtesting')}
          >
            Back Test
          </SecondaryButton>
          <Button
            label="Create"
            marginTop="15px"
            icon="arrow.svg"
            disabled={isSubmitting}
            onClick={handleSubmit(handlePostOrder)}
          />
        </FlexRow>
      </FlexColumn>
    </Fragment>
  );
};
