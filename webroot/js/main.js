import { Zapret } from "/js/zapret.js";
import { Config } from "/js/config.js";

const header = document.getElementById("header");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const restartButton = document.getElementById("restartButton");
const statusButton = document.getElementById("statusButton");
const autostartSwitch = document.getElementById("autostart-switch");

const zapret = new Zapret();

async function handleStart() {
  await zapret.start();
  await updateUI();
}

async function handleStop() {
  await zapret.stop();
  await updateUI();
}

async function handleRestart() {
  await zapret.restart();
  await updateUI();
}

async function updateUI() {
  console.log("Вызван updateUI");
  var isRunning = await zapret.isRunning();
  console.log(`Статус zapret: ${isRunning}`);

  if (isRunning === true) {
    header.textContent = "Zapret работает";
    startButton.disabled = true;
    stopButton.disabled = false;
    restartButton.disabled = false;
    autostartSwitch.disabled = false;
  } else if (isRunning === false) {
    header.textContent = "Zapret не работает";
    startButton.disabled = false;
    stopButton.disabled = true;
    restartButton.disabled = false;
    autostartSwitch.disabled = false;
  } else {
    header.textContent = "Произошла ошибка!";
    startButton.disabled = true;
    stopButton.disabled = true;
    restartButton.disabled = true;
    autostartSwitch.disabled = true;
  }
}

startButton.addEventListener("click", handleStart);
stopButton.addEventListener("click", handleStop);
restartButton.addEventListener("click", handleRestart);
statusButton.addEventListener("click", updateUI);

document.addEventListener("DOMContentLoaded", updateUI);

await Config.readConfig()
