import "beercss";
import "material-dynamic-colors";
import "@fontsource/montserrat";
import "./modal";
import "./style.css";

import { ZapretUX } from "./zapretUX";
const zapretUX = new ZapretUX();

const headerTitle = document.getElementById("header-title");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const btnRestart = document.getElementById("btn-restart");
const btnStatus = document.getElementById("btn-status");
const switchAutostart = document.getElementById("switch-autostart");

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
  var isRunning = await zapretUX.isRunning();
  console.log(`Статус zapret: ${isRunning}`);

  if (isRunning === true) {
    headerTitle.textContent = "Zapret работает";
    btnStart.disabled = true;
    btnStop.disabled = false;
    btnRestart.disabled = false;
    switchAutostart.disabled = false;
  } else if (isRunning === false) {
    headerTitle.textContent = "Zapret не работает";
    btnStart.disabled = false;
    btnStop.disabled = true;
    btnRestart.disabled = false;
    switchAutostart.disabled = false;
  } else {
    headerTitle.textContent = "Произошла ошибка!";
    btnStart.disabled = true;
    btnStop.disabled = true;
    btnRestart.disabled = true;
    switchAutostart.disabled = true;
  }
}
btnStart.addEventListener("click", handleStart);
btnStop.addEventListener("click", handleStop);
btnRestart.addEventListener("click", handleRestart);
btnStatus.addEventListener("click", updateUI);

document.addEventListener("DOMContentLoaded", updateUI);
