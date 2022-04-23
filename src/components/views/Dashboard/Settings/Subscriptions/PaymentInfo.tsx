import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FlexRow,
  BoldHeading,
  InlineItems,
  MiniTableRow,
  FlexColumnWrap,
  PaymentCardIcon,
  PaymentContainer,
  MasterCardWrapper,
  ColoredTextAligned,
  ErrorMessage,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import Dropdown from 'components/widgets/Dropdown';
import TextInput from 'components/widgets/TextInput';
import PopUpComponent from 'components/modals/Popups';

const PaymentComponent: FC<any> = (): any => {
  const { register, handleSubmit, errors } = useForm();

  const [openSuccessPopup, setOpenSuccessPopop] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mastercard');

  const changePaymentMethod = (method: any): void => {
    setPaymentMethod(method);
  };

  const cc_format = (event: any): string => {
    const val = `${event.target.value}`;
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match: string = (matches && matches[0]) || '';
    const parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      const value = event;
      value.target.value = parts.join('  ');
      return value;
    } else {
      return event;
    }
  };

  const expiry_format = (event: any): any => {
    const val = event.target.value;
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{2,4}/g);
    const match: string = (matches && matches[0]) || '';
    const parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }

    if (parts.length) {
      const value = event;
      value.target.value = parts.join('/');
      return value;
    } else {
      return event;
    }
  };

  const onSubmit = (data) => {
    console.log({ data });
  };

  const toggleSuccessPopup = (): void => setOpenSuccessPopop(!openSuccessPopup);

  return (
    <React.Fragment>
      <PopUpComponent
        svg="tick"
        buttonText="OK"
        heading="Success!"
        open={openSuccessPopup}
        toggle={toggleSuccessPopup}
        onClick={toggleSuccessPopup}
        text="Your transaction has been successfully completed."
      />
      <FlexRow>
        <FlexColumnWrap flex={2}>
          <BoldHeading
            lineHeight="20px"
            color="#041F60"
            weight="600"
            margin="0 0 0 70px"
            size="20px"
          >
            Choose payment Method
          </BoldHeading>
          <InlineItems>
            {['mastercard', 'paypal', 'bitcoin'].map(
              (event: any, index: any): any => (
                <MasterCardWrapper
                  key={index}
                  borderColor={
                    event === paymentMethod ? '#1ce0e2' : 'rgba(0, 0, 0, 0.22)'
                  }
                  onClick={(): void => changePaymentMethod(event)}
                >
                  <PaymentCardIcon
                    src={`/static/svgs/${event}.${
                      event === 'bitcoin' ? 'png' : 'svg'
                    }`}
                  />
                </MasterCardWrapper>
              )
            )}
          </InlineItems>
          <PaymentContainer>
            <FlexColumnWrap flex="0.9" align="center">
              <ColoredTextAligned bottom="0px" text="left" color="#041f60">
                Card Holder Name
              </ColoredTextAligned>
              <TextInput
                transparent={true}
                isError={errors.cardName}
                name="cardName"
                placeholder="Name Here"
                register={register({
                  required: 'Required',
                })}
              />
              <ColoredTextAligned bottom="0px" text="left" color="#041f60">
                Card Number
              </ColoredTextAligned>
              <TextInput
                name="cardNumber"
                transparent={true}
                register={register({
                  required: 'Required',
                })}
                isError={errors.cardNumber}
                placeholder="*** *** *** ***"
                onChange={(event: any): any => cc_format(event)}
              />
              <FlexRow>
                <FlexColumnWrap>
                  <TextInput
                    name="expire"
                    transparent={true}
                    placeholder="Expire"
                    register={register({
                      required: 'Required',
                    })}
                    isError={errors.expire}
                    onChange={(event: any): any => expiry_format(event)}
                  />
                </FlexColumnWrap>
                <FlexColumnWrap margin="0 0 0 20px">
                  <TextInput
                    name="cvv"
                    placeholder="CVV"
                    transparent={true}
                    isError={errors.cvv}
                    register={register({
                      required: true,
                      pattern: {
                        value: /^([SW])\w+([0-9]{4})$/,
                        message: 'Please enter valid CVV (4-digits)',
                      },
                    })}
                  />
                  {!!errors?.cvv?.message && (
                    <ErrorMessage>{errors?.cvv?.message}</ErrorMessage>
                  )}
                </FlexColumnWrap>
              </FlexRow>
              <BoldHeading
                lineHeight="20px"
                color="#041F60"
                weight="600"
                size="20px"
              >
                Personal Information
              </BoldHeading>
              <TextInput
                transparent={true}
                isError={errors.fulName}
                name="fulName"
                placeholder="Full Name"
                register={register({
                  required: 'Required',
                })}
              />
              <ColoredTextAligned bottom="0px" text="left" color="#041f60">
                Phone Number
              </ColoredTextAligned>
              <TextInput
                transparent={true}
                name="phone"
                isError={errors.phone}
                placeholder="+001 XX-XXXX-XXXXXXXXXX"
                register={register({
                  required: true,
                  pattern: {
                    value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    message: 'Please enter valid phone number',
                  },
                })}
              />
              {!!errors?.phone?.message && (
                <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
              )}

              <ColoredTextAligned bottom="0px" text="left" color="#041f60">
                Address
              </ColoredTextAligned>
              <FlexRow>
                <FlexColumnWrap>
                  <TextInput
                    name="streetOne"
                    transparent={true}
                    placeholder="Street#1"
                    isError={errors.streetOne}
                    register={register({
                      required: 'Required',
                    })}
                  />
                </FlexColumnWrap>
                <FlexColumnWrap margin="0 0 0 20px">
                  <TextInput
                    name="streetTwo"
                    transparent={true}
                    placeholder="Street#2"
                    isError={errors.streetTwo}
                    register={register({
                      required: 'Required',
                    })}
                  />
                </FlexColumnWrap>
              </FlexRow>
              <FlexRow>
                <FlexColumnWrap padding="11px 0 0 0">
                  <Dropdown
                    name="country"
                    marginTop="10px"
                    options={['United States', 'Denmark', 'Sweden', 'Norway']}
                    register={register}
                  />
                </FlexColumnWrap>
                <FlexColumnWrap flex={1.6} margin="0 0 0 20px">
                  <TextInput
                    transparent={true}
                    isError={errors.zipCode}
                    name="zipCode"
                    placeholder="Zip Code"
                    register={register({
                      required: 'Required',
                    })}
                  />
                </FlexColumnWrap>
              </FlexRow>
              <TextInput
                transparent={true}
                isError={errors.apartment}
                name="apartment"
                placeholder="Apartment / Unit"
                register={register({
                  required: 'Required',
                })}
              />
            </FlexColumnWrap>
          </PaymentContainer>
        </FlexColumnWrap>
        <FlexColumnWrap flex={1} align="center">
          <MiniTableRow justify="center" radius="5px 5px 0 0">
            <BoldHeading color="#041F60" size="20px" weight="600">
              Order Details
            </BoldHeading>
          </MiniTableRow>
          <MiniTableRow
            padding="14px"
            borderBottom={true}
            radius="0"
            color="#FFFFFF"
          >
            <FlexColumnWrap flex="1">
              <ColoredTextAligned color="#041F60" padding="6px" text="center">
                Package
              </ColoredTextAligned>
            </FlexColumnWrap>
            <FlexColumnWrap flex="1">
              <ColoredTextAligned color="#041F60" padding="6px" text="center">
                Premium
              </ColoredTextAligned>
            </FlexColumnWrap>
          </MiniTableRow>
          <MiniTableRow
            padding="14px"
            borderBottom={true}
            radius="0"
            color="#FFFFFF"
          >
            <FlexColumnWrap flex="1">
              <ColoredTextAligned color="#041F60" padding="6px" text="center">
                Duration
              </ColoredTextAligned>
            </FlexColumnWrap>
            <FlexColumnWrap flex="1">
              <ColoredTextAligned color="#041F60" padding="6px" text="center">
                Monthly
              </ColoredTextAligned>
            </FlexColumnWrap>
          </MiniTableRow>
          <MiniTableRow
            padding="14px"
            borderBottom={true}
            radius="0"
            color="#FFFFFF"
          >
            <FlexColumnWrap flex="1">
              <ColoredTextAligned color="#041F60" padding="6px" text="center">
                Price
              </ColoredTextAligned>
            </FlexColumnWrap>
            <FlexColumnWrap flex="1">
              <ColoredTextAligned color="#041F60" padding="6px" text="center">
                199 USD
              </ColoredTextAligned>
            </FlexColumnWrap>
          </MiniTableRow>
          <MiniTableRow
            padding="28px"
            height="100px"
            color="#FFFFFF"
            justify="center"
            radius="0 0 5px 5px"
          >
            <Button
              label="Buy"
              icon="arrow.svg"
              onClick={handleSubmit(onSubmit)}
            />
          </MiniTableRow>
        </FlexColumnWrap>
      </FlexRow>
    </React.Fragment>
  );
};

export default PaymentComponent;
