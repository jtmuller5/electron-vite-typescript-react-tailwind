import { app, BrowserWindow, ipcMain } from "electron";
import path = require("node:path");

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load the index.html of the app.
  // mainWindow.loadFile("src/index.html");
  mainWindow.loadURL('http://localhost:5173'); // Load Vite dev server

  // Open DevTools (optional)
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

// Log all events
app.on("ready", () => console.log("ready"));
app.on("before-quit", () => console.log("before-quit"));
app.on("will-quit", () => console.log("will-quit"));
app.on("quit", () => console.log("quit"));
app.on("activate", () => console.log("activate"));
app.on("window-all-closed", () => console.log("window-all-closed"));

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("ping", () => "pong");

  // On macOS, it's common to re-create a window in the app when the dock icon is clicked
  // and there are no other windows open.
  app.on("activate", () => {
    console.log("activate");
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
