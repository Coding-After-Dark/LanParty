const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const fs = require('fs');
const say = require('say')
const { dialog } = require('electron')
const url = require('url');

const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

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
        say.speak(result + " has now been uploaded")

        console.log("DONE")

        c.end();
    });
  })
}


})

ipcMain.on('getGame', (event, arg) => {
  
  var bizz = app.getPath('downloads');
  console.log(bizz)
  console.log(arg);
  const fileUrl = bizz + "/" + arg;
  c.connect({ 'host': serverIP, 'port': 20000 });
  c.size(arg, function (err, fileSize) {
    var size = fileSize
    var data = 0;
    var percentage = 0;
    var count = 0;
    console.log(fileUrl)
    c.get(arg, function (err, stream) {
      if (err) throw err;
      stream.on('data', function (chunk) {
        data += chunk.length;
        if (count == 1000) {
          console.log(count);
          percentage = data / size * 100;

          win.webContents.send('updateP', { percentage: percentage, name: arg })
          count = 0;
        }
        else {
          count++;
        }
      })
      stream.once('close', function () {
        say.speak(arg + " has now been downloaded")

        console.log(data, size, percentage);
        console.log("DONE")
        win.webContents.send('stopDownloading', arg)

        c.end();
      });
      console.log('saving at :' + fileUrl)
      stream.pipe(fs.createWriteStream(fileUrl));

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
  
  if (serve) {
    require('electron-reload')(__dirname, {
     electron: require(`${__dirname}/node_modules/electron`)});
    win.loadURL('http://localhost:4200');

  } else {
    var url = url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
    })
    win.loadURL(url);


  }

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