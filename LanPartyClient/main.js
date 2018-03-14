const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const fs = require('fs');
const say = require('say')
const { dialog } = require('electron')

let win;
let serverIP = "1.2.3.4";

var Client = require('ftp');
var c = new Client();
const UdpNode = require('udp-node')
const six = new UdpNode()
six
  .set({
    name: 'Six',
    type: 'machine',
    port: 3025
  })
  .broadcast({ port: 3024, filter: ['Server'] })
  .onNode((data, rinfo) => {
    serverIP = rinfo.address;
    console.log(serverIP);
  });

ipcMain.on('getServerIP', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = serverIP
});

ipcMain.on('selectGame', () => {
  var gameURL = dialog.showOpenDialog({ properties: ['openFile'] })
  console.log(gameURL);
  if(gameURL){
    gameURL = gameURL[0]
  c.connect({ 'host': serverIP, 'port': 20000 });
  c.on('ready', () => {
    console.log("lets do dis")
    var parts = gameURL.split("\\");
    var result = parts[parts.length - 1]
    c.append(gameURL, result, function (err,stream) {
      if (err) throw err;
      c.end();
    });
  })
}


})

ipcMain.on('getGame', (event, arg) => {

  c.connect({ 'host': serverIP, 'port': 20000 });
  c.size(arg, function (err, fileSize) {
    var size = fileSize
    var data = 0;
    var bla = 0;
    var count = 0;
    c.get(arg, function (err, stream) {
      if (err) throw err;
      stream.on('data', function (chunk) {
        data += chunk.length;
        if (count == 1000) {
          console.log(count);
          bla = data / size * 100;

          win.webContents.send('updateP', { procent: bla, name: arg })
          count = 0;
        }
        else {
          count++;
        }
      })
      stream.once('close', function () {
        say.speak(arg + " has now been installed")

        console.log(data, size, bla);
        console.log("DONE")
        win.webContents.send('stopDownloading', arg)

        c.end();
      });
      stream.pipe(fs.createWriteStream(arg));

    });

  });

});


function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })
  win.loadURL(`file://${__dirname}/dist/index.html`)
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()
  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
  say.speak("Wut da fuck!")
}
// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})