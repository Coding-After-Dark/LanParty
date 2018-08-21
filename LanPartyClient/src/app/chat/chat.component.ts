import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  isOpen = false;
  isChatOpen = false;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  username = 'yellow penguin';
  msg = 'fag';
  people: Chat[] = [];
  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }
  constructor(public _socketService: SocketService, private ref: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.generateUsername();
    const res = this.username;
    const people = this.people;
    this._socketService.socket.on('connect', function () {
      this.emit('join', res);
    });
    this._socketService.socket.on('update-people', function (data: Chat) {
      this.people = data;
      this.people.sort(this.compare);
    }.bind(this));
    this._socketService.socket.on('getMessage',  (data) => {
      this.InsertMessage(data, data.sender);
    });
    this._socketService.socket.on('addUser',  (data) => {
      this.people.push(data);
      this.people.sort(this.compare);
    });
  }

  SendMessage(input, chatID) {

    if (input.value.length > 0) {
      console.log(this._socketService.socket.id);
      const res = {
        name: this.username,
        msg: input.value,
        reciever: chatID
      };
      this.InsertMessage(res, chatID);
      this._socketService.socket.emit('send-message', res);
      input.value = '';
      input.focus();
    }

  }
  InsertMessage(obj, sender) {
    const bla = this.people.find(p => p.id === sender);
    if (bla.messages === undefined) {
      bla.messages = [];
    }
    console.log(bla);
    bla.messages.push(obj);
    this.StartChat(sender);
    this.ref.detectChanges();
  }
  StartChat(person) {
      this.people.find(p => p.id === person).active = true;
      this.people.find(p => p.id === person).isOpen = true;
  }
  generateUsername() {
    const stuff = ['Sweating', 'Running', 'Spanking', 'Fucking', 'Fisting', 'Wanking', 'Stroking',
      'Throbbing', 'Moaning', 'Heiling', 'Blue', 'Yellow', 'Big', 'Small', 'Tiny', 'Huge', 'Rare', 'Epic', 'Legendary', 'Steamy',
      'Ugly', 'Shitting', 'Abused', 'Satanic', 'Holy', 'A True', 'Tall', 'Divine', 'Soulless', 'White', 'Black', 'Saint',
      'Comrad', 'Slav master'
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
