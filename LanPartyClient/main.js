const { app, BrowserWindow } = require('electron')
const {ipcMain} = require('electron')
const fs = require('fs');
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
  .broadcast({port: 3024, filter:['Server']})
  .onNode((data, rinfo) => {

    serverIP = rinfo.address;
    console.log(serverIP);

  });
  


  ipcMain.on('getServerIP', (event, arg) => {
    console.log(arg)  // prints "ping"
    event.returnValue = serverIP
  });

  ipcMain.on('getGame', (event, arg) => {
    console.log(arg)  // prints "ping"
    c.connect({'host': serverIP, 'port': 20000});
    c.get(arg, function(err, stream) {
      if (err) throw err;
      stream.once('close', function() { c.end(); });
      stream.pipe(fs.createWriteStream(arg));
    });
  });




function createWindow () {

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

