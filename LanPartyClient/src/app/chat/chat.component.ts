import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  username = 'yellow penguin';
  msg = 'fag';
  people: Chat[] = [];
  socket = io('http://localhost:3001');
  constructor() { }
  ngOnInit() {
    this.generateUsername();
    const res = this.username;
    const people = this.people;
    this.socket.on('connect', function () {
      this.emit('join', res);
    });
    this.socket.on('update-people', function (data: Chat) {
      this.people = data;
      this.people.sort(this.compare);
    }.bind(this));
    this.socket.on('getMessage',  (data) => {
      this.InsertMessage(data, data.sender);
    });
    this.socket.on('addUser',  (data) => {
      this.people.push(data);
      this.people.sort(this.compare)
    });
  }

  SendMessage(input, chatID) {
    console.log(this.socket.id)
    const res = {
      name: this.username,
      msg: input.value,
      reciever: chatID
    };
    this.InsertMessage(res,chatID);
    this.socket.emit('send-message', res);
    input.value = '';
    input.focus();
  }
  InsertMessage(obj, sender){
    var bla = this.people.find(p => p.id === sender);
    if (bla.messages == undefined) {
      bla.messages = [];
    }
    console.log(bla);
    bla.messages.push(obj);
    this.StartChat(sender);
  }
  StartChat(person) {

      this.people.find(p => p.id === person).active = true;
      this.people.find(p => p.id === person).isOpen = true;
  }
  generateUsername() {
    const stuff = ['Sweating', 'Running', 'Spanking', 'Fucking', 'Fisting', 'Wanking', 'Stroking',
      'Throbbing', 'Moaning', 'Heiling', 'Blue', 'Yellow', 'Big', 'Small', 'Tiny', 'Huge', 'Rare', 'Epic', 'Legendary', 'Steamy',
      'Ugly', 'Shitting', 'Abused', 'Satanic', 'Holy', 'A True', 'Tall', 'Divine', 'Soulless', 'White', 'Black',
    ];
    const more = ['Cow', 'Child', 'Moose', 'Buffalo', 'Potato', 'Midget', 'Slave', 'Asian',
     'Hippie', 'German', 'Johnson', 'Weaboo', 'Loli', 'Soldier', 'Hawk', 'Ginger' , 'Rubber duck'];
    this.username = stuff[Math.floor(Math.random() * stuff.length)];
    this.username += ' ' + more[Math.floor(Math.random() * more.length)];

  }
    compare(a, b) {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }
}
export class Chat {
  constructor(
    public name: string,
    public id: string,
    public color: string,
    public active: boolean,
    public isOpen: boolean,
    public messages: any[]) {
      this.messages = [{}];
     }
}
