module.exports = {
  common: {
    APP_VERSION: require("../package.json").version, // 应用版本号
    HTTP_SERVER: "",
    ELECTRON_DISABLE_SECURITY_WARNINGS: true, // 屏蔽electron的安全警告
  },
  dev: {
    ...this.common,
    ENV_NOW: "development", // 开发环境 统一开发以及生产环境的入口
  },
  build: {
    ...this.common,
  },
};
