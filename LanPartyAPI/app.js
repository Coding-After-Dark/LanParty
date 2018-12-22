var express = require('express');
var path = require('path');
var appExp = express();
var fs = require('fs');
var Datastore = require('nedb'), db = new Datastore({ filename: 'GameDatabase', autoload: true });
var savedGames;


function getRandomColor() {
  var r = (Math.round(Math.random() * 127) + 127).toString(16);
  var g = (Math.round(Math.random() * 127) + 127).toString(16);
  var b = (Math.round(Math.random() * 127) + 127).toString(16);
  return '#' + r + g + b;
}



readFiles() // found @ https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
function readFiles() {
  var dirname = path.join(__dirname, 'public/');
  console.log(dirname)
  fs.readdir(dirname, function (err, filenames) {
  console.log(filenames)
  filenames = filenames.filter(p => p.includes('.rar'))
    awesomeArray = [];
    for (let index = 0; index < filenames.length; index++) {
      const element = filenames[index];
      awesomeArray.push({
        'title': element,
        'slug': element
      })
    }
    savedGames = awesomeArray;
    if (err) {
      return;
    }
  });
}

//#region Get IP
var ServerIP = require('ip').address();
console.log(ServerIP);
//#endregion

//#region SocketIO
var people = [];
var http = require('http').Server(appExp);
var socket = require('socket.io')(http);
http.listen(3001, function () {
  console.log('SocketIO listening on *:3001');
});


socket.on("connection", function (client) {
  //#region Connect/disconnect
  client.on("join", function (name) {
    console.log(name)
    var color = getRandomColor();
    client.emit("update-people", people);
    // db.find({}, function (err, docs) {
    //   console.log(docs)
    // });
    var newuser = {
      "id": client.id,
      "name": name,
      "color": color
    }
    people.push(newuser)
    socket.sockets.emit('syncGameList', savedGames)
    client.broadcast.emit('addUser', newuser);
    client.broadcast.emit('setIP', ServerIP);
    console.log("updating games");
  });

  client.on("disconnect", function () {
    var res = people.filter(function (obj) {
      return obj.id == client.id;
    });

    for (i = 0; i < res.length; i++) {
      var index = people.indexOf(res[i]);
      if (index > -1) {
        people.splice(index, 1);
        console.log(res[i].id + " left the server")
      }
    }
    socket.sockets.emit("update-people", people);
  });

  //#endregion
  //#region Messages
  client.on("send-message", function (msgObj) {
    console.log(msgObj)
    var newObj = {
      "reciever": msgObj.reciever,
      "msg": msgObj.msg,
      "name": msgObj.name,
      "sender": client.id
    }
    console.log(newObj)
    socket.to(msgObj.reciever).emit('getMessage', newObj);
    console.log(msgObj.reciever)
  });
  //#endregion
  //#region Games
  client.on("addGame", (gameObject) => {
    db.insert(doc, function (err, newGame) {
      console.log("Game Added")
      readFiles();
      socket.sockets.emit("gameAdded", newGame)
    });
  })
  //endregion


});
//#endregion
  
//#region FTP
const FtpSvr = require('ftp-srv');

const hostname = ServerIP.toString();
const port = 20000

const ftpServer = new FtpSvr('ftp://' + hostname + ':' + port,
  { anonymous: true, greeting: ["Hello Jong", "Wie gehts?"] });

ftpServer.on('login', (data, resolve, reject) => {
  console.log("You got in niggah")
  resolve({ root: path.join(__dirname, 'public/') });

});

ftpServer.on('client-error', (connection, context, error) => {
  console.log("der er en fejl")
});


ftpServer.listen()
  .then(() => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
//endregion


const UdpNode = require('udp-node')
const gaius = new UdpNode()
gaius
  .set({
    name: 'Server',
    type: 'Server'
  })
  .on('hello', (message, rinfo) => {
    console.log("got a message")
    gaius.send({
      type: 'ehlo',
      address: rinfo.address,
      port: rinfo.port,
      text: 'Yes.'
    }, () => {
      gaius.close()
    })
  })



//Socket IO setup END
module.exports = appExp;
