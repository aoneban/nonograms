import { nameGameForModal } from '../index';
import { nameGame } from '../index';
import { matrices } from './data';

let intervalRunning = false;
let handlerInterval;
let seconds = 0;
let minutes = 0;
let counterResults = 1;

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
    
    const root = document.createElement('div');
    root.setAttribute('id', 'root');

    const nameGame = document.createElement('h1');
    nameGame.classList.add('name-game');
    nameGame.textContent = 'Nonograms';

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
          } else {
            newElem.classList.add('base-elem', 'elem', 'gray', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
          }
        } else if (matrix.length > 5 && matrix.length <= 10) {
          if (matrix[i][j]) {
            newElem.classList.add('base-elem', 'elem2', 'black', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
          } else {
            newElem.classList.add('base-elem', 'elem2', 'gray', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
          }
        } else if (matrix.length > 10) {
          if (matrix[i][j]) {
            newElem.classList.add('base-elem', 'elem3', 'black', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
          } else {
            newElem.classList.add('base-elem', 'elem3', 'gray', `row${i}-${j}`);
            newElem.addEventListener('click', generateTimer);
            elementsWrapper.append(newElem);
          }
        }
      }
    }
    fieldsWrapper.append(elementsWrapper);

    root.append(timer, fieldsWrapper);
    document.body.append(nameGame, root);

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
        const value = new String(this.resultArrayLeft[i]).replaceAll(',', ' ');
        newElem.classList.add('prompt-left__value');
        newElem.textContent = value;
        root.append(newElem);
      } else if (this.resultArrayLeft.length > 5 && this.resultArrayLeft.length <= 10) {
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayLeft[i]).replaceAll(',', ' ');
        newElem.classList.add('prompt-left__value2');
        newElem.textContent = value;
        root.append(newElem);
      } else if (this.resultArrayLeft.length > 10) {
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayLeft[i]).replaceAll(',', ' ');
        newElem.classList.add('prompt-left__value3');
        newElem.textContent = value;
        root.append(newElem);
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
        root.classList.add('prompt-top')
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayTop[i]).replaceAll(',', ' ');
        newElem.classList.add('prompt-top__value');
        newElem.textContent = value;
        root.append(newElem);
      } else if (this.resultArrayTop.length > 5 && this.resultArrayTop.length <= 10) {
        root.classList.add('prompt-top', 'prompt-top2');
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayTop[i]).replaceAll(',', ' ');
        newElem.classList.add('prompt-top2__value2');
        newElem.textContent = value;
        root.append(newElem);
      } else if (this.resultArrayTop.length > 10) {
        root.classList.add('prompt-top', 'prompt-top3');
        const newElem = document.createElement('div');
        const value = new String(this.resultArrayTop[i]).replaceAll(',', ' ');
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
  const blacksFields = document.querySelectorAll('.black');
  blacksFields.forEach((item) => {
    if (!item.classList.contains('show-color')) {
      resultLength.push(item);
    }
  });
  if (resultLength.length === 0) {
    let nameGameToAlert = nameGameForModal(nameGame);
    const sec = (seconds - 1).toString().padStart(2, '0');
    const min = minutes.toString().padStart(2, '0');
    alert(`You WON! ${nameGameToAlert}. Your time is: ${min}:${sec}`);
    localStorage.setItem(nameGameToAlert, `${min}:${sec}`);
    writeResultToTable(nameGameToAlert, counterResults);
    document.removeEventListener('click', generateTimer);
    clearInterval(handlerInterval);
    intervalRunning = false;
    counterResults += 1;
  }
}

function handlerForCurrentClick(e) {
  const currentElement = e.target;
  currentElement.classList.toggle('show-color');
  handlerClicks();
}

function handlerForRightMouseClick(e) {
  e.preventDefault();
  const currentElement = e.target;
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
  });
}

export function resetGameFunction() {
  const elements = document.querySelectorAll('.base-elem');
  elements.forEach((el) => {
    if (el.classList.contains('show-color')) {
      el.classList.remove('show-color');
    }
  });
  clearInterval(handlerInterval);
  intervalRunning = false;
  const timer = document.getElementById('timer');
  timer.textContent = '00:00';
  seconds = 0;
  minutes = 0;
}
export function choseNewGame() {
  const drop = document.getElementById('myDropdown');
  drop.addEventListener('click', (event) => {
    removeElements();
    const game = event.target.innerText;
    const newGame = new GenerateGame(matrices[game]);
    newGame.createGame(matrices[game]);
  });
}

export function removeElements() {
  document.querySelector('.name-game').remove();
  document.getElementById('root').remove();
}

export function showGameSolution() {
  const elements = document.querySelectorAll('.base-elem');
  elements.forEach(el => {
    if(el.classList.contains('show-color')) {
      el.classList.remove('show-color');
    }
  })
  elements.forEach((el) => {
    if (el.classList.contains('black')) {
      el.classList.add('show-color');
    }
  });
}

export function saveGameFunction() {
  const button = document.querySelector('.save-game');
  if (button.innerHTML === 'Save Game') {
    button.innerHTML = 'Continue Game';
    // записываю сохраненную игру в локалсторейдж
    const elementsWrapper = document.querySelector('.elements-wrapper');
    const promptTop = document.querySelector('.prompt-top');
    const promptLeft = document.querySelector('.prompt-left');
    const elementsString = elementsWrapper.outerHTML;
    const promptTopString = promptTop.outerHTML;
    const promptLeftString = promptLeft.outerHTML;
    localStorage.setItem('savedElements', elementsString);
    localStorage.setItem('savedPromptTop', promptTopString);
    localStorage.setItem('savedPromptLeft', promptLeftString);
  } else {
    button.innerHTML = 'Save Game';
    // f1() start получаю данные из локалсторейдж и восстанавливаю структуру DOM
    const oldGame = getItemFromLocalStorage();
    const topPrompt = getPromptTopFromLocalStorage();
    const leftPrompt = getPromptLeftFromLocalStorage();
    restoreOldGame(oldGame, topPrompt, leftPrompt);
    // f1()end
  }
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
  });
  return container;
}

function restoreOldGame(game, top, left) {
  const fieldWrapper = document.querySelector('.field-wrapper');
  const elementsWrapper = document.querySelector('.elements-wrapper');
  const promptTop = document.querySelector('.prompt-top');
  const promptLeft = document.querySelector('.prompt-left');
  promptTop.remove();
  promptLeft.remove();
  elementsWrapper.remove();
  fieldWrapper.insertAdjacentElement('beforebegin', top);
  fieldWrapper.append(left, game);
}
