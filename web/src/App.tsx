import 'bootstrap/dist/css/bootstrap.css';
import logoImg from './assets/logoFifa.png';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Card from './Components/Card';
import axios from 'axios';

import {Img, Strong, Div} from './styles/Main';
import GlobalStyle from "./styles/Global";

interface Player {
  id: String;
  createdAt: String;
  name: String;
  position: String;
  teamId: String;
}

interface Time {
  id: String;
  manager: String;
  bannerUrl: String;
  name: String;
  players: Array<Player>
}


function App() {

  

  const [times, setTimes] = useState<Time[]>([]);

  

  useEffect(() => {
    axios.get('http://localhost:3332/times')
    .then(response => {
      setTimes(response.data);
    })
    .catch(err => {
      console.error(err);
    })
  }, [])


  return (
    <Div className='d-flex justify-content-center'>
        
        <Img src={logoImg} alt="Logo Fifa" />

        <Strong>Gerenciamento de times</Strong>

        <div className="row w-100">
          
          {times.length > 0 ? 
            times.map(time => {
              return (
                <Card id={time.id} bannerUrl={time.bannerUrl} name={time.name} manager={time.manager} players={time.players} times={times} setTimes={setTimes}/>    
              )
            }) : <h2>Você não tem times cadastrados...</h2>
          }
    
        </div>

        



        <GlobalStyle />
        
    </Div>
  )
}

export default App
