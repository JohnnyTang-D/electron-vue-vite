const vite = require("vite");
const vue = require("@vitejs/plugin-vue");
const path = require("path");
const child_process = require("child_process");
const buildMain = require("../common/buildMain");
const dev = {
  server: null,
  serverPort: 1600,
  /**
   * 创建Vite服务
   * @returns {Promise<void>}
   */
  async createServer() {
    const options = {
      configFile: false,
      root: process.cwd(), //项目根目录 用Node获取
      server: {
        port: this.serverPort,
      },
      plugins: [vue()],
    };
    // 用vite创建服务
    this.server = await vite.createServer(options);
    await this.server.listen();
    // 打印服务ip以及port
    this.server.printUrls();
  },
  createElectronProcess() {
    const electronProcess = child_process.spawn(
      require("electron").toString(),
      [path.join(process.cwd(), "release/bundled/entry.js")],
      {
        cwd: process.cwd(),
      }
    );
    electronProcess.on("close", () => {
      this.server.close();
      process.exit();
    });
    electronProcess.stdout.on("data", (data) => {
      data = data.toString();
      console.log(data);
    });
  },
  async start() {
    // 开启渲染进程服务
    await this.createServer();
    // 构建主进程文件
    buildMain("dev");
    // 创建electron进程
    this.createElectronProcess();
  },
};

dev.start();
module.exports = dev;
