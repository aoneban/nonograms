import './index.scss';
import { matrices } from './modules/data';
import GenerateGame from './modules/generateGame';
import { resetGameFunction, showGameSolution, saveGameFunction, choseNewGame, removeElements } from './modules/generateGame';

export let nameGame;

const firstGame = new GenerateGame(matrices['Snake (5x5)']);
firstGame.createGame(matrices['Snake (5x5)']);

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
  solutionGameButton.addEventListener('click', showGameSolution);

  const resetGameButton = document.createElement('button');
  resetGameButton.classList.add('btn');
  resetGameButton.textContent = 'Reset Game';
  resetGameButton.addEventListener('click', resetGameFunction);

  const saveGameButton = document.createElement('button');
  saveGameButton.classList.add('btn', 'save-game');
  saveGameButton.textContent = 'Save Game';
  saveGameButton.addEventListener('click', saveGameFunction);

  const changeThemeButton = document.createElement('button');
  changeThemeButton.classList.add('btn');
  changeThemeButton.textContent = 'Change Theme';

  wrapper.append(
    gameResults,
    changeThemeButton,
    randomGameButton,
    saveGameButton,
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

choseNewGame();

function choseRandomGame() {
  const matrixValues = Object.keys(matrices);
  const randomIndex = Math.floor(Math.random() * matrixValues.length);
  const randomGame = matrixValues[randomIndex];
  removeElements();
  const newGame = new GenerateGame(matrices[randomGame]);
  newGame.createGame(matrices[randomGame]);
}

export function nameGameForModal(value = 'Snake (5x5)') {
  return ` The nonogram was: ${value}`;
}



