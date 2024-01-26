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