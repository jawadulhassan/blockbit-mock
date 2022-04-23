import styled from 'styled-components';

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

export const SmallStatus = styled.div`
  background: #f1f1f1;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding: 4px 16px;
  margin-left: 22px;
  align-items: center;
`;
