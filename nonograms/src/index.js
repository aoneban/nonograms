import './index.scss';
import { matrices } from './modules/data';
import GenerateGame from './modules/generateGame';

const firstGame = new GenerateGame(matrices.one);
firstGame.createGame(matrices.one);

function createInput() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('input-wrapper');

  const matrixValues = Object.keys(matrices);

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Chose of list');
  input.setAttribute('id', 'myInput');

  wrapper.append(input);

  const matrixWrap = document.createElement('div');
  matrixWrap.setAttribute('id', 'myDropdown');

  matrixValues.map((element) => {
    const link = document.createElement('a');
    link.style.display = 'block';
    link.textContent = element;
    matrixWrap.append(link);
  });

  wrapper.append(matrixWrap);
  document.body.append(wrapper);
}

createInput();

function handlerForInput() {
  document.getElementById('myInput').addEventListener('mouseover', function () {
    document.getElementById('myDropdown').classList.add('class-block');
  });

  document.getElementById('myDropdown').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      document.getElementById('myInput').value = event.target.textContent;
      document.getElementById('myDropdown').classList.remove('class-block');
    }
  });
}

handlerForInput();

function choseNewGame() {
  const drop = document.getElementById('myDropdown');
  drop.addEventListener('click', (event) => {
    document.getElementById('root').remove();
    const game = event.target.innerText;
    const newGame = new GenerateGame(matrices[game]);
    newGame.createGame(matrices[game]);
  });
}

choseNewGame();
