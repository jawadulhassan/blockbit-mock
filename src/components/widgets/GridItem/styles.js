import styled from 'styled-components';

export const GridView = styled.div`
  width: 31%;
  margin: 8px;
  height: 280px;
  border-radius: 8px;
  background: #fafafa;
  padding: 25px 15px 6px 15px;
  border: ${({ border }) => border && '1px solid rgba(0, 0, 0, 0.17)'};
`;

export const LightText = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #041f60;
`;

export const ProfitPercentage = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #00da9d;
  text-align: right;
`;

export const FlexedRowBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FlexedCentered = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
  justify-content: center;
`;

export const BolderText = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #132b66;
`;

export const Assets = styled.div`
  padding-top: 22px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #a6a6a6;
  align-items: center;
`;
export const IdeaIcon = styled.img`
  padding-left: 6px;
  cursor: pointer;
`;
