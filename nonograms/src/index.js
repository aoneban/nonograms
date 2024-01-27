import './index.scss';
import { data3 } from './modules/data';
import GenerateGame from './modules/generateGame';


const firstGame = new GenerateGame(data3);
firstGame.createGame(data3);