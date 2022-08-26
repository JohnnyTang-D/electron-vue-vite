import { app, BrowserWindow } from "electron";

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(`http://localhost:${process.env.WEB_PORT}/`);
});
