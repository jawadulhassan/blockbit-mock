import React, { FC } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import {
  FlexRow,
  Heading,
  CardWrap,
  CardBody,
  ListText,
  LightText,
  CardHeader,
  CardFooter,
  BoldHeading,
  InlineItems,
  ListWrapper,
  FlexColumnWrap,
  SecondaryButton,
  FlexContainerTwentyFivePad,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import TabNavs from 'components/widgets/TabsNavigation';

const MemberShipComponent: FC<any> = ({
  open,
  toggle,
  toggleScreen,
}: any): any => {
  return (
    <React.Fragment>
      <Modal size="xl" isOpen={open} centered={true}>
        <ModalHeader className="border-less" toggle={(): void => toggle()} />
        <ModalBody className="pt-0">
          {/* <div className="modal-body-wrapper"> */}
          <FlexContainerTwentyFivePad center={true}>
            <Heading>Membership</Heading>
          </FlexContainerTwentyFivePad>
          <TabNavs
            center={true}
            tabOption={[
              {
                title: 'Monthly',
                comp: <MonthlySubscription toggleScreen={toggleScreen} />,
              },
              {
                title: 'Quarterly',
                comp: <MonthlySubscription toggleScreen={toggleScreen} />,
              },
              {
                title: 'Yearly',
                comp: <MonthlySubscription toggleScreen={toggleScreen} />,
              },
            ]}
          />
          {/* </div> */}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

const MonthlySubscription: FC<any> = ({ toggleScreen }: any): any => {
  return (
    <React.Fragment>
      <FlexRow>
        <FlexColumnWrap margin="0 30px 0 0">
          <PaymentCardTemplate
            price="0"
            header="Free"
            currency="$"
            toggleScreen={toggleScreen}
          />
        </FlexColumnWrap>
        <FlexColumnWrap margin="0 30px 0 0">
          <PaymentCardTemplate
            price="69"
            header="Basic"
            currency="$"
            toggleScreen={toggleScreen}
          />
        </FlexColumnWrap>
        <FlexColumnWrap margin="0 30px 0 0">
          <PaymentCardTemplate
            price="199"
            header="Premium"
            currency="$"
            highlight={true}
            toggleScreen={toggleScreen}
          />
        </FlexColumnWrap>
        <FlexColumnWrap margin="0 30px 0 0">
          <PaymentCardTemplate
            price="349"
            header="Advanced"
            currency="$"
            toggleScreen={toggleScreen}
          />
        </FlexColumnWrap>
      </FlexRow>
    </React.Fragment>
  );
};

export const PaymentCardTemplate: FC<any> = (props: any): any => {
  return (
    <CardWrap highlight={props.highlight}>
      <CardHeader highlight={props.highlight}>
        <BoldHeading
          align="center"
          size="28px"
          color={props.highlight && 'white'}
        >
          {props.header}
        </BoldHeading>
        <InlineItems justify="center">
          <BoldHeading
            lineHeight="5px"
            align="center"
            color={props.highlight && 'white'}
          >
            {props.price}
          </BoldHeading>
          <LightText fontSize="36px" color="#93A2B2" lineHeight="5px">
            {props.currency}
          </LightText>
          <LightText fontSize="14px" color="#93A2B2" lineHeight="5px">
            /
          </LightText>
        </InlineItems>
        <InlineItems top="0px" justify="center">
          <LightText
            fontSize="14px"
            color={props.highlight ? 'white' : '#041F60'}
            lineHeight="5px"
          >
            Monthly
          </LightText>
        </InlineItems>
      </CardHeader>
      <CardBody>
        <BoldHeading size="14px">1 Credit</BoldHeading>
        <ListWrapper zeroPadding={true} src="/static/svgs/icon-tick.svg">
          <ListText>1 BTC of trade volume</ListText>
          <ListText>2 Exchanges</ListText>
          <ListText>10 BTC Volume</ListText>
          <ListText>2 Number of BOTS</ListText>
        </ListWrapper>
        <BoldHeading size="14px">Subscription</BoldHeading>
        <ListWrapper zeroPadding={true} type="disc">
          <ListText weight="600" color="#041F60" size="14px">
            Monthly
          </ListText>
        </ListWrapper>
        <ListWrapper src="/static/svgs/icon-tick.svg">
          <ListText>10 credits = 10 USD</ListText>
        </ListWrapper>
        <ListWrapper zeroPadding={true} type="disc">
          <ListText weight="600" color="#041F60" size="14px">
            6 Month
          </ListText>
        </ListWrapper>
        <ListWrapper src="/static/svgs/icon-tick.svg">
          <ListText>X Credit = X USD</ListText>
        </ListWrapper>
        <ListWrapper zeroPadding={true} type="disc">
          <ListText weight="600" color="#041F60" size="14px">
            Quarterly
          </ListText>
        </ListWrapper>
        <ListWrapper src="/static/svgs/icon-tick.svg">
          <ListText>30 credits = 28 USD</ListText>
        </ListWrapper>
        <ListWrapper zeroPadding={true} src="/static/svgs/asterisk.svg">
          <ListText weight="600" color="#041F60" size="14px">
            Auto Top Up Option
          </ListText>
        </ListWrapper>
        <ListWrapper src="/static/svgs/icon-tick.svg">
          <ListText>1 USD per credit</ListText>
        </ListWrapper>
      </CardBody>
      <CardFooter>
        <InlineItems justify="center">
          {!props.highlight ? (
            <Button
              icon="arrow.svg"
              label="Get Started"
              onClick={(): void => props.toggleScreen('Payment')}
            />
          ) : (
            <SecondaryButton textColor="#1CE0E2">Current Plan</SecondaryButton>
          )}
        </InlineItems>
      </CardFooter>
    </CardWrap>
  );
};

export default MemberShipComponent;
