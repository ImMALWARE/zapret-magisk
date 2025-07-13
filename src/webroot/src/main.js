import "./style.css";
import "@material/web/button/filled-button.js";
import { exec } from "kernelsu/index.js"
import { isKSU } from "./check";

const execTestButton = document.getElementById("exec-test-button")

async function execTest() {
  if (isKSU()) {
    const { stdout } = await exec("ls /system")
    console.log(stdout)
  } else {
    console.log("dev test")
  }
}
execTestButton.addEventListener("click", execTest)