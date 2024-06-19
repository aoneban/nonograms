import './index.scss';
import { matrices } from './modules/data';
import GenerateGame from './modules/generateGame';
import { createAudioPlayer } from './modules/helpers';
import {
  resetGameFunction,
  showGameSolution,
  saveGameFunction,
  choseNewGame,
  removeElements,
  switchSoundInTheGame
} from './modules/generateGame';

export let nameGame;

createAudioPlayer();

const firstGame = new GenerateGame(matrices['Snake (5x5)']);
firstGame.createGame(matrices['Snake (5x5)']);

function createInput() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('input-wrapper');

  const gameTitle = document.createElement('h4');
  gameTitle.textContent = 'Choose the game:'

  const input = document.createElement('select');
  input.setAttribute('id', 'myInput');
  const games = Object.keys(matrices)
  games.forEach((elem) => {
    const selectValue = document.createElement('option')
    selectValue.setAttribute('name', elem);
    selectValue.textContent = elem;
    input.append(selectValue);
  })

  const buttonGame = document.createElement('button');
  buttonGame.classList.add('btn');
  buttonGame.textContent = 'Submit'
  buttonGame.addEventListener('click', selectNewGame)

  const getResultGameFromLS = localStorage.getItem('savedResultsGameToTable');

  const gameResults = document.createElement('div');
  gameResults.classList.add('game-results');

  if (getResultGameFromLS === null) {
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
        <td>Running Man (10x10)</td>
        <td>04:20</td>
      </tr>
      <tr>
        <td>Airplane (15x15)</td>
        <td>06:38</td>
      </tr>
    </tbody>
  </table>
    `;
  } else {
    gameResults.innerHTML = `
    <table>
    <thead>
      <tr>
        <th>Name game</th>
        <th>Time</th>
      </tr>
    </thead>
    ${getResultGameFromLS}
  </table>
    `;
  }

  const nameCurrentGame = document.createElement('h3');
  nameCurrentGame.setAttribute('id', 'curr-game');
  nameCurrentGame.textContent = 'Current game: Snake (5x5)';

  const randomGameButton = document.createElement('button');
  randomGameButton.classList.add('btn');
  randomGameButton.textContent = 'Random game';
  randomGameButton.addEventListener('click', choseRandomGame);

  const switchSoundButton = document.createElement('button');
  switchSoundButton.classList.add('btn', 'switch-sound');
  switchSoundButton.textContent = 'Sound Off';
  switchSoundButton.addEventListener('click', switchSoundInTheGame);

  const solutionGameButton = document.createElement('button');
  solutionGameButton.classList.add('btn');
  solutionGameButton.textContent = 'Show solution';
  solutionGameButton.addEventListener('click', showGameSolution);

  const resetGameButton = document.createElement('button');
  resetGameButton.classList.add('btn');
  resetGameButton.textContent = 'Reset Game';
  resetGameButton.addEventListener('click', resetGameFunction);

  const valueButtonToSaveGame = localStorage.getItem('savedCurrentButtonValue');

  const saveGameButton = document.createElement('button');
  saveGameButton.classList.add('btn', 'save-game');
  if (valueButtonToSaveGame === 'Save Game') {
    saveGameButton.textContent = 'Continue old Game';
  } else {
    saveGameButton.textContent = 'Save Game';
  }
  saveGameButton.addEventListener('click', saveGameFunction);

  const changeThemeButton = document.createElement('button');
  changeThemeButton.classList.add('btn', 'change-theme');
  changeThemeButton.textContent = 'Dark Theme';
  changeThemeButton.addEventListener('click', changeColorTheme);

  wrapper.append(
    nameCurrentGame,
    gameResults,
    changeThemeButton,
    switchSoundButton,
    randomGameButton,
    saveGameButton,
    resetGameButton,
    solutionGameButton,
    gameTitle,
    input,
    buttonGame,
  );

  const matrixWrap = document.createElement('div');
  matrixWrap.setAttribute('id', 'myDropdown');

  wrapper.append(matrixWrap);
  document.body.prepend(wrapper);
}

createInput();

function handlerForInput() {
  const selectValue = document.getElementById('myInput');
  selectValue.addEventListener('click', function () {
    if (selectValue.value) {
      nameGame = selectValue.value;
    }
  });
}

handlerForInput();

choseNewGame();

function selectNewGame() {
  const chooseValue = document.getElementById('myInput');
  const chooseGame = chooseValue.value;
  removeElements();
  const newGame = new GenerateGame(matrices[chooseGame]);
  newGame.createGame(matrices[chooseGame]);
  document.getElementById('curr-game').innerHTML = `Current game: ${chooseGame}`;
  nameGame = chooseGame;
}

function choseRandomGame() {
  const matrixValues = Object.keys(matrices);
  const randomIndex = Math.floor(Math.random() * matrixValues.length);
  const randomGame = matrixValues[randomIndex];
  removeElements();
  const newGame = new GenerateGame(matrices[randomGame]);
  newGame.createGame(matrices[randomGame]);
  document.getElementById('curr-game').innerHTML = `Current game: ${randomGame}`;
  nameGame = randomGame;
}

export function nameGameForModal(value = 'Snake (5x5)') {
  return ` The nonogram was: ${value}`;
}

function changeColorTheme() {
  const button = document.querySelector('.change-theme');
  if (button.innerHTML === 'Dark Theme') {
    button.innerHTML = 'Light Theme';
    document.body.classList.add('change-color');
    document.getElementById('root').classList.add('change-color');
    document.getElementById('myDropdown').classList.add('change-color');
    document.querySelector('.input-wrapper').classList.add('input-dark');
    const btn = document.querySelectorAll('.btn')
    btn.forEach(el => el.classList.add('new-btn'))
    const thElements = document.getElementsByTagName('th');
    for (let i = 0; i < thElements.length; i++) {
      thElements[i].classList.add('change-color');
    }
  } else {
    button.innerHTML = 'Dark Theme';
    document.body.classList.remove('change-color');
    document.getElementById('root').classList.remove('change-color');
    document.querySelector('.btn').classList.remove('new-btn');
    document.getElementById('myDropdown').classList.remove('change-color');
    document.querySelector('.input-wrapper').classList.remove('input-dark');
    const btn = document.querySelectorAll('.btn')
    btn.forEach(el => el.classList.remove('new-btn'))
    const thElements = document.getElementsByTagName('th');
    for (let i = 0; i < thElements.length; i++) {
      thElements[i].classList.remove('change-color');
    }
  }
}
