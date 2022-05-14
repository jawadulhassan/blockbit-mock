import React, { useState, FC, Fragment } from 'react';
import Zoom from 'react-reveal/Zoom';
import { useForm } from 'react-hook-form';
import { Label, CustomInput } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { MainHeader, ErrorMessage } from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import Dropdown from 'components/widgets/Dropdown';
import TextInput from 'components/widgets/TextInput';

const AddExchange: FC<any> = ({
  open,
  toggle,
  getAddedExchangeList,
}: any): any => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Modal isOpen={open} centered={true}>
      <ModalHeader
        className="border-less"
        onClick={(): any => {
          toggle();
          getAddedExchangeList();
        }}
      />
      <ModalBody>
        {!isSuccess ? (
          <EnterCredentials setIsSuccess={setIsSuccess} />
        ) : (
          <Thanking
            toggle={toggle}
            setIsSuccess={setIsSuccess}
            getAddedExchangeList={getAddedExchangeList}
          />
        )}
      </ModalBody>
    </Modal>
  );
};

export default AddExchange;

const Thanking: FC<any> = ({
  toggle,
  setIsSuccess,
  getAddedExchangeList,
}: any): any => {
  return (
    <Zoom>
      <div className="modal-body-wrapper">
        <img
          src="/static/svgs/tick.svg"
          alt="icon-successful"
          className="p-2"
        />
        Your exchange has been successfully added.
        <Button
          marginTop="15px"
          onClick={(): any => {
            setIsSuccess(false);
            toggle();
            getAddedExchangeList();
          }}
          label="Ok"
        />
      </div>
    </Zoom>
  );
};

const EnterCredentials: FC<any> = ({ setIsSuccess }: any): any => {
  const { addToast } = useToasts();
  const { handleSubmit, register, errors } = useForm();

  const [isError] = useState(false);
  const [exchangeList] = useState([
    'Binance',
    'Bitfinix',
    'Houbai',
    'Ethereum',
  ]);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isSubmitting] = useState(false);

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
    const { exchange, apiSecret, apiKey } = values;

    const requestBody = {
      apiKey,
      apiSecret,
      exchangeID: exchange,
    };

    console.log('onSubmit: ', requestBody);
    notificationHandler(
      'Your exchange has been added, successfully.',
      'success'
    );
    setIsSuccess(true);
  };

  return (
    <Fragment>
      <MainHeader>Add Exchange</MainHeader>
      <div className="modal-body-wrapper">
        {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
        <Dropdown
          name="exchange"
          label="Exchange"
          register={register}
          options={exchangeList}
          value={exchangeList[0]}
        />
        <TextInput
          name="apiSecret"
          placeholder={`Security Key`}
          isError={errors.apiSecret}
          register={register({
            required: true,
          })}
        />
        <TextInput
          name="apiKey"
          placeholder={`API Key`}
          isError={errors.apiKey}
          register={register({
            required: true,
          })}
        />
        <div className="d-flex flex-row mt-3">
          <CustomInput
            name="term_and_condition"
            type="checkbox"
            id="cb-3"
            onChange={(event) => onTermsToggle(event)}
          />
          <Label
            for="term_and_condition"
            className="checkbox-term"
            style={{ textAlign: 'left' }}
          >
            I agree to the <strong>Blockbit</strong> to save keys for next time
            exchange connectivity.
          </Label>
        </div>
        <Button
          marginTop="15px"
          icon="arrow.svg"
          onClick={handleSubmit(onSubmit)}
          disabled={!termsAgreed || isSubmitting}
          label={`${isSubmitting ? 'Adding...' : 'Add'}`}
        />
      </div>
    </Fragment>
  );
};
