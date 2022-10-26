import  styled  from 'styled-components';
import img from '../assets/background.jpg';

const Img = styled.img`
    max-width:350px;
    max-height:150px;
    border: none;
    filter: grayscale(10);
`

const ImgCards = styled.img`
    max-width: 430px;
    max-height: 200px;
    border: none;
    align-items: center;
    justify-items: center;
    justify-content: center;
`

const Strong = styled.strong`
    font-size: 40px;
    /* /* color: rgb(124, 252, 0); */
    color: white;
    margin-top: 30px;
    /* font-family: Arial, Helvetica, sans-serif; */
    font-weight: 900;
    margin-bottom: 30px;
    
`

const Div = styled.div`
    max-width: 1344px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
`

const Button = styled.button`
    margin-right: 10px;
`

const Button1 = styled.button`
    margin-left: 20px;
    margin-right: 10px;
`

const DivModal = styled.div`
    display: grid;
`

const SelectModal = styled.select`
    max-height: 300px !important;
`


export { Img, Strong, Div, ImgCards, Button, Button1, DivModal, SelectModal}