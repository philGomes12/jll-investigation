import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-screen-a',
  templateUrl: './screen-a.component.html',
  styleUrls: ['./screen-a.component.css']
})
export class ScreenAComponent implements OnInit {

  messages: Message[] = []
  now: Date = new Date();

  messageDetails = new FormGroup({
    msg: new FormControl('')
  })

  constructor(public chatService: ChatService) {
    chatService.messages.subscribe(
      msg => {
        this.messages.push(msg)
      }
    )
  }

  sendMessage($event: KeyboardEvent){
    let currentHour = (this.now.getHours() + ':' + this.now.getMinutes()).toString()
    let message = {
      author: 'User1',
      message: this.messageDetails.value['msg'],
      time: currentHour
    }

    if($event.key === 'Enter'){
      this.messageDetails.setValue({msg: ''})
      this.pushMessage(message)
    }
  }

  pushMessage(messageObj){
    this.chatService.messages.next(messageObj)
    this.messages.push(messageObj)
  }

  ngOnInit(): void {
  }

}

export interface Message{
  author: string,
  message: string,
  time: string
}
