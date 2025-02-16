"use strict";
const electron = require("electron");
const path = require("node:path");
let mainWindow = null;
const createWindow = () => {
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};
electron.app.on("ready", () => console.log("ready"));
electron.app.on("before-quit", () => console.log("before-quit"));
electron.app.on("will-quit", () => console.log("will-quit"));
electron.app.on("quit", () => console.log("quit"));
electron.app.on("activate", () => console.log("activate"));
electron.app.on("window-all-closed", () => console.log("window-all-closed"));
electron.app.whenReady().then(() => {
  createWindow();
  electron.ipcMain.handle("ping", () => "pong");
  electron.app.on("activate", () => {
    console.log("activate");
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") electron.app.quit();
});
