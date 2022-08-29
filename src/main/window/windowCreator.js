import { BrowserWindow } from "electron";
export default () => {
  let win;
  const create = () => {
    win = new BrowserWindow({
      height: 60,
      width: 800,
      useContentSize: true,
      resizable: true,
      frame: false,
      title: "插件运行环境",
      show: !!process.env.ENV_NOW,
      skipTaskbar: true,
      webPreferences: {
        webSecurity: false,
        backgroundThrottling: false,
        contextIsolation: false,
        webviewTag: true,
        nodeIntegration: true,
      },
    });
    win.loadURL(`http://localhost:${process.env.WEB_PORT}/`);
  };
  const getWindow = () => win;
  return {
    create,
    getWindow,
  };
};
