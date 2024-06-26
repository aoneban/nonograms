import { nameGameForModal } from '../index';
import { nameGame } from '../index';
import { matrices } from './data';
import { winInGame, leftClick, rightClick } from '../assets/audio/sounds';
import { correctStyle, playAudio, showModalWindowFinish } from './helpers';

let intervalRunning = false;
let handlerInterval;
let seconds = 0;
let minutes = 0;
let counterResults = 1;
let handlerSound = true;

export default class GenerateGame {
  constructor(matrix) {
    this.matrix = matrix;
    this.resultArrayLeft = this.getArrayToPromptLeft(matrix);
    this.resultArrayTop = this.getArrayToPromptTop(matrix);
  }

  getArrayToPromptLeft(arr) {
    const result = new Array();
    let newArr = new Array();
    result.push(newArr);

    let ind = 0;

    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length; j += 1) {
        if (arr[i][j] === 1) {
          ind += 1;
        } else if (ind !== 0) {
          newArr.push(ind);
          ind = 0;
        }
      }

      if (ind !== 0) {
        newArr.push(ind);
        ind = 0;
      }

      newArr = [];
      result.push(newArr);
    }

    result.pop();

    return result;
  }

  getArrayToPromptTop(arr) {
    const result = new Array();
    let newArr = new Array();
    result.push(newArr);

    let ind = 0;

    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length; j += 1) {
        if (arr[j][i] === 1) {
          ind += 1;
        } else if (ind !== 0) {
          newArr.push(ind);
          ind = 0;
        }
      }

      if (ind !== 0) {
        newArr.push(ind);
        ind = 0;
      }

      newArr = [];
      result.push(newArr);
    }

    result.pop();

    return result;
  }

  createGame(matrix) {
    clearInterval(handlerInterval);
    intervalRunning = false;
    seconds = 0;
    minutes = 0;

    const mainRoot = document.createElement('div');
    mainRoot.setAttribute('id', 'm-root');

    const nameTitleGame = document.createElement('h1');
    nameTitleGame.classList.add('title-game')
    nameTitleGame.textContent = 'Nonograms';

    mainRoot.append(nameTitleGame);

    const root = document.createElement('div');
    root.setAttribute('id', 'root');

    if (document.body.classList.contains('change-color')) {
      root.classList.add('change-color');
    }

    const nameGame = document.createElement('h1');
    nameGame.classList.add('name-game');
    nameGame.textContent = 'Nonograms';

    const developer = document.createElement('p');
    developer.textContent = 'Developed by Ashot Bahiran';
    developer.classList.add('developer');

    const timer = document.createElement('p');
    timer.setAttribute('id', 'timer');
    timer.classList.add('count-time');
    timer.textContent = '00:00';

    const elementsWrapper = document.createElement('div');
    elementsWrapper.classList.add('elements-wrapper');
    elementsWrapper.addEventListener('click', handlerForCurrentClick);
    elementsWrapper.addEventListener('contextmenu', handlerForRightMouseClick);

    const fieldsWrapper = document.createElement('div');
    fieldsWrapper.classList.add('field-wrapper');

    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix[i].length; j += 1) {
        const newElem = document.createElement('div');
        if (matrix.length <= 5) {
          if (matrix[i][j]) {
            newElem.classList.add('base-elem', 'elem', 'black', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
            root.style.width = '23.8em'
          } else {
            newElem.classList.add('base-elem', 'elem', 'gray', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
            root.style.width = '23.8em';
          }
        } else if (matrix.length > 5 && matrix.length <= 10) {
          if (matrix[i][j]) {
            newElem.classList.add('base-elem', 'elem2', 'black', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
            root.style.width = '25.8em';
          } else {
            newElem.classList.add('base-elem', 'elem2', 'gray', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
            root.style.width = '25.8em';
          }
        } else if (matrix.length > 10) {
          if (matrix[i][j]) {
            newElem.classList.add('base-elem', 'elem3', 'black', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
            root.style.width = '26.8em';
          } else {
            newElem.classList.add('base-elem', 'elem3', 'gray', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
            root.style.width = '26.8em';
          }
        }
      }
    }
    fieldsWrapper.append(elementsWrapper);

    root.append(timer, fieldsWrapper);
    mainRoot.append(root, developer);
    document.body.append(mainRoot);

    this.promptLeft();
    this.promptTop();
  }

  promptLeft() {
    const root = document.createElement('div');
    root.setAttribute('class', 'prompt-left');

    const wrapper = document.querySelector('.elements-wrapper');

    for (let i = 0; i < this.resultArrayLeft.length; i += 1) {
      if (this.resultArrayLeft.length <= 5) {
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayLeft[i]).replaceAll(',', ' | ');
        newElem.classList.add('prompt-left__value');
        newElem.textContent = value;
        root.append(newElem);
      } else if (this.resultArrayLeft.length > 5 && this.resultArrayLeft.length <= 10) {
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayLeft[i]).replaceAll(',', ' | ');
        newElem.classList.add('prompt-left__value2');
        newElem.textContent = value;
        root.append(newElem);
        document.getElementById('root').style.width = '25.8em';
      } else if (this.resultArrayLeft.length > 10) {
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayLeft[i]).replaceAll(',', ' | ');
        newElem.classList.add('prompt-left__value3');
        newElem.textContent = value;
        root.append(newElem);
        document.getElementById('root').style.width = '26.8em'
      }
    }

    wrapper.before(root);
  }

  promptTop() {
    const root = document.createElement('div');
    root.setAttribute('class', 'prompt-top');

    const wrapper = document.querySelector('.field-wrapper');

    for (let i = 0; i < this.resultArrayTop.length; i += 1) {
      if (this.resultArrayTop.length <= 5) {
        root.classList.add('prompt-top');
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayTop[i]).replaceAll(',', '—');
        newElem.classList.add('prompt-top__value');
        newElem.textContent = value;
        root.append(newElem);
      } else if (this.resultArrayTop.length > 5 && this.resultArrayTop.length <= 10) {
        root.classList.add('prompt-top', 'prompt-top2');
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayTop[i]).replaceAll(',', '—');
        newElem.classList.add('prompt-top2__value2');
        newElem.textContent = value;
        root.append(newElem);
      } else if (this.resultArrayTop.length > 10) {
        root.classList.add('prompt-top', 'prompt-top3');
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayTop[i]).replaceAll(',', '—');
        newElem.classList.add('prompt-top3__value3');
        newElem.textContent = value;
        root.append(newElem);
      }
    }

    wrapper.before(root);
  }
}

