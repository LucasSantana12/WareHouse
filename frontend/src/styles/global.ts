import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0 ;
    padding: 0;
    box-sizing: border-box;
    outline: 0
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
