//Modeled off AngularFirebase. Sources all listed in Readme doc.

import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { IRequestOptions, IServerResponse, ApiAiConstants } from 'api-ai-javascript/ApiAiClient';


//create message class 
export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable({
  providedIn: 'root'
})
//@Injectable()
//const dialogflow = require('dialogflow');
//const sessionClient = new dialogflow.SessionsClient();
//export const client = new ApiAiClient({accessToken: 'b1922eedd0a14dcf949f042a69bd864d'});
export class ChatService {
//initialize Dialogflow API token
  readonly token = environment.dialogflow.bitsbot;
  readonly client = new ApiAiClient({ accessToken: 'b1922eedd0a14dcf949f042a69bd864d'});
//Define BehaviorSubject - holds the value that needs to be shared with 
//other components. https://medium.com/@weswhite/angular-behaviorsubject-service-60485ef064fc
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }
  //send message through DialogFlow
  //converse to add user message to the array 
//update: any ={};
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    //const lang = ApiAiConstants.AVAILABLE_LANGUAGES.EN;
    this.update(userMessage);

    return this.client.textRequest(msg)
            .then((res: { result: { fulfillment: { speech: any; }; }; }) => {
              const speech = res.result.fulfillment.speech;
              const botMessage = new Message(speech, 'bitsbot');
              this.update(botMessage);
            });
  }

  update(msg: Message) {
    this.conversation.next([msg]);
  }
}
