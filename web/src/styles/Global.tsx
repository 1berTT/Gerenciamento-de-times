import  { createGlobalStyle } from 'styled-components';
import Img from '../assets/background.jpeg';

export default createGlobalStyle`
  body {
    background-image: url(${Img});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  // Adicione quais mais regras desejar!
`;