import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { ModalText, MainHeader } from 'shared/commonStyles';

import Button from 'components/widgets/Button';

const RegistrationSuccess: FC<any> = ({
  open,
  toggle,
  firstName,
}: any): any => {
  return (
    <Modal isOpen={open} centered={true} style={{ width: '100%' }}>
      <ModalHeader style={{ border: 'none' }} toggle={(): any => toggle()} />
      <ModalBody className="modal-adjustment">
        <ModalText>
          <img
            style={{ paddingBottom: '3%' }}
            src="/static/svgs/letter-icon.svg"
            alt="letter-icon"
          />
          <MainHeader>{`Welcome, ${firstName}!`}</MainHeader>
          Before we get started, please confirm your email address.
          <Link to="/login">
            <Button marginTop="26px" label="Login" icon="arrow.svg" />
          </Link>
        </ModalText>
      </ModalBody>
    </Modal>
  );
};

export default RegistrationSuccess;
