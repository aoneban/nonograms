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
  audioPlayer.play();
}

export function showModalWindow(nameGame, minutes, seconds) {

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
