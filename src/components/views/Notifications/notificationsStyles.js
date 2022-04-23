import styled from 'styled-components';

export const MainWrapper = styled.div`
  top: 0;
  left: auto;
  right: 0;
  outline: 0;
  height: 100%;
  width: 410px;
  display: flex;
  z-index: 1200;
  flex: 1 0 auto;
  position: fixed;
  overflow-y: auto;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;

  box-shadow: 0px 8px 10px -5px rgb(0 0 0 / 20%),
    0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%);

  color: hsl(0deg 0% 0% / 87%);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: hsl(0deg 0% 100%);
`;

export const HeaderBar = styled.div`
  color: hsl(0deg 0% 100%);
  overflow: hidden;
  width: 410px;
  background-color: #202c4d;
  display: flex;
  min-height: 72px;
  align-items: center;
`;

export const HeaderLabel = styled.div`
  color: hsl(0deg 0% 100%);
`;

export const HeaderContent = styled.div`
  border-right: 1px solid hsl(0deg 0% 100% / 10%);
  padding: 18px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;

export const MainContent = styled.div`
  padding: 0 15px 15px;
  margin-top: 15px;
  height: calc(100% - 70px);
  overflow: auto;
`;

export const IndividualNotification = styled.div`
  display: flex;
  font-size: 0.8rem;
  flex-direction: row;
  align-items: center;
  padding: 0.8rem 0.6rem;
  font-family: Open Sans;
  justify-content: space-between;
  border-bottom: 1px solid rgba(166, 166, 166, 0.44);
`;

export const Text = styled.div`
  display: flex;
  flex: 0.8;
`;

export const NotificationDate = styled.div`
  display: flex;
  flex: 0.2;
`;
