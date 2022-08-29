import { app, Menu, Tray } from "electron";
import path from "path";
export default (window) => {
  const tray = new Tray(path.join(process.cwd(), "resources/unrelease/icon.ico"));

  // 创建托盘菜单栏
  const createContextMenu = () => {
    return Menu.buildFromTemplate([
      {
        label: "显示窗口",
        click() {
          window.show();
        },
      },
      {
        role: "quit",
        label: "退出",
      },
      {
        label: "重启",
        click() {
          app.relaunch();
          app.quit();
        },
      },
    ]);
  };
  // 托盘点击显示菜单栏
  tray.on("click", () => {
    tray.setContextMenu(createContextMenu());
    tray.popUpContextMenu();
  });
  // 托盘设置菜单栏
  tray.setContextMenu(createContextMenu());
};
