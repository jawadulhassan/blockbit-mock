import styled from 'styled-components';

export const HeaderTab = styled.div`
  display: flex;
  font-size: 20px;
  cursor: pointer;
  line-height: 27px;
  margin-left: 22px;
  margin-right: 22px;
  align-items: center;
  flex-direction: row;
  padding: 20px 0px 9px 0px;
  border-bottom: ${({ active }) => active && 'solid 3px #041f60'};
  font-weight: ${({ active }) => (active ? 600 : 'normal')};
`;
