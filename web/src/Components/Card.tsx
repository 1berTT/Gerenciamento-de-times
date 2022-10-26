import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import img1 from '../assets/Corinthians.png';
import { UserPlus, Trash, IdentificationCard } from 'phosphor-react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {ImgCards, Button, Button1, DivModal, SelectModal} from '../styles/Main';

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

interface CardProps {
  id: String;
  manager: String;
  bannerUrl: String;
  name: String;
  players: Array<Player>;
  times: Array<Time>;
  setTimes: () => Dispatch<SetStateAction<Time[]>>;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: '#D3D3D3',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};






function Card(props: CardProps) {

    const [open, setOpen] = useState(false);
    const handleOpen = (id: String) => {
      setOpen(true);
      setPlayer({...player, ["teamId"]: id})
    }
    const handleClose = () => {
     setOpen(false);
      setPlayer({["name"]: '', ["position"]: '', ["teamId"]: ''})
    }

    const [player, setPlayer] = useState({
      name: '',
      position: '',
      teamId: ''
    })

    function handelSelectPosition(event: ChangeEvent<HTMLSelectElement>) {
      const uf = event.target.value;
      
      setPlayer({...player, ["position"]: uf});
    }


    function changePlayer(event: ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target;
      
      setPlayer({ ...player, [name]: value})
    }

    console.log("times:", props.times)

    async function createPlayer(){
      
      const { data } = await axios.post(`http://localhost:3332/player/${player.teamId}`, {
        "name": player.name,
        "position": player.position
      }).catch((err) => {
        console.error(err);
      })

      const p = [data]

      setTimes([...props.times, ...p])

      return console.log(data);
      
      handleClose();

     


    }


    async function deletePlayer(id: String){
      const response = await axios.delete(`http://localhost:3332/player/${id}`)
      .catch(err => {
          console.error(err)
      })

      return response;
    }


    // console.log(player);

    return (

        <div className="col-4">
            <div className="card">
              <ImgCards className="card-img-top" src={props.bannerUrl} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <h6 className="card-text">Treinador: {props.manager} </h6>
              </div>
              <ul className="list-group list-group-flush">
                {props.players.map(player => {
                    return (
                        <li className="list-group-item">
                            {player.name} / {player.position} 
                            <Button1 className="btn btn-warning">
                                <IdentificationCard size={15} />
                            </Button1>

                            <button 
                            onClick={() => {deletePlayer(player.id)}}
                            className="btn btn-danger">
                                <Trash size={15} />
                            </button>

                        </li>
                    )
                })}
              </ul>
              <div className="card-body">
                
                  <Button className="btn btn-primary" onClick={() => {handleOpen(props.id)}}>
                    <UserPlus size={24} />
                  </Button>
        
                  <Button className="btn btn-warning">
                    <IdentificationCard size={24} />
                  </Button>

                  <Button className="btn btn-danger">
                    <Trash size={24} />
                  </Button>
                
              </div>
            </div>


            <div>
              {/* <button className='btn btn-primary' onClick={handleOpen}>Open modal</button> */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Cadastrar novo jogador
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    <DivModal className="field mt-4">
                      <label htmlFor="name">Nome do Jogador</label>
                      <input 
                        type="text"
                        name="name"
                        id="name"
                        onChange={changePlayer}
                        className="w-100"
                      />
                    </DivModal>

                    <DivModal className="field mt-3">
                      <label htmlFor="position">Posição do Jogador</label>
                      {/* <input 
                        type="text"
                        name="position"
                        id="position"
                        onChange={changePlayer}
                        className="w-100"
                      /> */}

                      <SelectModal 
                        name="position" 
                        id="position"  
                        onChange={handelSelectPosition}
                        className="w-100 h-100"
                      >
                        <option value="">Selecione uma posição</option>
                        <option key="Goleiro" value="Goleiro">Goleiro</option>
                        <option key="Zagueiro" value="Zagueiro">Zagueiro</option>
                        <option key="Lateral Esquerdo" value="Lateral Esquerdo">Lateral Esquerdo</option>
                        <option key="Lateral Direito" value="Lateral Direito">Lateral Direito</option>
                        <option key="Volante" value="Volante">Volante</option>
                        <option key="Meio Campo" value="Meio Campo">Meio Campo</option>
                        <option key="Ponta Esquerda" value="Ponta Esquerda">Ponta Esquerda</option>
                        <option key="Ponta Direita" value="Ponta Direita">Ponta Direita</option>
                        <option key="Segundo Atacante" value="Segundo Atacante">Segundo Atacante</option>
                        <option key="Centroavante" value="Centroavante">Centroavante</option>
                      </SelectModal>

                      <button onClick={createPlayer} className='btn btn-primary mt-4'>Cadastrar Jogador</button>

                    </DivModal>
                  </Typography>
                </Box>
              </Modal>
            </div>




            
          </div>



    )
}


export default Card;
