import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #f5f8fa;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 4px solid #f5f8fa;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ffb500;
      border-color: #ffb500;

      svg {
        color: #ffb500;
      }
    `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        color: #ffb500;
      }
    `}

    

  input {
    background: transparent;
    flex: 1;
    border: 0;
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
