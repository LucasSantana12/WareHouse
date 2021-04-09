import styled from 'styled-components';

import { shade } from 'polished';

import backgroundFucapi from '../../assets/background-signup.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;

  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  place-content: center;

  width: 100%;

  max-width: 650px;

  form {
    margin: 40px 0;

    width: 340px;

    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;

      display: block;

      margin-top: 24px;

      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #f4ede8;

    display: block;

    margin: 15px 0 15px;

    text-decoration: none;

    transition: color 0.2s;

    display: flex;

    align-items: center;

    svg {
      margin-right: 12px;

      color: #f4ede8;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;

  background: url(${backgroundFucapi}) no-repeat center;

  background-size: cover;
`;
