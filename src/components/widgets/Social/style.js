import styled from 'styled-components';

export const SocialButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 55%;
  border-radius: 170px;
  background-color: ${(props) =>
    props.primary ? 'rgba(255, 0, 0, 0.6)' : '#3b5998'};
  box-shadow: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  padding: 0.5em 1em;
  margin-top: ${(props) => (props.marginTop ? '20px' : '0px')};
`;
