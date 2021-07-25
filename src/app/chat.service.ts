import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { WebsocketService } from './websocket.service';
import {environment } from '../environments/environment';
import { map } from 'rxjs/operators';

export interface Message{
  author: string,
  message: string,
  time: string
}

@Injectable({providedIn: 'root'})
export class ChatService {

  public messages: Subject<Message>

  constructor(public websocketService: WebsocketService) {
    this.messages = <Subject<any>>websocketService
      .connect(environment.CHAT_URL).pipe(
      map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message,
          time: data.time
        }
      }))
   }
}
