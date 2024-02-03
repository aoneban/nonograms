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
  </tbody>
</table>
  `;

  const randomGameButton = document.createElement('button');
  randomGameButton.classList.add('btn');
  randomGameButton.textContent = 'Random game';

  const solutionGameButton = document.createElement('button');
  solutionGameButton.classList.add('btn');
  solutionGameButton.textContent = 'Solution';

  const changeThemeButton = document.createElement('button');
  changeThemeButton.classList.add('btn');
  changeThemeButton.textContent = 'Change Theme';

  wrapper.append(gameResults, changeThemeButton, randomGameButton, solutionGameButton, input);

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
    document.querySelector('.name-game').remove();
    document.getElementById('root').remove();
    const game = event.target.innerText;
    const newGame = new GenerateGame(matrices[game]);
    newGame.createGame(matrices[game]);
  });
}

choseNewGame();

export function nameGameForModal(value = 'one (5x5)') {
  return ` The nonogram was: ${value}`;
}
