import { toast, exec } from "/node_modules/kernelsu/index.js";

class Zapret {
  constructor() {}

  async isRunning() {
    try {
      var { stdout, stderr, errno } = await exec("zapret status");

      if (errno != 0) {
        console.error(`code: ${errno}, stderr:\n${stderr}`);
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
      return null;
    }
  }

  async stop() {
    try {
      var { stdout, stderr, errno } = await exec("zapret stop");
      if (errno != 0) {
        console.error(`code: ${errno}, stderr:\n${stderr}`);
        toast(`ExitCode: ${errno}, stderr:\n${stderr}`)
      }

    } catch (error) {
      console.error(`Error: ${error}`);
      toast(`Error: ${error}`)
    }
  } 
}

export { Zapret };
