import styled from 'styled-components';

export const Input = styled.input`
  border-right: none;
  border-top: none;
  border-bottom: none;
  border-left: none;
  width: 100%;
  opacity: 0.7;
  font-size: 10px;
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
  &::placeholder {
    font-size: 10px;
  }
`;

export const InputWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: left;
  margin-bottom: 8px;
  flex-direction: column;
  background-color: transparent;
  width: ${({ width }) => (width ? width : '100%')};
  border-bottom: ${({ isError }) =>
    isError ? 'solid 1px #FF0000' : 'solid 1px #041f60'};
`;
