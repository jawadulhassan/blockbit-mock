import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  border-radius: 8px;
  position: relative;
  background: #fafafa;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 53px 50px 90px 50px;
`;

export const StepWrapper = styled.div`
  z-index: 10;
  display: flex;
  border-radius: 50%;
  text-align: center;
  margin-bottom: 9px;
  justify-content: center;
  width: ${({ width }) => (width ? width : '44px')};
  height: ${({ height }) => (height ? height : '44px')};
  background: ${({ active }) => (active ? '#1CE0E2' : '#132b66')};
`;

export const StepNumber = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`;

export const StepText = styled.div`
  font-size: 16px;
  line-height: 22px;
  font-style: normal;
  font-family: Open Sans;
  color: ${({ active }) => (active ? '#1CE0E2' : '#132b66')};
  font-weight: ${({ active }) => (active ? 600 : 'normal')};
`;

export const DashedBorder = styled.div`
  border: 1px dashed rgba(4, 31, 96, 0.4);
  width: 76%;
  top: 75px;
  position: absolute;
`;
