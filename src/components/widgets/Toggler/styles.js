import styled from 'styled-components';

export const TogglerView = styled.div`
  background-color: rgba(#2667c9, 0.1);
  cursor: pointer;
  transition: 0.4s;
  border-radius: 50%;
  &:before {
    background-color: #ccd5e1;
    bottom: 0;
    content: '';
    height: 24px;
    left: 0;
    position: absolute;
    transition: 0.4s;
    width: 38px;
    border-radius: 34px;
  }
`;

export const TogglerWrapper = styled.div`
  input {
    display: none;
  }
`;