function generateTimer(e) {
  if (!intervalRunning) {
    seconds = 1;
    intervalRunning = true;
    const timer = document.getElementById('timer');
    if (!e.target.classList.contains('show-color')) {
      handlerInterval = setInterval(() => {
        if (seconds === 60) {
          minutes += 1;
          seconds = 0;
        }
        const sec = seconds.toString().padStart(2, '0');
        const min = minutes.toString().padStart(2, '0');
        timer.innerHTML = `${min}:${sec}`;
        seconds += 1;
      }, 1000);
    }
  }
}

function handlerClicks() {
  const resultLength = new Array();
  const grayArray = new Array();
  const blacksFields = document.querySelectorAll('.black');
  const grayFields = document.querySelectorAll('.gray');
  grayFields.forEach((item) => {
    if (item.classList.contains('show-color')) {
      grayArray.push(item);
    }
  });
  blacksFields.forEach((item) => {
    if (!item.classList.contains('show-color')) {
      resultLength.push(item);
    }
  });
  if (resultLength.length === 0 && grayArray.length === 0) {
    generateSoundForWin();
    let nameGameToAlert = nameGameForModal(nameGame);
    const sec = (seconds - 1).toString().padStart(2, '0');
    const min = minutes.toString().padStart(2, '0');
    showModalWindowFinish(nameGameToAlert, min, sec);
    localStorage.setItem(nameGameToAlert, `${min}:${sec}`);
    writeResultToTable(nameGameToAlert, counterResults);
    document.removeEventListener('click', generateTimer);
    clearInterval(handlerInterval);
    intervalRunning = false;
    counterResults += 1;
  }
}

