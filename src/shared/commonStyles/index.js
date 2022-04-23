import styled from 'styled-components';

import {
  buttonTextColor,
  formBackgroundColor,
  // buttonBackgroundColor,
} from '../../theme';

export const MainWrapper = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
`;
export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  border-radius: 4px;
  align-items: center;
  margin-bottom: 20px;
  flex-direction: column;
  background: ${formBackgroundColor};
  & input {
    margin-bottom: 20px;
  }
`;
export const Button = styled.button`
  border: none;
  display: flex;
  font-size: 1em;
  cursor: pointer;
  box-shadow: none;
  max-height: 40px;
  border-radius: 8px;
  padding: 0.5em 1em;
  flex-direction: row;
  background: #1ce0e2;
  color: ${buttonTextColor};
  width: ${({ width }) => width};
  opacity: ${({ opacity }) => opacity};
  margin-top: ${({ marginTop }) => marginTop};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;
export const SecondaryButton = styled.button`
  display: flex;
  font-size: 1em;
  cursor: pointer;
  box-shadow: none;
  max-height: 40px;
  border-radius: 8px;
  padding: 0.5em 1em;
  flex-direction: row;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid #1ce0e2;
  color: ${buttonTextColor};
  width: ${({ width }) => width};
  opacity: ${({ opacity }) => opacity};
  margin-top: ${({ marginTop }) => marginTop};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;
export const Heading = styled.h1`
  color: #041f60;
  font-size: 28px;
  font-weight: 600;
  line-height: 38px;
  font-style: normal;
  font-family: Open Sans;
  text-align: left !important;
`;
export const SubWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;
export const RightSubWrapper = styled.div`
  width: 70%;
`;
export const LeftSubWrapper = styled.div`
  width: 90%;
  padding-right: 20%;
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
export const ShowPassword = styled.img`
  cursor: pointer;
  padding-top: 22px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-bottom: ${(props) =>
    props.showErrorRequired ? 'solid 1px #FF0000' : 'solid 1px #041f60'};
`;
export const ButtonIcon = styled.img`
  padding-top: 8px;
  padding-left: 25px;
`;
export const FlexedColumnCentered = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const FlexedRow = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
  width: ${({ FlexedWidth }) => (FlexedWidth ? '80%' : '100%')};
`;
export const FlexedFixer = styled.p`
  text-align: center;
`;
export const Linked = styled.div`
  color: #041f60;
  font-size: 16px;
  margin-top: 12px;
  line-height: 22px;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-family: Open Sans;
`;
export const Highlighted = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #1ad2d4;
  cursor: pointer;
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;

export const ForgettingLink = styled.div`
  text-align: right !important;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #1ad2d4;
  cursor: pointer;
  z-index: 100000000;
  text-decoration-line: underline;
`;
export const Resend = styled.div`
  cursor: pointer;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  align-self: flex-end;
  margin-right: 40px;
  -webkit-text-decoration-line: underline;
  text-decoration-line: underline;
  color: hsl(0deg 0% 65%);
`;
export const MainHeader = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 38px;
  text-align: center;
  color: #041f60;
`;
export const ModalText = styled.p`
  margin-top: 12px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  color: #041f60;
`;
export const AsideWrapper = styled.div`
  width: 15%;
  z-index: 7;
  height: 100%;
  padding-top: 90px;
  align-items: left;
  position: fixed;
  background: hsl(222deg 92% 20%);
`;
export const SideBarNav = styled.ul`
  list-style-type: none;
  padding: 0px;
`;
export const ListItems = styled.li`
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  width: 100%;
  padding-bottom: 5px;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding};
  margin-top: ${({ marginTop }) => marginTop && marginTop};
  align-items: ${({ alignItems }) => alignItems && alignItems};
  margin-left: ${({ marginLeft }) => marginLeft && marginLeft};
  margin-right: ${({ marginRight }) => marginRight && marginRight};
  margin-bottom: ${({ marginBottom }) => marginBottom && marginBottom};
  justify-content: ${({ justifyContent }) => justifyContent && justifyContent};
`;
export const AsideImage = styled.img`
  width: 20px;
  height: 20px;
