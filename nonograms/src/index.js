import './index.scss';
import { data1 } from './modules/data';

class GenerateGame {
  constructor(matrix) {
    this.matrix = matrix;
    this.resultArray = this.getArrayToPromptLeft(matrix);
  }

  getArrayToPromptLeft(arr) {
    const result = [];
    let newArr = [];
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

  createGame(matrix) {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    const elementsWrapper = document.createElement('div');
    elementsWrapper.classList.add('elements-wrapper');

    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix[i].length; j += 1) {
        const newElem = document.createElement('div');
        if (matrix[i][j]) {
          newElem.classList.add('black', `row${i}`);
          elementsWrapper.append(newElem);
        } else {
          newElem.classList.add('gray', `row${i}`);
          elementsWrapper.append(newElem);
        }
      }
    }

    root.append(elementsWrapper);
    document.body.append(root);

    this.promptLeft(matrix);
  }

  promptLeft() {
    const root = document.createElement('div');
    root.setAttribute('class', 'prompt-left');

    const wrapper = document.querySelector('.elements-wrapper')

    for (let i = 0; i < this.resultArray.length; i += 1) {
      const newElem = document.createElement('div');
      const value = new String(this.resultArray[i]).replaceAll(',', ' ');
      newElem.classList.add('prompt-left__value')
      newElem.textContent = value;
      root.append(newElem);
    }

    wrapper.before(root);
  }
}

const firstGame = new GenerateGame(data1);
firstGame.createGame(data1);
