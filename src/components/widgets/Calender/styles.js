import styled from 'styled-components';

export const CalenderWrapper = styled.div`
  top: 45px;
  right: 0px;
  z-index: 10;
  border-radius: 7px;
  position: absolute;
  background: #ffffff;
  box-shadow: 3px 3px 13px -4px rgba(0, 0, 0, 0.68);
  -moz-box-shadow: 3px 3px 13px -4px rgba(0, 0, 0, 0.68);
  -webkit-box-shadow: 3px 3px 13px -4px rgba(0, 0, 0, 0.68);
`;

export const DateBadge = styled.div`
  width: 83px;
  height: 28px;
  display: flex;
  cursor: pointer;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  background: rgba(214, 214, 214, 0.26);
`;
