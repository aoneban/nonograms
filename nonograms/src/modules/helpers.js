import { dataText } from "./data";
import ImgOne from '../assets/images/nonogram_black.jpg';
import ImgTwo from '../assets/images/nonogram_color.jpg';

export function createAudioPlayer() {
  const audioContainer = document.createElement('div');
  audioContainer.setAttribute('id', 'audio-container');
  const audioPlayer = document.createElement('audio');
  audioPlayer.setAttribute('id', 'myAudio');

  audioContainer.append(audioPlayer);
  document.body.append(audioContainer);
}

export function playAudio(audioSource) {
  const audioPlayer = document.getElementById('myAudio');

  if (!audioPlayer) {
    createAudioPlayer();
  }

  audioPlayer.src = audioSource;
  var playPromise = audioPlayer.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
    })
    .catch(error => {
      console.log(error)
    });
  }
}

export function showModalWindowFinish(nameGame, minutes, seconds) {

    const modal = document.createElement('div');
    modal.setAttribute('id', 'myModal');
    modal.classList.add('modal');

    const content = document.createElement('div');
    content.classList.add('modal-content');

    const congrats = document.createElement('p');
    congrats.classList.add('congrats');
    congrats.textContent = 'You WON!';

    const nameLastGame = document.createElement('p');
    nameLastGame.classList.add('last-game');
    nameLastGame.textContent = nameGame;

    const gameTime = document.createElement('p');
    gameTime.classList.add('game-time');
    gameTime.textContent = `Your time: ${minutes}:${seconds}`;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-modal');
    button.textContent = 'Close';
    button.addEventListener('click', () => {
      modal.remove();
    } )

    content.append(congrats, nameLastGame, gameTime, button);
    modal.append(content);
    document.body.append(modal);
  
}

export function showModalWindowStart(startGame) {

  const modal = document.createElement('div');
  modal.setAttribute('id', 'myModal');
  modal.classList.add('modal2');

  const content = document.createElement('div');
  content.classList.add('modal-content2');

  const greeting = document.createElement('p');
  greeting.classList.add('last-game');
  greeting.innerHTML = dataText;

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('image-wrap')

  const imageOne = new Image();
  imageOne.classList.add('image-game');
  imageOne.src = ImgOne;

  const imageTwo = new Image();
  imageTwo.classList.add('image-game');
  imageTwo.src = ImgTwo;

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-modal');
  button.textContent = 'Start Game';
  button.addEventListener('click', () => {
    localStorage.setItem('key', 1);
    modal.remove();
    startGame;
  } )
  
  imageWrapper.append(imageOne, imageTwo)
  content.append(greeting, imageWrapper, button);
  modal.append(content);
  document.body.append(modal);

}

export function correctStyle() {
  const items = document.querySelectorAll('.base-elem');
  if (items.length <= 25) {
    document.getElementById('root').style.width = '23.8em';
  } else if (items.length > 25 && items.length <= 100) {
    document.getElementById('root').style.width = '25.8em';
  } else if (items.length > 100) {
    document.getElementById('root').style.width = '26.8em';
  }
}