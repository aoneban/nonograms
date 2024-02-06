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
  setTimeout(() => {
    alert(`You WON! ${nameGame}. Your time is: ${minutes}:${seconds}`);
  }, 500);
}
