import React, { FC } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import Button from 'components/widgets/Button';
import {
  FlexRow,
  LightText,
  FlexedCentered,
  SecondaryButton,
} from 'shared/commonStyles';

const BotPermissionModal: FC<any> = ({
  open,
  toggle,
  market,
  onClick,
  isSubmitting,
}: any): any => {
  return (
    <Modal isOpen={open} centered={true} size="md">
      <ModalHeader className="border-less" toggle={(): void => toggle()} />
      <ModalBody className="p-5">
        <FlexedCentered>
          <LightText>
            {`Your balance for ${market} is lower than bot
						creation amount. We will like to purchase more of required currency for the
						placement of order. Do you want to proceed with it?`}
          </LightText>
          <FlexRow marginTop="40px">
            <SecondaryButton
              marginTop="15px"
              marginRight="15px"
              disabled={isSubmitting}
              onClick={(): any => toggle()}
              opacity={isSubmitting ? 0.5 : 1}
            >
              Cancel
            </SecondaryButton>
            <Button
              label="Create"
              type="submit"
              onClick={onClick}
              marginTop="15px"
              disabled={isSubmitting}
            />
          </FlexRow>
        </FlexedCentered>
      </ModalBody>
    </Modal>
  );
};

export default BotPermissionModal;