`;
export const AsideText = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #ffffff;
  padding: 0px 0px 0px 10px;
`;
export const MainDashboard = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const MainContentWrapper = styled.div`
  padding-left: 15%;
  padding-top: 70px;
  width: 100%;
`;
export const AuthHeaderFixed = styled.div`
  width: 100%;
  z-index: 100;
  display: flex;
  position: fixed;
  flex-direction: row;
  align-items: center;
  padding: 1em 2% 1em 3%;
  background-color: #132b66;
  justify-content: space-between;
`;
export const LogoWrap = styled.div`
  display: flex;
  z-index: 1000;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
`;
export const Logo = styled.img`
  object-fit: contain;
`;
export const HeaderFixed = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 15% 0.5em 15%;
  z-index: 10;
  background-color: #132b66;
`;
export const AuthSubHeader = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #ffffff;
  margin-left: 12px;
  margin-bottom: 0px;
`;
export const AuthFlexContainer = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  text-decoration: none;
  align-items: center;
  margin: 0px;
  padding: 0px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
`;
export const FlexContainer = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  text-decoration: none;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;
export const ImageMessage = styled.img`
  margin-right: 8px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;
export const Separation = styled.div`
  width: 32px;
  height: 0px;
  transform: rotate(90deg);
  border: 1px solid rgba(255, 255, 255, 0.14);
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  margin-top: ${({ marginTop }) => marginTop};
  padding-top: ${({ paddingTop }) => paddingTop};
  align-items: ${({ alignItems }) => alignItems};
  cursor: ${({ pointer }) => pointer && 'pointer'};
  width: ${({ width }) => (width ? width : '100%')};
`;
export const FreeIcon = styled.img`
  padding-left: 15px;
`;
export const ListOfUsers = styled.li``;
export const UnAuthHeaderList = styled.li``;
export const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 17px 30px 17px;
`;
export const UnAuthScreenWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 59px 10% 29px 10%;
`;
export const FlexedReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 28px;
  margin-bottom: 28px;
`;
export const FlexedBetweenSeventy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${({ width }) => (width ? width : '70%')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
`;
export const AlignedCenter = styled.div`
  align-self: center;
  width: 100%;
`;
export const AlignedEnd = styled.div`
  align-self: flex-end;
`;
export const LargeDivider = styled.div`
  margin-right: 20px;
  border: 1px solid #eaeaea;
  width: ${({ width }) => (width ? width : '0px')};
  height: ${({ height }) => (height ? height : '18px')};
`;
export const Divider = styled.div`
  height: 0px;
  width: 18px;
  border: 1px solid #eaeaea;
  transform: rotate(90deg);
`;
export const IdeaIcon = styled.img`
  padding-left: 6px;
  cursor: pointer;
`;
export const ContentWrapper = styled.div`
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 3%;
  padding-bottom: 2%;
`;
export const NumberWrapper = styled.div`
  width: 29px;
  height: 29px;
  margin-right: 14px;
  border-radius: 50%;
  background: #041f60;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fafafa;
`;
export const BolderText = styled.h1`
  font-style: normal;
  font-family: Open Sans;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  color: ${({ color }) => (color ? color : '#132b66')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 600)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '22px')};
`;
export const LightText = styled.h1`
  margin-bottom: 0px;
  font-style: normal;
  font-weight: normal;
  font-family: Open Sans;
  padding: ${({ padding }) => padding};
  text-align: ${({ textAlign }) => textAlign};
  cursor: ${({ cursor }) => cursor && 'pointer'};
  margin-left: ${({ marginLeft }) => marginLeft};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => (color ? color : '#132b66')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '22px')};
`;
export const LinkText = styled.span`
  font-family: Open Sans;
  font-style: italic;
  font-weight: normal;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '18px')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '25px')};
  color: #429ddb;
`;
export const PlayIcon = styled.img`
  position: absolute;
  top: 42%;
  left: 48%;
  z-index: 10px;
`;
export const FlexedCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: 100%;
`;
export const HeaderBar = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 6px 21px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const BorderedBottom = styled.div`
  padding: 20px 65px;
  border-bottom: 1px solid rgba(214, 214, 214, 0.44);
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)};
`;

export const ProfitPercentage = styled.h1`
  font-size: 18px;
  line-height: 22px;
  text-align: right;
  font-style: normal;
  font-weight: normal;
  font-family: Open Sans;
  text-align: ${({ textAlign }) => textAlign};
  margin-top: ${({ marginTop }) => marginTop};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  color: ${({ color }) => (color ? color : '#00da9d')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)};
