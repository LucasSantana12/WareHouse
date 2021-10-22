import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
:root {
        --background: #f0f2f5;
        --red: #e52e4d;
        --green: #33cc95;
        --blue: #5429cc;
        --blue-light: #6933ff;
        --text-title: #363f5f;
        --text-body: #969cb3;
        --background: #f0f2f5;
        --shape: #ffffff;
    }
  *{
    margin: 0 ;
    padding: 0;
    box-sizing: border-box;
    outline: 0
  }
html {
        @media(max-width: 1080px){
            font-size: 93.75%; 
        }
        @media(max-width: 720px){
            font-size: 87.5%;
        }
    }
  body {
    background: #006ba1;
    color: #fff;
    -webkit-font-smoothing: antialiased; 
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
} 
  }
  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500
  }
  button{
    cursor : pointer
  }
  svg {
    color:#006ba1
  }
`;
