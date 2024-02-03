import './index.scss';
import { matrices } from './modules/data';
import GenerateGame from './modules/generateGame';

export let nameGame;

const firstGame = new GenerateGame(matrices['one (5x5)']);
firstGame.createGame(matrices['one (5x5)']);

function createInput() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('input-wrapper');

  const matrixValues = Object.keys(matrices);

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Chose game of the list');
  input.setAttribute('id', 'myInput');

  const gameResults = document.createElement('div');
  gameResults.classList.add('game-results');
  gameResults.innerHTML = `
  <table>
  <thead>
    <tr>
      <th>Name game</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody id="resultsTableBody">
    <tr>
      <td>four (5x5)</td>
      <td>04:20</td>
    </tr>
    <tr>
      <td>six (10x10)</td>
      <td>06:38</td>
    </tr>
    <tr>
      <td>eleven (15x15)</td>
      <td>09:51</td>
    </tr>
    <tr>
      <td>fifteen (15x15)</td>
      <td>12:41</td>
    </tr>
  </tbody>
</table>
  `;

  const randomGameButton = document.createElement('button');
  randomGameButton.classList.add('btn');
  randomGameButton.textContent = 'Random game';
  randomGameButton.addEventListener('click', choseRandomGame);

  const solutionGameButton = document.createElement('button');
  solutionGameButton.classList.add('btn');
  solutionGameButton.textContent = 'Solution';

  const resetGameButton = document.createElement('button');
  resetGameButton.classList.add('btn');
  resetGameButton.textContent = 'Reset Game';

  const changeThemeButton = document.createElement('button');
  changeThemeButton.classList.add('btn');
  changeThemeButton.textContent = 'Change Theme';

  wrapper.append(
    gameResults,
    changeThemeButton,
    randomGameButton,
    resetGameButton,
    solutionGameButton,
    input,
  );

  const matrixWrap = document.createElement('div');
  matrixWrap.setAttribute('id', 'myDropdown');

  matrixValues.map((element) => {
    const link = document.createElement('a');
    link.style.display = 'block';
    link.textContent = element;
    matrixWrap.append(link);
  });

  wrapper.append(matrixWrap);
  document.body.prepend(wrapper);
}

createInput();

function handlerForInput() {
  document.getElementById('myInput').addEventListener('click', function () {
    document.getElementById('myDropdown').classList.add('class-block');
  });

  document.getElementById('myDropdown').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      nameGame = document.getElementById('myInput').value;
      nameGame = event.target.textContent;
      document.getElementById('myInput').placeholder = nameGame;
      document.getElementById('myDropdown').classList.remove('class-block');
    }
  });
}

handlerForInput();

function choseNewGame() {
  const drop = document.getElementById('myDropdown');
  drop.addEventListener('click', (event) => {
    removeElements();
    const game = event.target.innerText;
    const newGame = new GenerateGame(matrices[game]);
    newGame.createGame(matrices[game]);
  });
}

choseNewGame();

function choseRandomGame() {
  const matrixValues = Object.keys(matrices);
  const randomIndex = Math.floor(Math.random() * matrixValues.length);
  const randomGame = matrixValues[randomIndex];
  removeElements();
  const newGame = new GenerateGame(matrices[randomGame]);
  newGame.createGame(matrices[randomGame]);
}

export function nameGameForModal(value = 'one (5x5)') {
  return ` The nonogram was: ${value}`;
}

function removeElements() {
  document.querySelector('.name-game').remove();
  document.getElementById('root').remove();
}