`;
export const FlexContainerTwentyFivePad = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  text-decoration: none;
  align-items: center;
  margin: 0px;
  padding-left: 25px;
  width: 100%;
  justify-content: ${({ center }) => center && 'center'};
`;
export const SettingsWrapper = styled.div`
  background-color: #f7f7f7;
  min-height: 60vh;
  padding-bottom: 100px;
  padding-top: 30px;
`;

export const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  margin: auto;
  cursor: pointer;
  border-radius: 7px;
  margin-bottom: 10px;
  background-size: contain;
  src: ${({ src }) => src};
  box-shadow: 0 4px 8px 0 rgb(62 60 60 / 20%), 0 6px 20px 0 rgb(93 91 91 / 19%);
`;

export const FlexColumnWrap = styled.div`
  flex: ${({ flex }) => (flex ? flex : 'auto')};
  margin: ${({ margin }) => margin};
  align-self: ${({ align }) => align};
  padding: ${({ padding }) => padding};
`;

export const LeftAlignedContainer = styled.div`
  width: 80%;
  margin-left: auto;
`;

export const ComponentBox = styled.div`
  display: flex;
  margin-top: 20px;
  background: #fafafa;
  border-radius: 8px;
  flex-direction: column;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '443px')};
  border: ${({ border }) => border && '1px solid rgba(0, 0, 0, 0.17)'};
`;

export const RingWrapper = styled.div`
  border-bottom: 1px solid #e4e4e4;
  width: ${({ width }) => width};
  border-right: ${({ borderRight }) =>
    borderRight ? borderRight : '1px solid #e4e4e4'};
  border-left: ${({ borderLeft }) =>
    borderLeft ? borderLeft : '1px solid #e4e4e4'};
  height: ${({ height }) => (height ? height : '157px')};
`;

export const PNLWrapper = styled.div`
  height: 65px;
  display: flex;
  color: #041f60;
  width: 172.33px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 12px;
  line-height: 22px;
  border-radius: 8px;
  font-style: normal;
  margin-bottom: 22px;
  background: #fafafa;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  font-family: Open Sans;
  border: 1px solid #d5d5d5;
  justify-content: space-around;
`;

export const ColoredTextAligned = styled.p`
  font-family: Open Sans;
  color: ${({ color }) => color};
  text-align: ${({ text }) => text};
  padding: ${({ padding }) => padding};
  margin-bottom: ${({ bottom }) => bottom};
  cursor: ${({ pointer }) => pointer && 'pointer'};
`;

export const HorizontalSeparator = styled.div`
  width: 100%;
  margin-bottom: 22px;
  border-bottom: 1px solid #041f60;
`;

export const NotificationOptionContainer = styled.div`
  padding: 15px;
  border-radius: 6px;
  margin-right: 60px;
  margin-bottom: 10px;
  background-color: #ffffff;
`;

export const VerticalLine = styled.div`
  width: 1px;
  background-color: #716c6c;
  height: 23px;
`;

export const Thead = styled.thead`
  height: 50px;
  width: 100%;
  font-weight: bold;
`;

export const TableWithSpacer = styled.table`
  border-collapse: separate;
  border-spacing: 0 10px;
`;

export const TableDetailCustom = styled.td`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding};
  cursor: ${({ pointer }) => pointer && 'pointer'};
  max-width: ${({ width }) => (width ? width : '12.5%')};
  min-width: ${({ width }) => (width ? width : '12.5%')};
`;

export const TableRowColored = styled.tr`
  height: 50px;
  background-color: ${({ color }) => color};
`;

export const ColoredContainer = styled.div`
  width: 95%;
  display: flex;
  margin-top: 4%;
  flex-wrap: wrap;
  min-height: 80vh;
  border-radius: 8px;
  flex-direction: row;
  background-color: #ffffff;
`;

export const LeftNinetyPaddedWrapper = styled.div`
  width: 90%;
  margin-left: 10%;
  margin-top: ${({ top }) => (top ? top : '80px')};
`;

export const DisabledFakeCard = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  margin-top: 30px;
  border-radius: 8px;
  flex-direction: row;
  background: #fafafa;
  border: 1px solid rgba(4, 31, 96, 0.6);
`;

export const FakeCardDetails = styled.p`
  padding: 10px;
  color: #a6a6a6;
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  line-height: 21.79px;
  font-family: Open Sans;
`;

