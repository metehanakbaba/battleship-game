import styled from 'styled-components';
import React from 'react';

interface IButton {
  content: string;
  onClick: () => void;
}

const Button: React.FunctionComponent<any> = ({ content, onClick }: IButton) => {
  return <ButtonWrapper onClick={onClick}>{content}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
  padding: 2rem;
  font-family: 'Futura';
  border-radius: 14px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  text-transform: uppercase;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;

export default Button;
