//sources used angular framework and angularfirebase. All sources listed in Readme doc

import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})

//maintain Observable that needs to be changed with new values. AngularFirebase uses RxJS 'scan' operator.
//When BehaviorSubject gets a new value it will be 'concatenated' to the previous value.
//modeled off angularfirebase: https://angularfirebase.com/lessons/chatbot-in-angular-with-dialogflow-api-ai/#Install-Required-Libraries

//angular framework generated
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
//added public chat
  constructor(public chat: ChatService) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
    //rxjs scan
        .scan((acc, val) => acc.concat(val) );
  }
  //update
sendMessage() {
  this.chat.converse(this.formValue);
  this.formValue = '';
}
}