function handlerForCurrentClick(e) {
  if (handlerSound) {
    playAudio(leftClick);
  }
  const currentElement = e.target;
  if (currentElement.classList.contains('crossed')) {
    currentElement.classList.remove('crossed');
  }
  currentElement.classList.toggle('show-color');
  handlerClicks();
}

function handlerForRightMouseClick(e) {
  e.preventDefault();
  generateTimer(e);
  if (handlerSound) {
    playAudio(rightClick);
  }
  const currentElement = e.target;
  if (currentElement.classList.contains('show-color')) {
    currentElement.classList.remove('show-color');
  }
  currentElement.classList.toggle('crossed');
}

const results = [];

function writeResultToTable(game, counter) {
  const nameGame = game.replace(' The nonogram was:', '').trim();
  const gameResult = localStorage.getItem(game);
  results.push({ id: counter, game: nameGame, result: gameResult });

  results.sort((a, b) => {
    const timeA = Number(a.result.split(':').join(''));
    const timeB = Number(b.result.split(':').join(''));

    return timeA - timeB;
  });
  showResultsInTable(results);
}

function showResultsInTable(arr) {
  const maxArrayLength = 5;

  if (arr.length > maxArrayLength) {
    arr = arr.filter((el) => el.id > counterResults - maxArrayLength);
  }
  const tableBody = document.getElementById('resultsTableBody');
  tableBody.innerHTML = '';

  arr.forEach((el) => {
    const row = document.createElement('tr');
    const tdOne = document.createElement('td');
    const tdTwo = document.createElement('td');
    tdOne.textContent = el.game;
    tdTwo.textContent = el.result;

    row.append(tdOne, tdTwo);
    tableBody.appendChild(row);
    localStorage.setItem('savedResultsGameToTable', tableBody.outerHTML);
  });
}

export function resetGameFunction() {
  intervalRunning = false;
  const elements = document.querySelectorAll('.base-elem');
  elements.forEach((el) => {
    if (el.classList.contains('show-color')) {
      el.classList.remove('show-color');
    }
  });
  elements.forEach((el) => {
    if (el.classList.contains('crossed')) {
      el.classList.remove('crossed');
    }
  });
  clearInterval(handlerInterval);
  minutes = 0;
  seconds = 0;
  const timer = document.getElementById('timer');
  const sec = seconds.toString().padStart(2, '0');
  const min = minutes.toString().padStart(2, '0');
  timer.innerHTML = `${min}:${sec}`;
}

export function removeElements() {
  document.getElementById('m-root').remove();
}

export function showGameSolution() {
  const elements = document.querySelectorAll('.base-elem');
  elements.forEach((el) => {
    if (el.classList.contains('show-color')) {
      el.classList.remove('show-color');
    }
  });
  elements.forEach((el) => {
    if (el.classList.contains('black')) {
      el.classList.add('show-color');
    }
  });
}

