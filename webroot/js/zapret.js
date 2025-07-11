import { exec } from "/node_modules/kernelsu/index.js";

class Zapret {
  constructor() {}

  async start() {
    try {
      var { stdout, stderr, errno } = await exec("zapret start");
      if (errno !== 0) {
        console.error(`code: ${errno}, stderr:\n${stderr}`);
        modal(`Ошибка shell. Код: ${errno}`, stderr);
      }

      modal("Zapret запущен", stdout);
    } catch (error) {
      console.error(`Error: ${error}`);
      modal("Ошибка javascript", error);
    }
  }

  async stop() {
    try {
      var { stdout, stderr, errno } = await exec("zapret stop");
      if (errno !== 0) {
        console.error(`code: ${errno}, stderr:\n${stderr}`);
        modal(`Ошибка shell. Код: ${errno}`, stderr);
      }

      modal("Zapret остоновлен", stdout);
    } catch (error) {
      console.error(`Error: ${error}`);
      modal("Ошибка javascript", error);
    }
  }

  async restart() {
    try {
      var { stdout, stderr, errno } = await exec("zapret restart");
      if (errno !== 0) {
        console.error(`code: ${errno}, stderr:\n${stderr}`);
        modal(`Ошибка shell. Код: ${errno}`, stderr);
      }

      modal("Zapret перезапущен", stdout);
    } catch (error) {
      console.error(`Error: ${error}`);
      modal("Ошибка javascript", error);
    }
  }

  async isRunning() {
    try {
      const { stdout, stderr, errno } = await exec("zapret status");
      if (errno !== 0) {
        console.error(`code: ${errno}, stderr:\n${stderr}`);
        modal(`Ошибка shell. Код: ${errno}`, stderr);
        return null;
      }

      var output = stdout.trim().toLowerCase();
      if (output.includes("не работает")) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      modal("Ошибка javascript", error);
      return null;
    }
  }
}

export { Zapret };
