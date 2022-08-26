const vite = require("vite");
const path = require("path");
const fs = require("fs");
const buildMain = require("../common/buildMain");
const build = {
  /**
   * 打包渲染进程代码
   * @returns {Promise<void>}
   */
  async buildRender() {
    const options = {
      root: process.cwd(),
      build: {
        minify: true,
        outDir: path.join(process.cwd(), "release/bundled"),
      },
    };
    await vite.build(options);
  },
  /**
   * 打包生成相关依赖文件
   */
  buildModule() {
    const pkgJsonPath = path.join(process.cwd(), "package.json");
    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    const electronConfig = localPkgJson.devDependencies.electron.replace("^", "");
    delete localPkgJson.scripts;
    delete localPkgJson.devDependencies;
    localPkgJson.main = "entry.js";
    localPkgJson.devDependencies = { electron: electronConfig };
    fs.writeFileSync(
      path.join(process.cwd(), "release/bundled/package.json"),
      JSON.stringify(localPkgJson)
    );
    fs.mkdirSync(path.join(process.cwd(), "release/bundled/node_modules"));
  },
  buildInstaller() {
    // electron-builder配置项
    const options = {
      config: {
        directories: {
          output: path.join(process.cwd(), "release"),
          app: path.join(process.cwd(), "release/bundled"),
        },
        // files:[],
        extends: null,
        productName: "yourProductName",
        // appId:"appId",
        asar: true,
        extraResources: require("../common/buildConfig/extraResources.js"),
        win: require("../common/buildConfig/winConfig.js"),
        mac: require("../common/buildConfig/macConfig.js"),
        nsis: require("../common/buildConfig/nsisConfig.js"),
        // publish: [{ provider: "generic", url: "" }],//自动更新
      },
    };
    const builder = require("electron-builder");
    return builder.build(options);
  },
  async start() {
    // 构建渲染进程文件
    await this.buildRender();
    // 构建主进程文件
    buildMain("release");
    // 构建模块依赖
    this.buildModule();
    this.buildInstaller();
  },
};
build.start();
