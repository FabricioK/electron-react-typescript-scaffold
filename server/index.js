const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      enableRemoteModule: true,
      preload: `${__dirname}/preload.js`,
      nodeIntegration: true
    }
  })

  //REMOVE O MENU SUPERIOR
  //win.removeMenu();

  //CARREGUA O AMBIENTE DE HOMOLOGAÇÃO
  if (process.env.NODE_ENV === 'local') {
    win.loadURL(`http://localhost:${process.env.PORT}`);
  }else{
    win.loadFile('public/index.html');
  }

  win.webContents.openDevTools({
    mode: 'detach'
  });

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})