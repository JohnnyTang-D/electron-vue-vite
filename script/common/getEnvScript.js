const config = require("../config");
const path = require("path");
module.exports = function getEnvScript(envType = "dev") {
  const env = config[envType];
  let script = "";
  if (envType === "dev") {
    env.WEB_PORT = require("../dev/index").serverPort; // Node环境变量设置端口号
    env.RES_DIR = path.join(process.cwd(), "resources/release"); // 设置存放外部资源的Node环境变量
  } else {
    script += "precess.env.RES_DIR = process.resourcesPath;";
  }
  for (let envKey in env) {
    script += `process.env.${envKey} = "${env[envKey]}";`;
  }
  return script;
};
