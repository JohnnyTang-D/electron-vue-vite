const path = require("path");
const esbuild = require("esbuild");
const os = require("os");
const fs = require("fs");
const getEnvScript = require("./getEnvScript");
/**
 * 构建主进程文件
 */
module.exports = function buildMain(envType = "dev") {
  //入口文件地址
  const entryFilePath = path.join(process.cwd(), "src/main/app.js");
  //输出文件
  const outfile = path.join(process.cwd(), "release/bundled/entry.js");
  // esbuild打包
  esbuild.buildSync({
    entryPoints: [entryFilePath],
    outfile,
    minify: !(envType === "dev"),
    bundle: true,
    platform: "node",
    sourcemap: envType === "dev",
    external: ["electron"], //用来排除掉electron
  });
  // 将开发环境脚本注入到主进程文件中
  const envScript = getEnvScript(envType);
  const js = `${envScript}${os.EOL}${fs.readFileSync(outfile)}`;
  fs.writeFileSync(outfile, js);
};
