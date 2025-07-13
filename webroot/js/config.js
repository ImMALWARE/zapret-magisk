import { exec } from "/node_modules/kernelsu/index.js";

class Config {
  constructor() {}
  static #config_path = "/data/adb/zapret/config.json";
  static #config;

  static async readConfig() {
    try {
      var { stdout, stderr, errno } = await exec(`cat ${Config.#config_path}`);
      if (errno !== 0) {
        console.error(`code: ${errno}, stderr:\n${stderr}`);
        modal(`Ошибка shell. Код: ${errno}`, stderr);
      }

      var parsedConfig;
      try {
        var parsedConfig = JSON.parse(stdout.trim());
      } catch (parseError) {
        console.error(`Error: ${parseError}`);
        modal("Ошибка парсинга конфига", "Не удалось разобрать JSON файл конфигурации.");
        Config.#config = null;
      }

      Config.#config = parsedConfig;
      console.log("Config.readConfig: Конфиг успешно загружен.", Config.#config);
      return Config.#config;
    } catch (error) {
      console.error(`Error: ${error}`);
      modal("Ошибка javascript", error);
    }
  }

  static async writeConfig() {
    try {
      var parsedConfig = JSON.stringify(Config.#config, null, 2);
    } catch (parseError) {

    }
    try {
      var { stdout, stderr, errno } = await exec(`echo '${parsedConfig}' > '${Config.#config_path}'`);
    } catch (error) {

    }
  }
}

export { Config };
