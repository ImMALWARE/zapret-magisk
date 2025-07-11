const header = document.getElementById('header');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const enableButton = document.getElementById('enableButton');
const disableButton = document.getElementById('disableButton');
const restartButton = document.getElementById('restartButton');
const statusButton = document.getElementById('statusButton');

function handleStart() {
  header.textContent = 'Кнопка "start" нажата!'
  console.log('Кнопка "start" нажата!');
}

function handleStop() {
  console.log('Кнопка "stop" нажата!');
}

function handleEnable() {
  console.log('Кнопка "enable" нажата!');
}

function handleDisable() {
  console.log('Кнопка "disable" нажата!');
}

function handleRestart() {
  console.log('Кнопка "restart" нажата!');
}

async function handleStatus() {
  console.log('Кнопка "status" нажата!');
}

// Прикрепляем обработчики событий 'click' к каждой кнопке
startButton.addEventListener('click', handleStart);
stopButton.addEventListener('click', handleStop);
enableButton.addEventListener('click', handleEnable);
disableButton.addEventListener('click', handleDisable);
restartButton.addEventListener('click', handleRestart);
statusButton.addEventListener('click', handleStatus);