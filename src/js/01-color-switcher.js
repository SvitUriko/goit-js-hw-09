function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.disabled = true;

let timerId = null;



startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    
    clearInterval(timerId);
  });