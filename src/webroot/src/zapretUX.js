import { showGeneralModal, showFullscreenModal } from "./modal";
import { exec } from "kernelsu";
export class ZapretUX {
  async start() {
    try {
      var { stdout, stderr, errno } = await exec("zapret start");
      if (errno !== 0) {
        if (stdout.length + stderr.length > 300) {
          showFullscreenModal(
            "Ошибка shell",
            `<p>stdout: ${stdout}</p>
            <p>stderr: ${stderr}</p>
            <p>errno: ${errno}</p>`
          );
        } else {
          showGeneralModal("Ошибка shell", `stdout: ${stdout}\n stderr: ${stderr}\n errno: ${errno}`);
        }
      }
      if (stdout.length + stderr.length > 300) {
        showFullscreenModal("Zapret запушен", `<p>${stdout}</p>`);
      } else {
        showGeneralModal("Zapret запушен", `${stdout}`);
      }
    } catch (error) {
      showGeneralModal("Ошибка javascript", error);
    }
  }

  async stop() {
    try {
      var { stdout, stderr, errno } = await exec("zapret stop");
      if (errno !== 0) {
        if (stdout.length + stderr.length > 300) {
          showFullscreenModal(
            "Ошибка shell",
            `<p>stdout: ${stdout}</p>
            <p>stderr: ${stderr}</p>
            <p>errno: ${errno}</p>`
          );
        } else {
          showGeneralModal("Ошибка shell", `stdout: ${stdout}\n stderr: ${stderr}\n errno: ${errno}`);
        }
      }
      if (stdout.length + stderr.length > 300) {
        showFullscreenModal("Zapret остоновлен", `<p>${stdout}</p>`);
      } else {
        showGeneralModal("Zapret остоновлен", `${stdout}`);
      }
    } catch (error) {
      showGeneralModal("Ошибка javascript", error);
    }
  }

  async restart() {
    try {
      var { stdout, stderr, errno } = await exec("zapret restart");
      if (errno !== 0) {
        if (stdout.length + stderr.length > 300) {
          showFullscreenModal(
            "Ошибка shell",
            `<p>stdout: ${stdout}</p>
            <p>stderr: ${stderr}</p>
            <p>errno: ${errno}</p>`
          );
        } else {
          showGeneralModal("Ошибка shell", `stdout: ${stdout}\n stderr: ${stderr}\n errno: ${errno}`);
        }
      }
      if (stdout.length + stderr.length > 300) {
        showFullscreenModal("Zapret перезапущен", `<p>${stdout}</p>`);
      } else {
        showGeneralModal("Zapret перезапущен", `${stdout}`);
      }
    } catch (error) {
      showGeneralModal("Ошибка javascript", error);
    }
  }

  async isRunning() {
    try {
      const { stdout, stderr, errno } = await exec("zapret status");
      if (errno !== 0) {
        showGeneralModal("Ошибка shell", `stdout: ${stdout}\n stderr: ${stderr}\n errno: ${errno}`);
      }

      var output = stdout.trim().toLowerCase();
      if (output.includes("не работает")) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      showGeneralModal("Ошибка javascript", error);
    }
  }
}
