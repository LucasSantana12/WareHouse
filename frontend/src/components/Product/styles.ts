import styled from 'styled-components';

export const Container = styled.div`
  background: #f0f0f5;
  border-radius: 8px;

  justify-content: center;
  align-items: center;

  header {
    background: #ffb84d;
    border-radius: 8px 8px 0px 0px;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;

    img {
      width: 393px;
      pointer-events: none;
      user-select: none;
    }
  }
  section.body {
    padding: 30px;
    h2 {
      color: #3d3d4d;
    }
    p {
      color: #3d3d4d;
      margin-top: 16px;
    }
    .description {
      max-width: 100px; // Limite maximo do texto
      white-space: nowrap; // Removendo quebra de linha
      overflow: hidden; // Removendo a barra de rolagem
      text-overflow: ellipsis; // Adicionando "..." ao final do texto
    }
    .quantity {
      font-style: normal;
      font-size: 24px;
      line-height: 34px;
      color: #39b100;
      b {
        font-weight: 600;
      }
    }
  }
  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: #e4e4eb;
    border-radius: 0px 0px 8px 8px;
    div.icon-container {
      display: flex;
      button {
        background: #fff;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;
        svg {
          color: #3d3d4d;
        }
        & + button {
          margin-left: 6px;
        }
      }
    }
  }
`;
