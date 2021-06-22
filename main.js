// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const repo = require("./repo.js");

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile("index.html");

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
    createWindow();
    repo.initDB();
    repo.createUser({
        uuid: new Date().toString(),
        name: "franklin.zhang",
        dateOfBirth: new Date("1981-01-01"),
        dateOfDeath: new Date("1981-01-01"),
        gender: 1,
        password: "abcdefghil",
        emailAddress: "franklin.zhang@lincea.com",
        homeTelephoneNumber: "010-83838383",
        workTelephoneNumber: "020-28282828",
        mobilePhoneNumber: "18383838383",
        avatarUrl: "http://www.lincea.com/franklin_zhang.png",
    });

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code.
