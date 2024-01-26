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
    currentElement.classList.toggle('crossed')
    console.log(currentElement)
  }