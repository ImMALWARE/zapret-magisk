import { Zapret } from "/js/zapret.js";

const header = document.getElementById("header");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const enableButton = document.getElementById("enableButton");
const disableButton = document.getElementById("disableButton");
const restartButton = document.getElementById("restartButton");
const statusButton = document.getElementById("statusButton");

const zapret = new Zapret();

async function handleStart() {
  await zapret.start();
}

async function handleStop() {
  await zapret.stop();
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
  var isRunning = await zapret.isRunning();

  if (isRunning === true) {
    header.textContent = "Zapret работает";
  } else if (isRunning === false) {
    header.textContent = "Zapret не работает";
  } else {
    header.textContent = "Произошла ошибка!";
    console.log(isRunning);
  }
}

startButton.addEventListener("click", handleStart);
stopButton.addEventListener("click", handleStop);
enableButton.addEventListener("click", handleEnable);
disableButton.addEventListener("click", handleDisable);
restartButton.addEventListener("click", handleRestart);
statusButton.addEventListener("click", handleStatus);
