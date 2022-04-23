import React, { Fragment, FC } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import {
  ListText,
  BoldHeading,
  ListWrapper,
  FullWidthRow,
  UpdateDivider,
  FlexColumnWrap,
} from 'shared/commonStyles';

const Update: FC<any> = ({ open, toggle }: any): any => {
  return (
    <Modal size="lg" isOpen={open} centered={true}>
      <ModalHeader className="border-less" toggle={() => toggle()} />
      <ModalBody className="pt-0">
        <div className="modal-body-wrapper">
          <img
            src={`/static/svgs/update.svg`}
            alt="icon-status"
            className="p-2"
            width="60px"
          />
          <BoldHeading size="28px" color="#041F60" align="center">
            Updates
          </BoldHeading>
          <UpdateDivider />

          {[1, 2, 3, 4, 5, 6].map((item: any): any => (
            <Fragment key={item}>
              <FullWidthRow>
                <FlexColumnWrap flex={1}>
                  <ListWrapper
                    zeroPadding={true}
                    src="/static/svgs/list-circle.svg"
                  >
                    <ListText size="16px" color="#041F60">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </ListText>
                  </ListWrapper>
                  <UpdateDivider />
                </FlexColumnWrap>
              </FullWidthRow>
            </Fragment>
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Update;