export const BoldHeading = styled.h2`
  font-family: Open Sans;
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  font-size: ${({ size }) => (size ? size : '48px')};
  text-align: ${({ align }) => (align ? align : 'left')};
  font-weight: ${({ weight }) => (weight ? weight : '700')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '65.37px')};
`;

export const InlineItems = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: baseline;
  justify-content: ${({ justify }) => justify};
  margin-top: ${({ top }) => (top ? top : '10px')};
`;

export const UserPicture = styled.img`
  cursor: pointer;
  border-radius: 7px;
  background-size: contain;
  src: ${({ src }) => src};
  width: ${({ width }) => (width ? width : '150px')};
  height: ${({ height }) => (height ? height : '180px')};
  box-shadow: 0 4px 8px 0 rgb(62 60 60 / 20%), 0 6px 20px 0 rgb(93 91 91 / 19%);
`;

export const CardWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  border: 1px solid ${({ highlight }) => (highlight ? '#1CE0E2' : '#e3dddd')};
`;

export const CardHeader = styled.div`
  height: 180px;
  margin-bottom: 20px;
  border-radius: 0 0 110px 110px;
  background-color: ${({ highlight }) => (highlight ? '#041F60' : '#e3e3e3')};
`;

export const CardBody = styled.div`
  padding: 10px;
  margin: 0px 0 10px 0;
`;

export const ListWrapper = styled.ul`
  list-style-type: ${({ type }) => type};
  list-style-image: url(${({ src }) => src});
  padding-left: ${({ zeroPadding }) => zeroPadding && '25px'};
`;

export const ListText = styled.li`
  line-height: 19.07px;
  font-family: Open Sans;
  font-weight: ${({ weight }) => (weight ? weight : '400')};
  font-size: ${({ size }) => (size ? size : '14px')};
  color: ${({ color }) => (color ? color : '#8d939a')};
`;

export const CardFooter = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const NotificationDivider = styled.div`
  width: 1px;
  height: 23px;
  margin-left: 7px;
  background-color: #716c6c;
`;

export const MasterCardWrapper = styled.div`
  width: 139px;
  height: 98px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 70px;
  border-radius: 8px;
  padding: 17px 0 0 25px;
  border: ${({ borderColor }) => `2px solid ${borderColor && borderColor}`};
`;
export const PaymentCardIcon = styled.img`
  width: 85px;
  src: ${({ src }) => src};
`;

export const SecondarySmallButton = styled.div`
  color: red;
  display: flex;
  cursor: pointer;
  font-size: 0.9em;
  box-shadow: none;
  border-radius: 8px;
  flex-direction: row;
  padding: 0.5em 0.6em;
  border: 1px solid red;
  box-sizing: border-box;
  background: transparent;
`;

export const MiniTableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ width }) => (width ? width : '90%')};
  margin: ${({ margin }) => (margin ? margin : 'auto')};
  background-color: ${({ color }) => (color ? color : '#EAEAEA')};
  justify-content: ${({ justify }) => justify};
  border-radius: ${({ radius }) => (radius ? radius : '5px')};
  height: ${({ height }) => (height ? height : '66px')};
  padding: ${({ padding }) => padding};
  border-bottom: ${(borderBottom) =>
    borderBottom && '1px solid rgba(214, 214, 214, 0.44)'};
`;

export const PaymentContainer = styled.div`
  display: flex;
  margin: 30px 0 0 32px;
  justify-content: center;
`;

export const CustomButton = styled.button`
  border: none;
  display: flex;
  font-size: 1em;
  box-shadow: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 0.5em 1em;
  flex-direction: row;
  width: ${(props) => props.width};
  opacity: ${(props) => props.opacity};
  margin-top: ${({ marginTop }) => marginTop && marginTop};
  margin-left: ${({ marginLeft }) => marginLeft && marginLeft};
  background: ${({ background }) => (background ? background : '#1ce0e2')};
  color: ${({ btnTextColor }) =>
    btnTextColor ? btnTextColor : buttonTextColor};
`;

export const UpdateDivider = styled.div`
  width: 100%;
  height: 0.4px;
  background: rgba(166, 166, 166, 0.22);
  margin-top: 5px;
  margin-bottom: 24px;
`;

export const FullWidthRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const HorizontalDivider = styled.div`
  width: 100%;
  height: 0px;
  margin-top: ${({ marginTop }) => marginTop};
  border-bottom: 0.5px solid rgba(166, 166, 166, 0.44);
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-top: ${({ marginTop }) => marginTop};
`;
