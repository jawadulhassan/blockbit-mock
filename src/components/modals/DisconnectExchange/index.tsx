import React, { FC } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import Button from 'components/widgets/Button';
import { SecondaryButton, FlexRow } from 'shared/commonStyles';

const DisconnectExchange: FC<any> = ({ open, toggle }: any): any => {
  return (
    <Modal isOpen={open} centered={true}>
      <ModalHeader className="border-less" toggle={(): void => toggle()} />
      <ModalBody>
        <div className="modal-body-wrapper">
          <img src="/static/svgs/bot-icon.svg" alt="icon-bot" className="p-2" />
          <div className="small-text mt-2 mb-2">
            You need to stop a bot first then you can remove this exchange.
          </div>
          <FlexRow>
            <SecondaryButton marginTop="15px" onClick={(): any => toggle()}>
              Cancel
            </SecondaryButton>
            <Button
              marginTop="15px"
              label="Go to BOT"
              onClick={(): any => toggle()}
            />
          </FlexRow>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DisconnectExchange;
