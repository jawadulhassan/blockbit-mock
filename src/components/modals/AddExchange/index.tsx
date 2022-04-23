import React, { useState, FC, useEffect, Fragment } from 'react';
import Zoom from 'react-reveal/Zoom';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Label, CustomInput } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { MainHeader, ErrorMessage } from 'shared/commonStyles';
import StorageConstants from 'shared/constants/StorageConstants';
import { getNamesFromList, getSelectedItemIdFromList } from 'shared/helpers';
import {
  addExchangeEndpoint,
  getAvailableExchangesEndpoint,
} from 'shared/endPoints';

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
  const history = useHistory();
  const { addToast } = useToasts();
  const { handleSubmit, register, errors } = useForm();

  const [isError, setIsError] = useState(false);
  const [exchangeList, setExchangeList] = useState([]);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onTermsToggle = (event) => {
    const { checked } = event.target;
    setTermsAgreed(checked);
  };

  useEffect((): void => {
    getAvailableExchangeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  const onSubmit = (values: any): void => {
    const { exchange, apiSecret, apiKey } = values;
    setIsSubmitting(true);
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
        setIsSubmitting(false);
        notificationHandler(
          'Your exchange has been added, successfully.',
          'success'
        );
        setIsSuccess(true);
      })
      .catch((err: any): void => {
        const errorMessage = err.response.data.message;
        setIsError(errorMessage);
        setIsSubmitting(false);
        notificationHandler(errorMessage, 'error');
      });
  };

  async function getAvailableExchangeList(): Promise<any> {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .get(getAvailableExchangesEndpoint)
      .then((response: any): any => {
        const list = response?.data?.data?.records;
        if (list) {
          setExchangeList(list);
        }
      })
      .catch((err: any): any => {
        if (err.response.status === 401) {
          localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
          localStorage.setItem(StorageConstants.USER_DATA, '');
          history.push(ROUTE_CONSTANTS.LOGIN);
        }
      });
  }

  const EXCHANGE_LIST = getNamesFromList(exchangeList, 'description');
  return (
    <Fragment>
      <MainHeader>Add Exchange</MainHeader>
      <div className="modal-body-wrapper">
        {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
        <Dropdown
          name="exchange"
          label="Exchange"
          options={EXCHANGE_LIST}
          register={register}
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
