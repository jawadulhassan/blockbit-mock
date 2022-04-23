import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { BoldHeading, InlineItems, CustomButton } from 'shared/commonStyles';

export default React.memo((props: any): any => {
  return (
    <React.Fragment>
      <Modal size="md" isOpen={props.open} centered={true}>
        <ModalHeader
          className="border-less"
          toggle={(): void => props.toggle()}
        />
        <ModalBody className="pt-0">
          <div className="modal-body-wrapper">
            <img
              src={`/static/svgs/${props.svg}.svg`}
              alt="icon-status"
              className="p-2"
              width="60px"
            />
            <BoldHeading size="28px" color="#041F60" align="center">
              {props.heading}
            </BoldHeading>

            <div className="small-text mt-2 mb-2 text-center">{props.text}</div>
          </div>

          <InlineItems justify="center">
            <CustomButton
              btnTextColor={props.buttonTextColor}
              background={props.buttonColor}
              onClick={props.onClick}
            >
              {props.buttonText}
            </CustomButton>
          </InlineItems>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
});
