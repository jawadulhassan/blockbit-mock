import styled from 'styled-components';

export const BotItemView = styled.div`
  width: 31%;
  margin: 8px;
  height: 401px;
  display: flex;
  background: #fafafa;
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-between;
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
  color: ${({ color }) => (color ? color : '#132b66')};
  text-align: right;
`;

export const FlexedRowBetween = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FlexedCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: 100%;
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
export const BorderedTop = styled.div`
  padding: 17px 30px;
  border-top: 1px solid rgba(214, 214, 214, 0.44);
`;
export const BorderedBottom = styled.div`
  padding: 15px 30px;
  border-bottom: 1px solid rgba(214, 214, 214, 0.44);
`;
