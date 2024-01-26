import './index.scss';
import { data1 } from './modules/data';
import GenerateGame from './modules/generateGame';


const firstGame = new GenerateGame(data1);
firstGame.createGame(data1);