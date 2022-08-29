import { app, protocol } from "electron";
import useWindowCreator from "./window/windowCreator";
import osType from "./utils/osType";
import createTray from "./utils/createTray";

const pluginApp = () => {
  let windowCreator;
  // 注册app协议
  protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
  ]);
  windowCreator = useWindowCreator();

  const beforeReady = () => {
    // 根据操作系统以及开发环境不同,对electron进行一些设置
    if (osType.macOS()) {
      if (!!process.env.ENV_NOW && !app.isInApplicationsFolder()) {
        app.moveToApplicationsFolder();
      } else {
        app.dock.hide();
      }
    } else {
      app.disableHardwareAcceleration();
    }
  };

  const onReady = () => {
    const ready = () => {
      // 创建窗口
      windowCreator.create();
      // 创建托盘
      createTray();
    };
    // 如果app准备好了,就加载页面
    if (!app.isReady()) {
      app.on("ready", ready);
    } else {
      ready();
    }
  };

  const onRunning = () => {
    // 开启第二个app的时候,重新设置窗口大小以及窗口获取焦点
    app.on("second-instance", () => {
      const win = windowCreator.getWindow();
      if (win) {
        if (win.isMinimized()) {
          win.restore();
        }
        win.focus();
      }
    });
    // 当app活跃的时候,如果没有窗口则重新创建
    app.on("activate", () => {
      if (!windowCreator.getWindow()) {
        windowCreator.create();
      }
    });
  };

  const onQuit = () => {
    // app退出的时候,安全退出app
    app.on("window-all-closed", () => {
      if (!osType.macOS()) {
        app.quit();
      }
    });
  };
  // 单实例模式设置,不能创建第二个app
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
  } else {
    beforeReady();
    onReady();
    onRunning();
    onQuit();
  }
};

pluginApp();
