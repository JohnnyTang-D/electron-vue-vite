// const path = require("path");
if (process.platform === "darwin") {
  module.exports = {};
} else {
  module.exports = {
    perMachine: true,
    allowElevation: true,
    allowToChangeInstallationDirectory: false, //是否可以自由的选择安装目录
    // include: path.join(process.cwd(), "script/common/installer.nsh"), // nsis安装过程生命周期中执行一些操作
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "youAppName",
    oneClick: false,
    // installerIcon: "../../resource/unrelease/favicon.ico",//路径有问题 暂时用不了
    // uninstallerIcon: "../../resource/unrelease/favicon.ico",
    // installerHeader: "../../resource/unrelease/favicon.ico",
    // installerHeaderIcon: "../../resource/unrelease/favicon.ico",
  };
}
