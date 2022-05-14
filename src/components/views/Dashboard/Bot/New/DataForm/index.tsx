import React, { FC, useState, Fragment, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Label, CustomInput } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

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
  getSelectedItemIdFromList,
} from 'shared/helpers';

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
  const { addToast } = useToasts();
  const { handleSubmit, register, errors } = useForm();

  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isLoading] = useState(false);
  const [exchangeList] = useState([
    'Binance',
    'Bitfinix',
    'Houbai',
    'Ethereum',
  ]);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [displayKeyFields] = useState(false);

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

  const onSubmit = (values: any): void => {
    const { exchange: selectedExchange } = values;
    const foundExchange = {
      exchangeID: 4,
      selectedExchange,
    };
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
    const foundExchange = {
      exchangeList,
      exchange,
    };

    const clientID = 1;
    const requestBody = {
      apiKey,
      clientID,
      apiSecret,
      exchangeID: foundExchange.exchange,
    };

    console.log('onExchangeAddition: ', name, requestBody);

    notificationHandler(
      'Your exchange has been added, successfully.',
      'success'
    );
  };

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
        register={register}
        options={exchangeList}
        value={exchangeList[0]}
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

  const [marketList] = useState(['BTC', 'USDT', 'ETH', 'POL']);
  const [strategyList] = useState(['Grid']);
  const [marketWallets] = useState([]);
  const [experienceValue, setExperienceValue] = useState(100);

  const handleExperience = (value: any): void => setExperienceValue(value);

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  const onSubmit = (values: any): void => {
    const foundMarket = {
      marketID: 4,
      marketType: 'Binance',
      instrumentsymbolcode: 'BTC',
    };

    let { first, second } = pairDivider(foundMarket.instrumentsymbolcode);
    let { firstMarketTotalBalance, secondMarketTotalBalance } =
      pairValuesGetter(first, second, marketWallets);

    const foundStrategy = {
      tradingStrategyID: 'Grid',
    };
    getSelectedItemIdFromList(strategyList, values.strategyID, 'name');
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
    notificationHandler(
      'Your exchange has been validated, successfully.',
      'success'
    );
  };

  return (
    <FlexColumn width="100%" alignItems="center" marginTop="60px">
      <Dropdown
        width="65%"
        label="Market"
        name="marketID"
        register={register}
        options={marketList}
        value={marketList[0]}
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
        register={register}
        options={strategyList}
        value={strategyList[0]}
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

  const [isError] = useState(false);
  const [riskValue, setRiskValue] = useState(100);
  const [isSubmitting] = useState(false);
  const [investmentValue, setInvestmentValue] = useState(60);
  const [isAskingPermission, setIsAskingPermission] = useState(false);
  const [openPermissionModal, setOpenPermissionModal] = useState(false);

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
    console.log('handlePostOrder: ', values);
    notificationHandler(
      'Your bot has been validated, successfully.',
      'success'
    );
    setParentStep(1);
  }

  async function handlePostPermissionedOrder() {
    setIsAskingPermission(true);

    notificationHandler(
      'Your bot has been validated, successfully.',
      'success'
    );
    setParentStep(1);
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
