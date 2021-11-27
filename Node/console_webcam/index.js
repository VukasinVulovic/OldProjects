const { app, ipcMain, BrowserWindow } = require('electron');

app.whenReady().then(() => {
    const window = new BrowserWindow({
        title: 'Webcam Handler',
        width: 640,
        height: 480,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadFile(`${__dirname}\\index.html`);
    ipcMain.on('stream-data', console.log);
});