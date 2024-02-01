export let intervalRunning = false;
export let handlerInterval;

export function handlerClicks() {
  const resultLength = new Array();
  const blacksFields = document.querySelectorAll('.black');
  blacksFields.forEach((item) => {
    if (!item.classList.contains('show-color')) {
      resultLength.push(item);
    }
  });
  if (resultLength.length === 0) {
    alert('WIN!');
    document.removeEventListener('click', myInterval);
    clearInterval(handlerInterval);
    intervalRunning = false;
  }
}

export function handlerForCurrentClick(e) {
  const currentElement = e.target;
  currentElement.classList.toggle('show-color');
  handlerClicks();
}

export function handlerForRightMouseClick(e) {
  e.preventDefault();
  const currentElement = e.target;
  currentElement.classList.toggle('crossed');
  console.log(currentElement);
}

document.addEventListener('click', myInterval);

export function myInterval() {
  if (!intervalRunning) {
    intervalRunning = true;
    const timer = document.getElementById('timer');
    const elements = document.querySelectorAll('.base-elem');
    let seconds = 0;
    let minutes = 0;
    elements.forEach((el) => {
      if (el.classList.contains('show-color')) {
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
    });
  }
}

export function generateTimer(e) {
  const timer = document.getElementById('timer');
  console.log(timer);
  let seconds = 0;
  let minutes = 0;
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
