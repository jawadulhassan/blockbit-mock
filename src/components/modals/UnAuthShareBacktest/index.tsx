import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import Button from 'components/widgets/Button';
import { ModalText, MainHeader } from 'shared/commonStyles';

const UnAuthShareBacktest: FC<any> = ({ open, toggle }: any): any => {
  return (
    <Modal
      isOpen={open}
      centered={true}
      style={{ maxWidth: '700px', height: '360px', width: '80%' }}
    >
      <ModalHeader className="border-less" toggle={(): void => toggle()} />
      <ModalBody style={{ padding: '4% 11%' }}>
        <div className="modal-body-wrapper">
          <img
            src="/static/svgs/bigger-share.svg"
            alt="share-icon"
            className="p-2 mb-3"
          />
          <MainHeader>Share</MainHeader>
          <ModalText>
            To share these results, you need to login first.
          </ModalText>
          <Link to="/login">
            <Button label="Login" icon="arrow.svg" marginTop="15px" />
          </Link>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UnAuthShareBacktest;
