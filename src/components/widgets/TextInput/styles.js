import styled from 'styled-components';

export const Input = styled.input`
  border-right: none;
  border-top: none;
  border-bottom: none;
  border-left: none;
  width: 100%;
  opacity: 0.7;
  margin-bottom: 0px !important;
  background-color: transparent;
  &:focus {
    outline: none;
    background: #fff !important;
  }
  &:active {
    outline: none;
    background: #fff !important;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: left;
  margin-bottom: 20px;
  padding-bottom: 10px;
  flex-direction: column;
  background-color: transparent;
  width: ${({ width }) => (width ? width : '100%')};
  margin-left: ${(props) => (props.dividerInput ? '5%' : '0%')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '22px')};
  border-bottom: ${({ isError }) =>
    isError ? 'solid 1px #FF0000' : 'solid 1px #041f60'};
`;
