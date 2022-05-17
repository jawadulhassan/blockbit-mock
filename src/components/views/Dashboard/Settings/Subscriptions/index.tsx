import React, { FC, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { PDFViewer } from '@react-pdf/renderer';

import {
  Heading,
  LightText,
  BoldHeading,
  InlineItems,
  UserPicture,
  FlexColumnWrap,
  FakeCardDetails,
  SecondaryButton,
  DisabledFakeCard,
  ColoredContainer,
  LeftNinetyPaddedWrapper,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import RangeSlider from 'components/widgets/RangeSlider';

import InvoiceComp from './InvoiceTemplate';
import PaymentPlansComp from './PaymentPlans';

const SubscriptionComponent: FC<any> = ({ toggleScreen }: any): any => {
  const [ready, setReady] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [openMemberShipModal, setOpenMemberShipModal] = useState(false);

  const toggleMemberShipModal = (): void => {
    setOpenMemberShipModal(!openMemberShipModal);
  };

  const toggleInvoiceModal = (): void => {
    setOpenInvoice(!openInvoice);
  };

  useEffect(() => {
    if (openInvoice) {
      setTimeout(() => {
        setReady(true);
      }, 1);
    } else {
      setReady(false);
    }
  }, [openInvoice]);

  const fname: any = 'James';

  return (
    <React.Fragment>
      <Modal size="xl" isOpen={openInvoice} centered={true}>
        <ModalHeader
          className="border-less"
          toggle={(): void => toggleInvoiceModal()}
        />
        <ModalBody className="pt-0">
          {ready && (
            <PDFViewer className="w-100" style={{ height: '600px' }}>
              <InvoiceComp />
            </PDFViewer>
          )}
        </ModalBody>
      </Modal>
      <PaymentPlansComp
        open={openMemberShipModal}
        toggleScreen={toggleScreen}
        toggle={toggleMemberShipModal}
      />
      <ColoredContainer>
        <FlexColumnWrap flex={1.2}>
          <LeftNinetyPaddedWrapper>
            <Heading>My Plan</Heading>
            <LightText lineHeight="50px" color="#A6A6A6">
              Remaining Days
            </LightText>
            <RangeSlider value={15} min={0} max={30} step={1} />
            <DisabledFakeCard>
              <FlexColumnWrap margin="5px 0 0 10px">
                <img src="/static/svgs/mastercard.svg" alt="mastercard-icon" />
              </FlexColumnWrap>
              <FlexColumnWrap>
                <FakeCardDetails>**** **** **** 2738</FakeCardDetails>
              </FlexColumnWrap>
            </DisabledFakeCard>
          </LeftNinetyPaddedWrapper>
        </FlexColumnWrap>
        <FlexColumnWrap flex={0.9}>
          <LeftNinetyPaddedWrapper top="120px">
            <LightText fontSize="28px" lineHeight="60px" color="#A6A6A6">
              Premium
            </LightText>
            <InlineItems>
              <BoldHeading>199</BoldHeading>
              <LightText fontSize="36px" color="#93A2B2">
                $
              </LightText>
              <LightText fontSize="14px" color="#041F60">
                /
              </LightText>
              <LightText fontSize="14px" color="#041F60">
                Monthly
              </LightText>
            </InlineItems>
            <InlineItems>
              <Button
                label="Upgrade"
                icon="upload.svg"
                marginRight="15px"
                onClick={(): void => toggleMemberShipModal()}
              />
              <SecondaryButton
                textColor="#1CE0E2"
                onClick={(): void => toggleInvoiceModal()}
              >
                Invoice
                <img src="/static/svgs/invoice.svg" alt="icon-Profile-delete" />
              </SecondaryButton>
            </InlineItems>
          </LeftNinetyPaddedWrapper>
        </FlexColumnWrap>
        <FlexColumnWrap flex={0.8}>
          <LeftNinetyPaddedWrapper top="120px">
            <UserPicture
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'static/svgs/avataaars.svg';
              }}
              src="static/svgs/avataaars.svg"
            />
            <LightText lineHeight="45px">{fname}</LightText>
          </LeftNinetyPaddedWrapper>
        </FlexColumnWrap>
      </ColoredContainer>
    </React.Fragment>
  );
};

export default SubscriptionComponent;