export function saveGameFunction() {
  const button = document.querySelector('.save-game');
  if (button.innerHTML === 'Save Game') {
    button.innerHTML = 'Continue old Game';
    const elementsWrapper = document.querySelector('.elements-wrapper');
    const promptTop = document.querySelector('.prompt-top');
    const promptLeft = document.querySelector('.prompt-left');
    const elementsString = elementsWrapper.outerHTML;
    const promptTopString = promptTop.outerHTML;
    const promptLeftString = promptLeft.outerHTML;
    const currNameGame = document.getElementById('curr-game').outerHTML;
    localStorage.setItem('savedCurrentButtonValue', 'Save Game');
    localStorage.setItem('savedElements', elementsString);
    localStorage.setItem('savedPromptTop', promptTopString);
    localStorage.setItem('savedPromptLeft', promptLeftString);
    localStorage.setItem('savedCurrNameGame', currNameGame);
    localStorage.setItem('savedMinutes', minutes);
    localStorage.setItem('savedSeconds', seconds);
  } else {
    clearInterval(handlerInterval);
    button.innerHTML = 'Save Game';
    intervalRunning = false;
    handlerInterval = setInterval(() => {
      if (seconds === 60) {
        minutes += 1;
        seconds = 0;
      }
      const sec = seconds.toString().padStart(2, '0');
      const min = minutes.toString().padStart(2, '0');
      timer.innerHTML = `${min}:${sec}`;
      seconds += 1;
    }, 1000);
    localStorage.setItem('savedCurrentButtonValue', 'Continue old Game');
    const oldGame = getItemFromLocalStorage();
    const topPrompt = getPromptTopFromLocalStorage();
    const leftPrompt = getPromptLeftFromLocalStorage();
    const getCurrGameName = getNameFromLocalStorage();
    restoreOldGame(oldGame, topPrompt, leftPrompt, getCurrGameName);
    getOldTimeFromLocalStorage();
    correctStyle();
  }
}

function getNameFromLocalStorage() {
  const getCurrGameName = localStorage.getItem('savedCurrNameGame');
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = getCurrGameName;
  const restoredElement = tempContainer.firstChild;
  return restoredElement;
}

function getOldTimeFromLocalStorage() {
  const timer = document.getElementById('timer');
  const localMinutes = localStorage.getItem('savedMinutes');
  const localSeconds = localStorage.getItem('savedSeconds');
  seconds = Number(localSeconds);
  minutes = Number(localMinutes);
  const sec = localSeconds.toString().padStart(2, '0');
  const min = localMinutes.toString().padStart(2, '0');
  timer.innerHTML = `${min}:${sec}`;
  seconds += 1;
}

function getPromptTopFromLocalStorage() {
  const storedTopPrompt = localStorage.getItem('savedPromptTop');
  let top = document.createElement('div');
  top.classList.add('prompt-top');
  top.innerHTML = storedTopPrompt;
  top = top.firstChild;
  return top;
}

function getPromptLeftFromLocalStorage() {
  const storedLeftPrompt = localStorage.getItem('savedPromptLeft');
  let left = document.createElement('div');
  left.classList.add('prompt-left');
  left.innerHTML = storedLeftPrompt;
  left = left.firstChild;
  return left;
}

function getItemFromLocalStorage() {
  const storedElementsString = localStorage.getItem('savedElements');

  let container = document.createElement('div');
  container.classList.add('elements-wrapper');
  container.innerHTML = storedElementsString;
  container = container.firstChild;
  Array.from(container.children).forEach((el) => {
    el.addEventListener('click', handlerForCurrentClick);
    el.addEventListener('contextmenu', handlerForRightMouseClick);
  });
  return container;
}

function restoreOldGame(game, top, left, names) {
  document.getElementById('curr-game').remove();
  const fieldWrapper = document.querySelector('.field-wrapper');
  const elementsWrapper = document.querySelector('.elements-wrapper');
  const promptTop = document.querySelector('.prompt-top');
  const promptLeft = document.querySelector('.prompt-left');
  const inputWrapper = document.querySelector('.input-wrapper');
  promptTop.remove();
  promptLeft.remove();
  elementsWrapper.remove();
  fieldWrapper.insertAdjacentElement('beforebegin', top);
  inputWrapper.prepend(names);
  fieldWrapper.append(left, game);
}

function generateSoundForWin() {
  const audioPlayer = document.getElementById('myAudio');
  const onEnded = () => {
    playAudio(winInGame);
    audioPlayer.removeEventListener('ended', onEnded);
  };
  audioPlayer.addEventListener('ended', onEnded);
}

export function switchSoundInTheGame() {
  const buttonGame = document.querySelector('.switch-sound');
  if (buttonGame.innerHTML === 'Sound Off') {
    handlerSound = false;
    buttonGame.innerHTML = 'Sound On';
  } else {
    buttonGame.innerHTML = 'Sound Off';
    handlerSound = true;
  }
}
