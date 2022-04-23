import React, { FC, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { apiClient } from 'shared/services/api';
import { deleteBotEndpoint } from 'shared/endPoints';
import { SecondaryButton, FlexRow } from 'shared/commonStyles';
import StorageConstants from 'shared/constants/StorageConstants';

import Button from 'components/widgets/Button';

const DeleteBot: FC<any> = ({
  open,
  botId,
  toggle,
  getAddedBotList,
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
      .delete(`${deleteBotEndpoint}?AlgoTradingPlanID=${botId}`)
      .then(
        async (response: any): Promise<any> => {
          await getAddedBotList().then(() => {
            setIsLoading(false);
            notificationHandler(response?.data?.data, 'success');
            toggle();
          });
        }
      )
      .catch((err: any): void => {
        const errorMessage = err?.response?.data?.message;
        setIsLoading(false);
        notificationHandler(
          !!errorMessage ? errorMessage : 'Server Error',
          'error'
        );
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
            Are you sure you want to delete?
          </div>
          <FlexRow>
            <SecondaryButton
              marginTop="15px"
              disabled={isLoading}
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

export default DeleteBot;
