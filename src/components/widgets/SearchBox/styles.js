import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  padding: 6px 25px;
  position: relative;
  border-radius: 19px;
  flex-direction: row;
  box-sizing: border-box;
  border: 1px solid #041f60;
  justify-content: space-between;
  width: ${({ width }) => (width ? width : '55%')};
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FilterWrapper = styled.div`
  top: 42px;
  right: 60px;
  z-index: 10;
  width: 216px;
  display: flex;
  height: 181px;
  border-radius: 7px;
  position: absolute;
  background-size: cover;
  flex-direction: column;
  padding: 26px 14px 18px 14px;
  background-repeat: no-repeat;
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 1px 1px 3px -2px rgba(0, 0, 0, 0.68);
  -moz-box-shadow: 1px 1px 3px -2px rgba(0, 0, 0, 0.68);
  -webkit-box-shadow: 1px 1px 3px -2px rgba(0, 0, 0, 0.68);
  background-image: url('/static/svgs/filter-background.svg');
`;
