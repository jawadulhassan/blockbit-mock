import React, { FC } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import Button from 'components/widgets/Button';
import { LightText, BolderText, FlexedCentered } from 'shared/commonStyles';

const WelcomeModal: FC<any> = ({ open, toggle, onClick }: any): any => {
  return (
    <Modal isOpen={open} centered={true} size="lg">
      <ModalHeader className="border-less" toggle={(): void => toggle()} />
      <ModalBody className="p-5">
        <FlexedCentered>
          <BolderText className="m-3" fontSize="28px" lineHeight="35px">
            Welcome!
          </BolderText>
          <LightText fontSize="18px" lineHeight="25px">
            We are going to create a bot for trading.
          </LightText>
          <img
            alt="bot"
            className="mb-5 mt-3"
            src="/static/svgs/colorful-bot.svg"
          />
          <Button
            label="Create"
            icon="arrow.svg"
            marginTop="15px"
            onClick={onClick}
          />
        </FlexedCentered>
      </ModalBody>
    </Modal>
  );
};

export default WelcomeModal;
