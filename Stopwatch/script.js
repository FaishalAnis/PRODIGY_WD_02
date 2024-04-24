let timer;
let isRunning = false;
let isPaused = false;
let startTime;
let elapsedTime = 0;
let lapCount = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const pauseButton = document.getElementById('pause');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsedTime += now - startTime;
  startTime = now;
  display.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    startStopButton.textContent = 'Stop';
    pauseButton.textContent = 'Pause';
    lapButton.disabled = false;
  } else if (!isPaused) {
    clearInterval(timer);
    startStopButton.textContent = 'Resume';
    pauseButton.textContent = 'Pause';
    lapButton.disabled = true;
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    startStopButton.textContent = 'Stop';
    pauseButton.textContent = 'Pause';
    lapButton.disabled = false;
  }
  isRunning = !isRunning;
}


function pause() {
  if (isRunning && !isPaused) {
    clearInterval(timer);
    isPaused = true;
    pauseButton.textContent = 'Resume';
  } else if (isRunning && isPaused) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    isPaused = false;
    pauseButton.textContent = 'Pause';
  }
}

function lap() {
  const lapTime = elapsedTime;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount++}: ${formatTime(lapTime)}`;
  lapsList.appendChild(lapItem);
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  isPaused = false;
  startStopButton.textContent = 'Start';
  pauseButton.textContent = 'Pause';
  lapButton.disabled = true;
  display.textContent = '00:00:00';
  elapsedTime = 0;
  lapCount = 1;
  lapsList.innerHTML = '';
}

startStopButton.addEventListener('click', startStop);
pauseButton.addEventListener('click', pause);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);
