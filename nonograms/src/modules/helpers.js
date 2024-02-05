// export function createAudioPlayer(audioSource) {
//   let audioContainer = document.getElementById('audio-container');
//   if (!audioContainer) {
//     audioContainer = document.createElement('div');
//     audioContainer.setAttribute('id', 'audio-container');
//     document.body.append(audioContainer);
//   }

//   const audioPlayer = document.createElement('audio');
//   audioPlayer.setAttribute('id', 'myAudio');

//   audioPlayer.setAttribute('autoplay', 'autoplay');

//   const source = document.createElement('source');
//   source.src = audioSource;
//   source.type = 'audio/mp3';

//   audioPlayer.append(source);

//   audioContainer.append(audioPlayer);
// }


export function createAudioPlayer() {
    // Создаем контейнер для аудио
    const audioContainer = document.createElement('div');
    audioContainer.setAttribute('id', 'audio-container');
  
    // Создаем элемент аудиоплеера
    const audioPlayer = document.createElement('audio');
    audioPlayer.setAttribute('id', 'myAudio');
  
    // Добавляем аудиоплеер в контейнер
    audioContainer.append(audioPlayer);
  
    // Добавляем контейнер на страницу
    document.body.append(audioContainer);
  }
  
  // Функция для воспроизведения аудио
  export function playAudio(audioSource) {
    // Получаем аудиоплеер из контейнера
    const audioPlayer = document.getElementById('myAudio');
  
    // Если аудиоплеера нет, создаем его
    if (!audioPlayer) {
      createAudioPlayer();
    }
  
    // Устанавливаем источник аудио
    audioPlayer.src = audioSource;
  
    // Запускаем воспроизведение
    audioPlayer.play();
  }