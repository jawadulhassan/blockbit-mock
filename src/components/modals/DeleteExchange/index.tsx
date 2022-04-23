import React, { FC, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { apiClient } from 'shared/services/api';
import { deleteExchangeEndpoint } from 'shared/endPoints';
import { SecondaryButton, FlexRow } from 'shared/commonStyles';
import StorageConstants from 'shared/constants/StorageConstants';

import Button from 'components/widgets/Button';

const DeleteExchange: FC<any> = ({
  open,
  toggle,
  exchangeId,
  getAddedExchangeList,
}: any): any => {
  const { addToast } = useToasts();

  const [isLoading, setIsLoading] = useState(false);

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  function handlerDeletion() {
    setIsLoading(true);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .delete(`${deleteExchangeEndpoint}?id=${exchangeId}`)
      .then((response: any): void => {
        getAddedExchangeList().then(() => {
          setIsLoading(false);
          notificationHandler(response?.data?.data, 'success');
          toggle();
        });
      })
      .catch((err: any): void => {
        const errorMessage = err?.response?.data?.message;
        setIsLoading(false);
        notificationHandler(errorMessage, 'error');
      });
  }
  return (
    <Modal isOpen={open} centered={true}>
      <ModalHeader className="border-less" toggle={(): void => toggle()} />
      <ModalBody>
        <div className="modal-body-wrapper">
          <img
            src="/static/svgs/delete-large.svg"
            alt="icon-delete"
            className="p-2"
          />
          <div className="small-text mt-2 mb-2">
            Are you sure you want to remove Exchange?
          </div>
          <FlexRow>
            <SecondaryButton
              marginTop="15px"
              marginRight="15px"
              onClick={(): any => toggle()}
            >
              Cancel
            </SecondaryButton>
            <Button
              label="Delete"
              type="submit"
              marginTop="15px"
              disabled={isLoading}
              onClick={() => handlerDeletion()}
            />
          </FlexRow>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteExchange;
