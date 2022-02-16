import styled from 'styled-components';

export const Container = styled.div`
  background: #006ba1;
  padding: 30px 0;

  header {
    .button {
      display: flex;
      justify-content: center;
      width: 50%;
      margin: auto;
      input {
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3a3a3a;
        border: 2px solid #fff;
        border-right: 0;

        &::placeholder {
          color: #a8a8b3;
        }
      }
      button {
        width: 210px;
        height: 70px;
        background: #ffb500;
        border-radius: 0 5px 5px 0;
        border: 0;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.2s;
      }
    }
    .header {
      max-width: 1280px;
      min-width: 480px;
      margin: 0 auto;
      padding: 0 0 160px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        font-weight: 600;
        border-radius: 8px;
        border: 0;
        background: #006ba1;
        color: #fff;
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;

        padding: 16px 24px;
        transition: 0.2s;
      }
      a:hover {
        filter: brightness(0.9);
      }

      nav {
        div {
          button {
            font-weight: 600;
            border-radius: 8px;
            border: 0;
            background: #ffb500;
            color: #fff;

            display: flex;
            flex-direction: row;
            align-items: center;

            .text {
              padding: 16px 24px;
            }

            .icon {
              display: flex;
              padding: 16px 16px;
              background: #ffb660;
              border-radius: 0 8px 8px 0;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
`;
